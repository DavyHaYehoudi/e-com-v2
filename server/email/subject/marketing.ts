import { environment } from "../../environment.js";
import {
  sendMarketingEmail,
  sendNewClientEmail,
} from "../service/emailService.js";

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
