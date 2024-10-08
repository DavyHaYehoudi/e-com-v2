import { TableCell, TableRow } from "@/components/ui/table";
import React from "react";
import CashbackToUse from "./CashbackToUse";
import { formatPrice } from "@/app/utils/pricesFormat";

interface RowCashbackToUseProps {
  onCashbackSelect: (amount: number) => void;
  selectedCashback: number | null; // null si aucun cashback sélectionné ici pour l'instant.
}
const RowCashbackToUse: React.FC<RowCashbackToUseProps> = ({
  onCashbackSelect,
  selectedCashback,
}) => {
  return (
    <TableRow>
      <CashbackToUse onCashbackSelect={onCashbackSelect} />
      <TableCell className="text-right bg-white" colSpan={5}>
        {selectedCashback ? `- ${formatPrice(selectedCashback)}` : 0}
      </TableCell>
    </TableRow>
  );
};

export default RowCashbackToUse;
