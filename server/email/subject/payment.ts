import { GiftCardSendEmail } from "../../repositories/gift-card/dao/gift-card.dao.js";
import { ProductSendEmail } from "../../repositories/product/dao/product.dao.js";
import { sendPaymentEmail } from "../service/emailService.js";

export const sendPaymentConfirmationEmail = async (
  customer: { email: string; firstName: string },
  orderDetails: {
    order: {
      confirmation_number: string;
      total_price: number;
      shipping_price: number;
      cashback_earned: number;
      cashback_spent: number;
      code_promo_amount: number;
      total_promo_products: number;
      total_weight: number | null;
    };
    giftCards: GiftCardSendEmail[];
    products: ProductSendEmail[];
  }
) => {
  const { order } = orderDetails;
  const giftCardsList = orderDetails.giftCards;
  const productsList = orderDetails.products;

  const giftCardsTable =
    giftCardsList.length > 0
      ? `
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Code de la Carte Cadeau</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Montant</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Solde</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Date d'Expiration</th>
        </tr>
      </thead>
      <tbody>
        ${giftCardsList
          .map(
            (card: GiftCardSendEmail) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${card.code}</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              card.amount
            } €</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              card.balance
            } €</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${new Date(
              card.expirationDate
            ).toLocaleDateString()}</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `
      : "<p>Aucune carte cadeau utilisée pour cette commande.</p>";

  const productsTable =
    productsList.length > 0
      ? `
    <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
      <thead>
        <tr style="background-color: #f2f2f2;">
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Produit</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Prix Avant Réduction</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Pourcentage de Réduction</th>
          <th style="border: 1px solid #ddd; padding: 8px; text-align: left;">Quantité</th>
        </tr>
      </thead>
      <tbody>
        ${productsList
          .map(
            (product: ProductSendEmail) => `
          <tr>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              product.name
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              product.price_before_discount
            } €</td>
            <td style="border: 1px solid #ddd; padding: 8px;">${
              product.discount_percentage
                ? product.discount_percentage + "%"
                : "Aucune"
            }</td>
            <td style="border: 1px solid #ddd; padding: 8px;">1</td>
          </tr>
        `
          )
          .join("")}
      </tbody>
    </table>
  `
      : "<p>Aucun produit acheté dans cette commande.</p>";

  const mailOptions = {
    to: customer.email,
    subject: "Confirmation de paiement",
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2 style="text-align: center;">Merci pour votre achat, ${
          customer.firstName || "cher client"
        } !</h2>
        <p style="font-size: 16px;">Votre commande a été confirmée avec succès.</p>
        <p><strong>Numéro de confirmation :</strong> ${
          order.confirmation_number
        }</p>
        <p><strong>Total de la commande :</strong> ${order.total_price} €</p>
        <p><strong>Coût de la livraison :</strong> ${order.shipping_price} €</p>
        <p><strong>Cashback gagné :</strong> ${order.cashback_earned} €</p>
        <p><strong>Cashback dépensé :</strong> ${order.cashback_spent} €</p>
        <p><strong>Montant de la réduction (code promo) :</strong> ${
          order.code_promo_amount
        } €</p>
        <p><strong>Total des promotions sur les produits :</strong> ${
          order.total_promo_products
        } €</p>
        <p><strong>Poids total des articles :</strong> ${
          order.total_weight ? order.total_weight + " kg" : "Non renseigné"
        }</p>
        
        <h3 style="text-align: center;">Détails des Produits</h3>
        ${productsTable}

        <h3 style="text-align: center;">Détails des Cartes Cadeaux</h3>
        ${giftCardsTable}

        <p style="text-align: center;">Nous vous remercions de votre confiance et restons à votre disposition pour toute question.</p>
      </div>
    `,
  };

  try {
    await sendPaymentEmail(mailOptions);
    console.log("Email de confirmation de paiement envoyé à", customer.email);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email de paiement:", error);
  }
};
