import PublicLayout from "@/components/layout/PublicLayout";

export default function RootLayoutPublic({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PublicLayout children={children}></PublicLayout>;
}
