import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import GlobalLayout from "@/components/layout/GlobalLayout";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/redux/store/provider"

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
        <ReduxProvider>
          <ThemeProvider attribute="class">
            <GlobalLayout>{children}</GlobalLayout>
            <Toaster />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}