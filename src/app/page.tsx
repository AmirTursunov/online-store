"use client";

import BannerPromo from "./banner/page";
import HeroCarousel from "./carousel/page";
import Footer from "./footer/page";
import Navbar from "./navbar/page";
import Products from "./products/page";

const Home = () => {
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
