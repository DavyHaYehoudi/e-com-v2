import DashboardCustomerLayout from "@/components/layout/dashboard/customer/DashboardCustomerLayout";

export default function RootLayoutCustomer({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <DashboardCustomerLayout>{children}</DashboardCustomerLayout>;
}
