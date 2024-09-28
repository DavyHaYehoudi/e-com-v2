import { ResultSetHeader } from "mysql2";
import { query } from "../../config/req.js";
import {
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
} from "../../utils/transaction.js";
import {
  ForbiddenError,
  NotFoundError,
} from "../../exceptions/CustomErrors.js";
import { CampaignRow } from "./dao/campaign.dao.js";
import {
  CreateMarketingCampaignDTO,
  UpdateMarketingCampaignDTO,
} from "../../controllers/marketing/entities/dto/compaign.dto.js";

// ADMIN - Récupérer toutes les campagnes
export const getAllCampaignsRepository = async () => {
  const sql = `
        SELECT * FROM campaign
      `;
  const campaigns = await query<CampaignRow[]>(sql);
  return campaigns;
};
// ADMIN - Créer une campagne (statut prepared toujours)
export const createCampaignRepository = async (
  campaignData: CreateMarketingCampaignDTO
) => {
  const { subject, content } = campaignData;

  const insertSql = `
        INSERT INTO campaign (subject, content)
        VALUES (?, ?)
      `;
  const result = await query<ResultSetHeader>(insertSql, [subject, content]);
  const newCampaignId = result.insertId;
  const sqlSelect = `
    SELECT * FROM campaign WHERE id =?
  `;
  const [newCampaign] = await query<CampaignRow[]>(sqlSelect, [newCampaignId]);
  return newCampaign;
};
// ADMIN - Mettre à jour une campagne ou l'envoyer
export const updateCampaignRepository = async (
  campaignId: number,
  campaignData: UpdateMarketingCampaignDTO
) => {
  const checkSql = `SELECT * FROM campaign WHERE id = ?`;
  const isCampaignExists = await query<CampaignRow[]>(checkSql, [campaignId]);
  if (isCampaignExists.length === 0) {
    throw new NotFoundError(`Campaign with ID ${campaignId} not found`);
  }
  const campaign = isCampaignExists[0];

  // Vérifier que la campagne n'a pas déjà été envoyée
  if (campaign.status === "sent") {
    throw new ForbiddenError(
      "Cannot update a campaign that has already been sent."
    );
  }

  const { subject, content, status, emails } = campaignData;

  await beginTransaction();

  try {
    // Mise à jour de la campagne
    const updateCampaignSQL = `
    UPDATE campaign
    SET 
      subject = ?,
      content = ?,
      status = ?,
      send_date = IF(? = 'sent', NOW(), send_date)
    WHERE id = ?
  `;

    await query(updateCampaignSQL, [
      subject,
      content,
      status,
      status,
      campaignId,
    ]);

    // Si des emails sont fournis, on les enregistre dans la table `campaign_recipients`
    if (emails && status === "sent") {
      const insertRecipientsSQL = `
        INSERT INTO campaign_recipients (campaign_id, email)
        VALUES (?, ?)
      `;

      for (const email of emails) {
        await query(insertRecipientsSQL, [campaignId, email]);
      }

      // On met à jour le nombre total d'emails envoyés dans la campagne
      const updateTotalSentSQL = `
        UPDATE campaign
        SET total_sent = (SELECT COUNT(*) FROM campaign_recipients WHERE campaign_id = ?)
        WHERE id = ?
      `;
      await query(updateTotalSentSQL, [campaignId, campaignId]);
    }

    await commitTransaction();
  } catch (error: any) {
    await rollbackTransaction();
    throw new Error(
      `Erreur lors de la mise à jour de la campagne: ${error.message}`
    );
  }
};
// ADMIN - Supprimer une campagne
export const deleteCampaignRepository = async (campaignId: number) => {
  const sql = `
        DELETE FROM campaign
        WHERE id = ?
      `;
  const result = await query<ResultSetHeader>(sql, [campaignId]);

  if (result.affectedRows === 0) {
    throw new NotFoundError(`Campaign with ID ${campaignId} not found`);
  }
};
