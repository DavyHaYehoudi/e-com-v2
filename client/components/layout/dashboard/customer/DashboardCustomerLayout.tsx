import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

export default function DashboardCustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("DashboardCustomerLayout rendu");

  return (
    <SidebarProvider>
      <AppSidebar />
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
