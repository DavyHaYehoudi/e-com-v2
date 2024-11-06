import { ResultSetHeader, RowDataPacket } from "mysql2";
import { query } from "../../config/req.js";
import {
  CreateDeliveryDTO,
} from "../../controllers/delivery/entities/dto/delivery.dto.js";
import {
  beginTransaction,
  commitTransaction,
  rollbackTransaction,
} from "../../utils/transaction.js";
import {
  ShippingMethodRow,
  ShippingMethodTarifsRow,
} from "./dao/delivery.dao.js";
import { NotFoundError } from "../../exceptions/CustomErrors.js";

// Récupérer toutes les méthodes de livraison
export const getAllDeliveriesRepository = async () => {
  const sql = `
        SELECT * FROM shipping_method
      `;
  const shippingMethods = await query<ShippingMethodRow[]>(sql);

  // Récupérer les tarifs associés
  const selectTarifsSql = `
        SELECT * FROM shipping_method_tarifs 
      `;
  const tarifs = await query<RowDataPacket[]>(selectTarifsSql);

  // Construire la réponse
  const response = shippingMethods.map((method) => {
    return {
      id: method.id,
      name: method.name,
      icon_url: method.icon_url,
      is_active: method.is_active,
      is_default: method.is_default,
      rates: tarifs
        .filter((tarif) => tarif.shipping_method_id === method.id)
        .map((tarif) => ({
          price: tarif.price,
          min_weight: tarif.min_weight,
          max_weight: tarif.max_weight,
        })),
    };
  });

  return response;
};
// ADMIN - Créer une méthode de livraison
export const createDeliveryRepository = async (
  shippingData: CreateDeliveryDTO
) => {
  const { name, icon_url, is_active, is_default, rates } = shippingData;

  await beginTransaction();

  try {
    // Insertion dans la table shipping_method
    const insertMethodSql = `
        INSERT INTO shipping_method (name, icon_url, is_active, is_default)
        VALUES (?, ?, ?, ?)
      `;
    const resultMethod = await query<ResultSetHeader>(insertMethodSql, [
      name,
      icon_url,
      is_active ?? true,
    ]);
    const shippingMethodId = resultMethod.insertId;

    // Insertion dans la table shipping_method_tarifs
    const insertTarifsSql = `
        INSERT INTO shipping_method_tarifs (shipping_method_id, price, min_weight, max_weight)
        VALUES (?, ?, ?, ?)
      `;

    for (const rate of rates) {
      await query(insertTarifsSql, [
        shippingMethodId,
        rate.price,
        rate.min_weight,
        rate.max_weight,
      ]);
    }

    await commitTransaction();

    // Client format du shipping method créé
    const selectShippingMethodSql = `
        SELECT * FROM shipping_method
        WHERE id = ?
      `;
    const shippingMethod = await query<ShippingMethodRow[]>(
      selectShippingMethodSql,
      [shippingMethodId]
    );

    // Récupération des tarifs associés
    const selectTarifsSql = `
        SELECT * FROM shipping_method_tarifs
        WHERE shipping_method_id = ?
      `;
    const tarifs = await query<ShippingMethodTarifsRow[]>(selectTarifsSql, [
      shippingMethodId,
    ]);

    // Construction de la réponse
    const response = {
      name: shippingMethod[0].name,
      icon_url: shippingMethod[0].icon_url,
      is_active: shippingMethod[0].is_active,
      is_default: shippingMethod[0].is_default,
      rates: tarifs.map((tarif) => ({
        price: tarif.price,
        min_weight: tarif.min_weight,
        max_weight: tarif.max_weight,
      })),
    };

    return [response];
  } catch (error: any) {
    await rollbackTransaction();
    throw new Error(
      `Erreur lors de la création du shipping method: ${error.message}`
    );
  }
};
// ADMIN - Mettre à jour une méthode de livraison
export const updateDeliveryRepository = async (
  deliveryId: number,
  updatedFields: Record<string, any>
) => {
  // Filtrer les champs qui ne sont pas des colonnes (ici 'rates')
  const fields = Object.keys(updatedFields)
    .filter((field) => field !== "rates")
    .map((field) => `${field} = ?`)
    .join(", ");
  const values = Object.keys(updatedFields)
    .filter((field) => field !== "rates")
    .map((field) => updatedFields[field]);

  // Début de la transaction
  await beginTransaction();

  // Mettre à jour shipping_method si des champs existent
  if (fields.length > 0) {
    const updateMethodSql = `UPDATE shipping_method SET ${fields} WHERE id = ?`;
    const result = await query<ResultSetHeader>(updateMethodSql, [
      ...values,
      deliveryId,
    ]);

    if (result.affectedRows === 0) {
      await rollbackTransaction();
      throw new NotFoundError(`Delivery with ID ${deliveryId} not found`);
    }
  }

  // Si 'rates' existe dans les données mises à jour
  if (updatedFields.rates && Array.isArray(updatedFields.rates)) {
    // Supprimer les anciens tarifs liés à cette méthode de livraison
    const deleteTarifsSql = `DELETE FROM shipping_method_tarifs WHERE shipping_method_id = ?`;
    await query<ResultSetHeader>(deleteTarifsSql, [deliveryId]);

    // Insérer les nouveaux tarifs
    for (const rate of updatedFields.rates) {
      const { price, min_weight, max_weight } = rate;
      const insertRateSql = `
          INSERT INTO shipping_method_tarifs (shipping_method_id, price, min_weight, max_weight)
          VALUES (?, ?, ?, ?)
        `;
      await query<ResultSetHeader>(insertRateSql, [
        deliveryId,
        price,
        min_weight,
        max_weight,
      ]);
    }
  }

  // Commit de la transaction
  await commitTransaction();
};
// ADMIN - Supprimer un shipping method
export const deleteDeliveryRepository = async (shippingMethodId: number) => {
  await beginTransaction();

  try {
    // Suppression des tarifs
    const deleteTarifsSql = `
        DELETE FROM shipping_method_tarifs
        WHERE shipping_method_id = ?
      `;
    await query<ResultSetHeader>(deleteTarifsSql, [shippingMethodId]);

    // Suppression de la méthode de livraison
    const deleteMethodSql = `
        DELETE FROM shipping_method
        WHERE id = ?
      `;
    await query<ResultSetHeader>(deleteMethodSql, [shippingMethodId]);

    await commitTransaction();
  } catch (error: any) {
    await rollbackTransaction();
    throw new Error(
      `Erreur lors de la suppression du shipping method: ${error.message}`
    );
  }
};
