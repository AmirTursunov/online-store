"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";
import "./carousel.css";

const HeroCarousel = () => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      loop
      autoplay={{ delay: 4000 }}
      className="my-5"
    >
      {/* First Slide */}
      <SwiperSlide>
        <div className="d-flex flex-md-row flex-column align-items-center justify-content-between px-4 px-md-5 py-4 bg-light rounded shadow-sm carousel-slide">
          <div className="carousel-content text-md-start text-center mb-4 mb-md-0">
            <h2 className="fw-bold mb-3 swiper-title">Welcome to GreenShop</h2>
            <p className="mb-4 swiper-body" style={{ color: "black" }}>
              Let’s Make a Better <span className="text-success">Planet</span>
            </p>
            <Link href="/shop" className="btn btn-success">
              Shop Now
            </Link>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="hide-on-small" style={{ width: "300px" }}>
              <Image
                src="/flower1.png"
                alt="Fresh Air Plants"
                width={200}
                height={100}
                className="rounded"
              />
            </div>

            <Image
              src="/flower1.png"
              alt="Fresh Air Plants"
              width={400}
              height={300}
              className="rounded"
            />
          </div>
        </div>
      </SwiperSlide>

      {/* Second Slide */}
      <SwiperSlide>
        <div className="d-flex flex-md-row flex-column align-items-center justify-content-between px-4 px-md-5 py-4 bg-light rounded shadow-sm carousel-slide">
          <div className="carousel-content text-md-start text-center mb-4 mb-md-0">
            <h2 className="fw-bold mb-3 swiper-title-slide2">Natural Vibes</h2>
            <p className="mb-4 swiper-body-slide2" style={{ color: "black" }}>
              Bring nature closer to your{" "}
              <span className="text-success">home</span>.
            </p>
            <Link href="/plant-care" className="btn btn-success">
              Explore
            </Link>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="hide-on-small" style={{ width: "300px" }}>
              <Image
                src="/flower1.png"
                alt="Fresh Air Plants"
                width={200}
                height={100}
                className="rounded"
              />
            </div>

            <Image
              src="/flower1.png"
              alt="Fresh Air Plants"
              width={400}
              height={300}
              className="rounded"
            />
          </div>
        </div>
      </SwiperSlide>

      {/* Third Slide */}
      <SwiperSlide>
        <div className="d-flex flex-md-row flex-column align-items-center justify-content-between px-4 px-md-5 py-4 bg-light rounded shadow-sm carousel-slide">
          <div className="carousel-content text-md-start text-center mb-4 mb-md-0">
            <h2 className="fw-bold mb-3 swiper-title-slide2">
              Fresh Air Plants
            </h2>
            <p className="mb-4 swiper-body-slide3" style={{ color: "black" }}>
              Perfect plants to purify your{" "}
              <span className="text-success">space</span>.
            </p>
            <Link href="/shop" className="btn btn-success">
              Get Yours
            </Link>
          </div>
          <div className="d-flex justify-content-center align-items-center">
            <div className="hide-on-small" style={{ width: "300px" }}>
              <Image
                src="/flower1.png"
                alt="Fresh Air Plants"
                width={200}
                height={100}
                className="rounded"
              />
            </div>

            <Image
              src="/flower1.png"
              alt="Fresh Air Plants"
              width={400}
              height={300}
              className="rounded"
            />
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HeroCarousel;
