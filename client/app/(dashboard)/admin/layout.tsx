import DashboardAdminLayout from "@/components/layout/dashboard/admin/DashboardAdminLayout";

export default function RootLayoutAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardAdminLayout>{children}</DashboardAdminLayout>;
}
