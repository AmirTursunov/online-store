"use client";

import { useUser } from "@clerk/nextjs";
import BannerPromo from "./banner/page";
import HeroCarousel from "./carousel/page";
import Footer from "./footer/page";
import Navbar from "./navbar/page";
import Products from "./products/page";
import { log } from "console";

const Home = () => {
  const { user } = useUser();

  return (
    <div>
      <Navbar />
      <HeroCarousel />
      <Products />
      <BannerPromo />
      <Footer />
    </div>
  );
};

export default Home;
