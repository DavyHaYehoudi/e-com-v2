import { formatDate } from "@/app/(public)/utils/formatDate";
import { formatPrice } from "@/app/(public)/utils/pricesFormat";
import { formatWeight } from "@/app/(public)/utils/weightFormat";
import { OneOrderCustomer } from "@/components/pages/dashboard/customer/hooks/useOrdersCustomer";
import { Badge } from "@/components/ui/badge";
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

interface MasterOrderTableProps {
  data: OneOrderCustomer | null;
}
const MasterOrderTable: React.FC<MasterOrderTableProps> = ({ data }) => {
  return (
    <Table>
      <TableCaption>Détails de la commande.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Etape</TableHead>
          <TableHead>Payment</TableHead>
          <TableHead>№ de commande</TableHead>
          <TableHead>Livraison</TableHead>
          <TableHead>Poids</TableHead>
          <TableHead>Cashback capitalisé</TableHead>
          <TableHead>Cashback dépensé</TableHead>
          <TableHead>Code promo</TableHead>
          <TableHead>Promotions des produits</TableHead>
          <TableHead>Total</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      {data && (
        <TableBody>
          <TableRow>
            <TableCell>
              {" "}
              <Badge
                style={{ backgroundColor: data.order.order_status_color }}
                className="text-white text-center"
              >
                {data.order.order_status_label}
              </Badge>{" "}
            </TableCell>
            <TableCell>
              {" "}
              <Badge
                style={{ color: data.order.payment_status_color }}
                className="text-white text-center"
              >
                {data.order.payment_status_label}
              </Badge>{" "}
            </TableCell>
            <TableCell>{data.order.confirmation_number}</TableCell>
            <TableCell className="whitespace-nowrap">
              {formatPrice(data.order.shipping_price)}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatWeight(data.order.total_weight)}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatPrice(data.order.cashback_earned)}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatPrice(data.order.cashback_spent)}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatPrice(data.order.code_promo_amount)}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatPrice(data.order.total_promo_products)}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatPrice(data.order.total_price)}
            </TableCell>
            <TableCell className="whitespace-nowrap">
              {formatDate(data.order.created_at)}
            </TableCell>
          </TableRow>
        </TableBody>
      )}
      <TableFooter></TableFooter>
    </Table>
  );
};
export default MasterOrderTable;
