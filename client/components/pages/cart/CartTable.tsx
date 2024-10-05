import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import CartRow from "./CartRow";

const CartTable = () => {
  return (
    <Table>
    <TableCaption className="uppercase">
      utiliser mes avantages ⬇️
    </TableCaption>
    <TableBody>
     <CartRow />
    </TableBody>
    <TableFooter>
      <TableRow>
        <TableCell colSpan={2}>Total</TableCell>
        <TableCell className="text-right">$2,500.00</TableCell>
      </TableRow>
    </TableFooter>
  </Table>
  
  );
};
export default CartTable;
