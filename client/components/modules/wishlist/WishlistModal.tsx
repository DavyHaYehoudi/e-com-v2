import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HeartIcon } from "lucide-react";
import React from "react";
import WishlistTable from "./WishlistTable";

const WishlistModal = () => {
  return (
    <Dialog >
      <DialogTrigger><HeartIcon className="w-6 h-6 cursor-pointer" /></DialogTrigger>
      <DialogContent className="w-full max-w-[800px] sm:w-[90%] md:w-[80%] lg:w-[800px]">
        <DialogHeader>
          <DialogTitle className="uppercase" >mes favoris</DialogTitle>
          <DialogDescription className="overflow-x-auto">
            <WishlistTable />
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default WishlistModal;
