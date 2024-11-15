"use client";
import Footer from "@/components/layout/Footer";
import { MainNavigation } from "./navigation/MainNavigation";
import TopNavbar from "./navigation/TopNavbar";
import FreeShippingBanner from "./FreeShippingBanner";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  console.log("PublicLayout rendu");

  return (
    <div>
      <FreeShippingBanner />
      <TopNavbar />
      <MainNavigation />
      {children}
      <Footer />
    </div>
  );
}
