import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import CartRow from "./CartRow";
import { formatPrice } from "@/app/utils/pricesFormat";
import {
  calculateTotalCartAfterDiscount,
  calculateTotalCartBeforeDiscount,
  calculateTotalCashbackCart,
  calculateTotalDiscountCart,
  calculateTotalWeightCart,
} from "./utils/calculUtils";
import { productsInCart } from "@/app/mocks/products";
import { formatWeight } from "@/app/utils/weightFormat";
import { defaultDeliveryName } from "./utils/deliveryUtils";
import { deliveries } from "@/app/mocks/delivery";
import CartDelivery from "./CartDelivery";

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
          <TableCell colSpan={5}>Total des produits hors promotion</TableCell>
          <TableCell className="text-right">
            {formatPrice(calculateTotalCartBeforeDiscount(productsInCart))}{" "}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={5}>Total des promotions</TableCell>
          <TableCell className="text-right">
            {formatPrice(calculateTotalDiscountCart(productsInCart))}{" "}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={5}>Total du cashback</TableCell>
          <TableCell className="text-right">
            {formatPrice(calculateTotalCashbackCart(productsInCart))}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={5}>Total du poids</TableCell>
          <TableCell className="text-right">
            {formatWeight(calculateTotalWeightCart(productsInCart))}
          </TableCell>
        </TableRow>
        <TableRow>
          <CartDelivery />
          <TableCell className="text-right">
            {formatWeight(calculateTotalWeightCart(productsInCart))}
          </TableCell>
        </TableRow>
        <TableRow className="font-extrabold">
          <TableCell colSpan={5}>Total du panier</TableCell>
          <TableCell className="text-right">
            {formatPrice(calculateTotalCartAfterDiscount(productsInCart))}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};
export default CartTable;
