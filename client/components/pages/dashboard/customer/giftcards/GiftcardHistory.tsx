import {
  Cloud,
  CreditCard,
  Github,
  Keyboard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { GiftCardsCustomer } from "../hooks/useGiftcardsCustomer";
import HistoryTable from "./HistoryTable";
import CommonDetails from "./CommonDetails";

interface GiftcardHistoryProps {
  giftcard: GiftCardsCustomer;
}
const GiftcardHistory: React.FC<GiftcardHistoryProps> = ({ giftcard }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="w-full">Voir les détails</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="md:w-[800px] w-[300px]">
        <CommonDetails giftcard={giftcard} />
        <HistoryTable giftcard={giftcard} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default GiftcardHistory;
