import { environment } from "../../environment.js";
import {
  sendMarketingEmail,
  sendNewClientEmail,
} from "../service/emailService.js";

export const sendCashbackCorrectionToCustomer = async (
  email: string,
  detuctedAmount: number
) => {
  const mailOptions = {
    to: email,
    subject: "Correction de votre Cashback",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="text-align: center; color: #FF9800;">Correction de votre Cashback 🎁</h2>
          <p style="font-size: 16px; color: #333;">
            Nous avons ajusté votre cashback suite à une erreur de notre part.
          </p>
          
          <div style="text-align: center; margin: 20px 0;">
            <p style="font-size: 18px; color: #333;"><strong>Montant déduit:</strong></p>
            <div style="background-color: #FF9800; color: #fff; padding: 15px; font-size: 24px; border-radius: 50px; width: 180px; margin: 0 auto;">
              - ${detuctedAmount} €
            </div>
          </div>
    
          <p style="font-size: 16px; color: #333;">
            Nous vous remercions de votre compréhension.
          </p>
          <p style="text-align: center; font-size: 14px; color: #777;">
            Les Ateliers Noralya
          </p>
        </div>
      </div>
    `,
  };

  try {
    await sendMarketingEmail(mailOptions);
    console.log("Email de correction envoyé à", email);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de correction:", error);
  }
};
export const sendMarketingEmailToCustomer = async (
  customer: { email: string; firstName: string },
  marketingContent: string
) => {
  const mailOptions = {
    to: customer.email,
    subject: "Offre spéciale pour vous !",
    html: `<p>Bonjour ${customer.firstName},</p><p>${marketingContent}</p>`,
  };

  try {
    await sendMarketingEmail(mailOptions);
    console.log("Email marketing envoyé à", customer.email);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email marketing:", error);
  }
};
export const sendNewClientEmailToAdmin = async (email: string) => {
  const mailOptions = {
    to: `${environment.EMAIL_USERNAME_PAYMENT}`,
    subject: "Nouveau client !",
    html: `<p>Nouveau client avec l'adresse e-mail : ${email}</p>`,
  };
  try {
    await sendNewClientEmail(mailOptions);
    console.log("Email d'information envoyé à l'admin");
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email d'information:", error);
  }
};
export const sendBirthdayToCustomer = async (
  email: string,
  firstName: string | null,
  cashbackAmount: number
) => {
  const mailOptions = {
    to: email,
    subject: `Félicitations pour votre anniversaire ${firstName || ""}!`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="text-align: center; color: #4CAF50;">Joyeux Anniversaire ${
            firstName || ""
          }! 🎉</h2>
          <p style="font-size: 16px; color: #333;">
            Nous sommes ravis de célébrer votre anniversaire avec vous. À cette occasion, nous avons le plaisir de vous offrir du cashback en cadeau, pour rendre cette journée encore plus spéciale !
          </p>
          
          <div style="text-align: center; margin: 20px 0;">
            <p style="font-size: 18px; color: #333;"><strong>Votre Cashback Cadeau :</strong></p>
            <div style="background-color: #4CAF50; color: #fff; padding: 15px; font-size: 24px; border-radius: 50px; width: 180px; margin: 0 auto;">
              + ${cashbackAmount} €
            </div>
          </div>
    
          <p style="font-size: 16px; color: #333;">
            Utilisez ce cashback pour profiter de vos achats et économiser encore plus sur notre site.
          </p>

          <p style="font-size: 16px; color: #333;">
            Nous vous souhaitons une merveilleuse année pleine de surprises et de succès !
          </p>
    
          <p style="text-align: center; font-size: 14px; color: #777;">
            Les Ateliers Noralya
          </p>
        </div>
      </div>
    `,
  };

  try {
    await sendMarketingEmail(mailOptions);
    console.log("Email marketing envoyé à", email);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email marketing:", error);
  }
};
export const sendCashbackEarnedToCustomer = async (
  email: string,
  firstName: string | null,
  cashbackAmount: number,
  reason: string
) => {
  let reasonText = "";

  switch (reason) {
    case "Review":
      reasonText = "pour avoir laissé un commentaire sur l'un de nos produits";
      break;
    case "Referral":
      reasonText = "grâce au parrainage";
      break;
    case "Loyalty":
      reasonText = "en récompense de votre fidélité à notre boutique";
      break;
    case "Other":
      reasonText =
        "pour une raison spéciale liée à votre engagement avec notre boutique";
      break;
  }

  const mailOptions = {
    to: email,
    subject: `Vous avez gagné du Cashback ${firstName || ""} !`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #fff; padding: 20px; border-radius: 8px; box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);">
          <h2 style="text-align: center; color: #4CAF50;">Félicitations ${
            firstName || ""
          } ! 🎉</h2>
          <p style="font-size: 16px; color: #333;">
            Vous venez de gagner du cashback ${reasonText}. Profitez-en pour faire des économies sur vos prochains achats !
          </p>
          
          <div style="text-align: center; margin: 20px 0;">
            <p style="font-size: 18px; color: #333;"><strong>Montant de votre Cashback :</strong></p>
            <div style="background-color: #4CAF50; color: #fff; padding: 15px; font-size: 24px; border-radius: 50px; width: 180px; margin: 0 auto;">
              + ${cashbackAmount} €
            </div>
          </div>
    
          <p style="font-size: 16px; color: #333;">
            Utilisez ce cashback pour profiter de vos achats et économiser encore plus sur notre site.
          </p>

          <p style="font-size: 16px; color: #333;">
            Nous vous souhaitons une merveilleuse expérience d'achat !
          </p>
    
          <p style="text-align: center; font-size: 14px; color: #777;">
           Les Ateliers Noralya
          </p>
        </div>
      </div>
    `,
  };

  try {
    await sendMarketingEmail(mailOptions);
    console.log("Email de gain de cashback envoyé à", email);
  } catch (error) {
    console.error(
      "Erreur lors de l'envoi de l'email de gain de cashback:",
      error
    );
  }
};
