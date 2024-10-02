import React from "react";
import { PartnerCards } from "@/components/pages/home/PartnerCards";
import Banner from "@/components/pages/home/Banner";
import Legals from "@/components/pages/home/Legals";
import HeroTitles from "@/components/pages/home/HeroTitles";
import HeroBanner from "@/components/pages/home/HeroBanner";
import Products from "@/components/pages/home/Products";

const Home = () => {
  return (
    <main>
      <HeroBanner />
      <HeroTitles />
      <hr />
      <Banner pathImage="/images/home-bck-3.jpeg" />
      <Products />
      <Legals />
      <Banner pathImage="/images/home-bck-4.jpeg" />
      <PartnerCards />
    </main>
  );
};

export default Home;
