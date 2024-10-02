"use client";
import Footer from "@/components/layout/Footer";
import { MainNavigation } from "./navigation/MainNavigation";
import { TopNavbar } from "./navigation/TopNavbar";

export default function GlobalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <TopNavbar />
      <MainNavigation />
      {children}
      <Footer />
    </div>
  );
}
