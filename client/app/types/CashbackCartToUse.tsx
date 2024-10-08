interface CashbackDetails {
    transaction_id: number;
    customer_id: number;
    order_id: number | null; // Peut être null si non lié à une commande
    review_id: number | null; // Peut être null si non lié à un avis
    cash_back_earned_for_this_transaction: number; // Montant de cashback gagné
    cash_back_spent_for_this_transaction: number; // Montant de cashback dépensé
    createdAt: string; // Date au format string
    reason: string; // Raison pour laquelle le cashback a été accordé
  }
  
  // Interface pour représenter un ensemble de cashbacks et les totaux associés
  export interface CashbackCartToUseType {
    cashBacks: CashbackDetails; // Un cashback par objet
    total_earned: number; // Total des cashbacks gagnés
    total_spent: number; // Total des cashbacks dépensés
  }
  