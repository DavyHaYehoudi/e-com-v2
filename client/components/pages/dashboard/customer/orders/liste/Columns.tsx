import { ColumnDef } from "@tanstack/react-table";
import { OrderCustomer } from "../../hooks/useOrdersCustomer";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { formatPrice } from "@/app/(public)/utils/pricesFormat";
import { formatDate } from "@/app/(public)/utils/formatDate";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import ClipboardButton from "@/components/shared/ClipboardButton";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<OrderCustomer>[] = [
  {
    accessorKey: "order_status_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Etape
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const label = row.original.order_status_label; // Récupère le label
      const color = row.original.order_status_color; // Récupère la couleur

      return (
        <Badge
          style={{ backgroundColor: color }}
          className="text-white text-center"
        >
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "confirmation_number",
    header: "№ de commande",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("confirmation_number")}</div>
    ),
  },
  {
    accessorKey: "payment_status_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Payment
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const label = row.original.payment_status_label; // Récupère le label
      const color = row.original.payment_status_color; // Récupère la couleur

      return (
        <Badge style={{ color: color }} className="text-white text-center">
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "total_price",
    header: () => <div className="text-right">Total</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_price"));

      return (
        <div className="text-right font-medium whitespace-nowrap">
          {formatPrice(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Date
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const orderDate: string = row.getValue("created_at");

      return (
        <div className="text-right font-medium whitespace-nowrap">
          {formatDate(orderDate)}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const orderNumber: string = row.getValue("confirmation_number");
      const orderId: number = row.original.id;
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Ouvrir le menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem className="flex flex-col">
              <span>Copier le numéro de commande</span>
              <span className="flex items-center gap-2">
                {" "}
                {orderNumber}
                <ClipboardButton text={orderNumber} />
              </span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href={`/customer/tableau-de-bord/commandes/${orderId}`}>
                {" "}
                Voir le détail de la commande
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
