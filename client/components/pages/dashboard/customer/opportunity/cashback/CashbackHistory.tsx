"use client";
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
import { CashBackHistoryResponse } from "../../hooks/useCustomerInfo";
import { formatDate } from "@/app/(public)/utils/formatDate";
import { Minus, Plus } from "lucide-react";

interface CashbackHistoryProps {
  history: CashBackHistoryResponse | null;
}
const CashbackHistory: React.FC<CashbackHistoryProps> = ({ history }) => {
  return (
    <Table >
      <TableCaption>Historique de votre cashback.</TableCaption>
      <TableHeader>
        <TableRow>
          {/* Colonne "Motif" */}
          <TableHead className="w-1/4 px-0">Motif</TableHead>

          {/* Colonne "Capitalisé" */}
          <TableHead className="w-1/4 px-0">
            {/* Texte complet visible sur écrans moyens et plus grands */}
            <span className="hidden sm:table-cell">Capitalisé</span>

            {/* Icône visible uniquement sur petits écrans */}
            <span className="table-cell sm:hidden text-green-500">
              <Plus className="w-5 h-5 mx-auto" />
            </span>
          </TableHead>

          {/* Colonne "Dépensé" */}
          <TableHead className="w-1/4 px-0">
            {/* Texte complet visible sur écrans moyens et plus grands */}
            <span className="hidden sm:table-cell">Dépensé</span>

            {/* Icône visible uniquement sur petits écrans */}
            <span className="table-cell sm:hidden text-red-500">
              <Minus className="w-5 h-5 mx-auto" />
            </span>
          </TableHead>

          {/* Colonne "Date" */}
          <TableHead className="w-1/4 px-0 text-center">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {history &&
          history.cashBacks &&
          history.cashBacks.length > 0 &&
          history.cashBacks.map((item) => (
            <TableRow key={item.transaction_id}>
              <TableCell className="font-medium">{item.reason}</TableCell>
              <TableCell
                className={`w-1/4 truncate ${
                  item.cash_back_earned_for_this_transaction > 0
                    ? "text-green-500 font-bold"
                    : ""
                }`}
              >
                {item.cash_back_earned_for_this_transaction}
              </TableCell>
              <TableCell
                className={`w-1/4 truncate ${
                  item.cash_back_spent_for_this_transaction > 0
                    ? "text-red-500 font-bold"
                    : ""
                }`}
              >
                {item.cash_back_spent_for_this_transaction}
              </TableCell>
              <TableCell className="w-1/4 whitespace-nowrap text-center ">
                {formatDate(item.createdAt)}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
      <TableFooter></TableFooter>
    </Table>
  );
};
export default CashbackHistory;