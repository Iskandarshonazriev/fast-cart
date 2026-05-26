import React, { useRef, useState } from "react";

import Products from "./productApi/productskidki";
import Category from "./Category";
import BrowseCategory from "./productApi/BrowseCategory";
import BestSelling from "./productApi/BestSelling";
import MusicBanner from "./productApi/MusicBanner";
import ExploreProducts from "./productApi/ExploreProducts";
import NewArrival from "./productApi/NewArrival";


const Todays = () => {

  // slider ref
  const sliderRef = useRef<HTMLDivElement>(null);

  // left
  const scrollLeft = () => {

    if (sliderRef.current) {

      sliderRef.current.scrollBy({
        left: -350,
        behavior: "smooth",
      });

    }
  };

  // right
  const scrollRight = () => {

    if (sliderRef.current) {

      sliderRef.current.scrollBy({
        left: 350,
        behavior: "smooth",
      });

    }
  };

  return (
    <div className="max-w-[1200px] m-auto mt-[100px]">

      {/* ================= MOBILE ================= */}

      <div className="lg:hidden px-5 mt-10">

        {/* Today */}
        <section className="flex items-center gap-4">

          <svg
            width="16"
            height="32"
            viewBox="0 0 20 40"
            fill="none"
          >
            <rect
              width="20"
              height="40"
              rx="4"
              fill="#DB4444"
            />
          </svg>

          <b className="text-[#DB4444] text-[18px]">
            Today's
          </b>

        </section>

        {/* Flash Sales */}
        <section className="mt-6">

          <b className="text-[32px]">
            Flash Sales
          </b>

        </section>

        {/* time */}
        <section className="mt-6">

          <div className="flex justify-between text-[13px] text-gray-500">

            <p>Days</p>
            <p>Hours</p>
            <p>Minutes</p>
            <p>Seconds</p>

          </div>

          <div className="flex justify-between text-[28px] font-bold mt-2">

            <b>
              03
              <span className="text-[#E07575] ml-2">
                :
              </span>
            </b>

            <b>
              23
              <span className="text-[#E07575] ml-2">
                :
              </span>
            </b>

            <b>
              19
              <span className="text-[#E07575] ml-2">
                :
              </span>
            </b>

            <b>56</b>

          </div>

        </section>

        {/* arrows */}
        <section className="flex gap-3 mt-6">

          <button
            onClick={scrollLeft}
            className="
              w-[45px]
              h-[45px]
              rounded-full
              bg-[#F5F5F5]
              flex
              items-center
              justify-center
              text-[22px]
              hover:bg-gray-200
            "
          >
            ←
          </button>

          <button
            onClick={scrollRight}
            className="
              w-[45px]
              h-[45px]
              rounded-full
              bg-[#F5F5F5]
              flex
              items-center
              justify-center
              text-[22px]
              hover:bg-gray-200
            "
          >
            →
          </button>

        </section>

      </div>

      {/* ================= DESKTOP ================= */}

      <div className="hidden lg:block">

        <section className="flex items-center gap-[16px]">

          <svg width="20" height="40">

            <rect
              width="20"
              height="40"
              rx="4"
              fill="#DB4444"
            />

          </svg>

          <b className="text-[#DB4444]">
            Today’s
          </b>

        </section>

        <section className="flex items-center justify-between mt-[24px]">

          <b className="text-[36px]">
            Flash Sales
          </b>

          <section>

            <section className="flex items-center gap-[55px]">

              <p>Days</p>
              <p>Hours</p>
              <p>Minutes</p>
              <p>Seconds</p>

            </section>

            <section className="flex items-center gap-[38px] text-[32px]">

              <b>03 :</b>
              <b>23 :</b>
              <b>19 :</b>
              <b>56</b>

            </section>

          </section>

          {/* arrows */}
          <section className="flex items-center gap-[10px]">

            <button
              onClick={scrollLeft}
              className="
                w-[46px]
                h-[46px]
                rounded-full
                bg-[#F5F5F5]
                hover:bg-gray-200
                text-[22px]
              "
            >
              ←
            </button>

            <button
              onClick={scrollRight}
              className="
                w-[46px]
                h-[46px]
                rounded-full
                bg-[#F5F5F5]
                hover:bg-gray-200
                text-[22px]
              "
            >
              →
            </button>

          </section>

        </section>

      </div>

      {/* PRODUCTS */}
      <section
        ref={sliderRef}
        className="
          overflow-x-auto
          scroll-smooth
          scrollbar-hide
          mt-10
        "
      >

        <Products />

      </section>

      <BrowseCategory />

      <hr className="mt-[100px]" />

      <BestSelling />

      <hr className="mt-[100px]" />

      <MusicBanner />

      <ExploreProducts />

      <NewArrival />

    </div>
  );
};

export default Todays;