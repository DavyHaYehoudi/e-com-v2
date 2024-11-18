"use client";

import * as React from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarRail,
} from "@/components/ui/sidebar";
import { NavHandleAccount } from "./NavHandleAccount";
import { NavActivity } from "./NavActivity";
import { NavAdvantages } from "./NavAdvantages";
import { data } from "./data/tabs";
import LoginModal from "@/components/modules/login/LoginModal";
import useAuth from "@/app/(public)/hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { LogOut, House } from "lucide-react";
import { NavPolicy } from "./NavPolicy";
import Link from "next/link";

export function SidebarApp({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { handleAuthentication, handleLogout } = useAuth();
  const isConnected = useSelector(
    (state: RootState) => state.auth.isAuthenticated
  );

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavHandleAccount items={data.account} />
        <NavActivity items={data.activities} />
        <NavAdvantages items={data.advantages} />
        <NavPolicy items={data.policy} />
      </SidebarContent>
      <SidebarFooter>
        <Link
          href="/"
          className="flex items-center gap-2 mx-2 my-6"
          title="Retour sur le site"
        >
          <House />
        </Link>
        {isConnected ? (
          <div
            onClick={handleLogout}
            className="flex items-center gap-2 cursor-pointer mx-2 my-6"
            title="Me déconnecter"
          >
            <LogOut />
            {/* Me déconnecter */}
          </div>
        ) : (
          <div className="flex items-center gap-2 mx-2 my-6">
            <LoginModal
              authenticate={handleAuthentication}
              label="Me connecter"
            />
          </div>
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
