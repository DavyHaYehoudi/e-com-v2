import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GiftCardsCustomer } from "../hooks/useGiftcardsCustomer";
import ClipboardButton from "@/components/shared/ClipboardButton";
import { formatDate } from "@/app/(public)/utils/formatDate";
import { formatPrice } from "@/app/(public)/utils/pricesFormat";

interface HistoryTableProps {
  giftcard: GiftCardsCustomer;
}
const HistoryTable: React.FC<HistoryTableProps> = ({ giftcard }) => {
  return (
    <Table>
      <TableCaption>Détails d'utilisation de la carte cadeau.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Commande</TableHead>
          <TableHead>Utilisateur</TableHead>
          <TableHead>Date d'usage</TableHead>
          <TableHead>Montant utilisé</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {giftcard &&
          giftcard.usage_history &&
          giftcard.usage_history.length > 0 &&
          giftcard.usage_history.map((item) => (
            <>
              <TableRow key={item.confirmation_number}>
                <TableCell className="flex items-center gap-2">
                  {item.confirmation_number}
                  <span className="ml-2">
                    <ClipboardButton text={item.confirmation_number} />
                  </span>{" "}
                </TableCell>
                <TableCell>{item.used_by_customer_id}</TableCell>
                <TableCell>{formatDate(item.used_at)}</TableCell>
                <TableCell>{formatPrice(item.amount_used)}</TableCell>
              </TableRow>
            </>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};
export default HistoryTable;
