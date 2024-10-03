import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import GlobalLayout from "@/components/layout/GlobalLayout";

export const metadata: Metadata = {
  title: "Atelier Noralya",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>
        <ThemeProvider attribute="class">
          <GlobalLayout>{children}</GlobalLayout>
        </ThemeProvider>
      </body>
    </html>
  );
}