import React from "react";
import ClipboardButton from "@/components/shared/ClipboardButton";
import { formatDate } from "@/app/(public)/utils/formatDate";
import { GiftCardsCustomer } from "../../hooks/useGiftcardsCustomer";
interface CommonDetailsProps {
  giftcard: GiftCardsCustomer;
}
const CommonDetails: React.FC<CommonDetailsProps> = ({ giftcard }) => {
  return (
    <div className="p-2">
      <p className="flex items-center gap-2">
        Origine :
        {giftcard.is_issued_by_admin ? (
          " Offre commerciale"
        ) : (
          <span className="flex items-center gap-2">
            commande {giftcard.confirmation_number}
            <ClipboardButton text={giftcard.confirmation_number} />
          </span>
        )}
      </p>
      <p>Identifiant de l&apos;acheteur : {giftcard.first_holder_id}</p>
      <p>Date d&apos;achat : {formatDate(giftcard.createdAt)}</p>
    </div>
  );
};

export default CommonDetails;
