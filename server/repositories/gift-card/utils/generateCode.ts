import crypto from "crypto"; // Pour générer un code alphanumérique

// Fonction pour générer un code alphanumérique de 12 caractères
export const generateGiftCardCode = (): string => {
  return crypto.randomBytes(6).toString('hex').toUpperCase(); // Génère un code de 12 caractères (6 octets en hex)
};
