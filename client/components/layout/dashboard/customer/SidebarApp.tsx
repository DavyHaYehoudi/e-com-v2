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
import useCustomerInfo from "@/components/pages/dashboard/customer/hooks/useCustomerInfo";
import NavUser from "./NavUser";

import { data } from "./data/tabs";
interface UserDataType {
  name: string | null;
  email: string;
  avatar: string;
}
export function SidebarApp({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [userData, setUserData] = React.useState<UserDataType>({
    name: "",
    email: "",
    avatar: "",
  });

  const { profileFetch, avatarFetch } = useCustomerInfo();

  React.useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        // Récupérer les informations du profil
        const profile = await profileFetch();
        if (profile) {
          setUserData((prev) => ({
            ...prev,
            name: profile.first_name,
            email: profile.email,
          }));
        }

        // Récupérer l'avatar
        const avatar = await avatarFetch();
        if (avatar) {
          setUserData((prev) => ({
            ...prev,
            avatar: avatar.avatar_url,
          }));
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
      }
    };

    fetchCustomerData();
  }, [profileFetch, avatarFetch]);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <NavHandleAccount items={data.account} />
        <NavActivity items={data.activities} />
        <NavAdvantages items={data.advantages} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser userData={userData} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
