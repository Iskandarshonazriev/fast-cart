import React from "react";

import axios from "axios";
import AiChat from "./AiChat";

import { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import { useTranslation } from "react-i18next";

import Todays from "./todays";

import Banner from "./productApi/banner";

const urlProduct =
  "https://fastcard-1-o23z.onrender.com/api/Category/get-categories";

const Home = () => {
const [loading, setLoading] =
  useState(true);
  // ================= TRANSLATE =================

  const { t, i18n } = useTranslation();

  // ================= DATA =================

  const [data, setData] = useState<any[]>([]);

  // ================= GET CATEGORY =================

  async function getProduct() {

    try {

      const { data } =
        await axios.get(urlProduct);

      setData(data.data);

    } catch (error) {

      console.log(error);

    }
  }

  useEffect(() => {

    getProduct();

  }, []);
  useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
  }, 5000);

  return () => clearTimeout(timer);
}, []);

if (loading) {
  return (
    <div
      className="
        fixed
        inset-0

        bg-black

        overflow-hidden

        flex
        items-center
        justify-center
      "
    >

      {/* BACKGROUND */}

      <div
        className="
          absolute

          w-[700px]
          h-[700px]

          rounded-full

          bg-red-500/20

          blur-[160px]

          animate-pulse
        "
      />

      <div
        className="
          absolute

          w-[400px]
          h-[400px]

          rounded-full

          border-[40px]
          border-red-500/10

          animate-spin

          duration-[12000ms]
        "
      />

      {/* CARD */}

      <div
        className="
          relative
          z-10

          w-[95%]
          max-w-[650px]

          rounded-[40px]

          border
          border-white/10

          bg-white/5

          backdrop-blur-2xl

          p-12

          text-center

          shadow-[0_20px_120px_rgba(255,0,0,0.15)]
        "
      >

        {/* LOGO */}

        <div
          className="
            w-[140px]
            h-[140px]

            rounded-full

            bg-gradient-to-r
            from-red-500
            to-orange-500

            mx-auto

            flex
            items-center
            justify-center

            shadow-[0_10px_60px_rgba(255,0,0,0.4)]

            animate-pulse
          "
        >

          <h1
            className="
              text-white

              text-5xl

              font-black
            "
          >
            T
          </h1>

        </div>

        {/* TITLE */}

        <h1
          className="
            text-white

            text-5xl
            md:text-7xl

            font-black

            mt-10

            tracking-[6px]
          "
        >
          {t("technopark")}
        </h1>

        {/* SUBTITLE */}

        <p
          className="
            text-white/60

            text-xl

            mt-6

            leading-[180%]
          "
        >
          {t("welcome")}
          <br />
          {t("dontLeave")}
        </p>

        {/* LOADING BAR */}

        <div
          className="
            w-full
            h-[12px]

            bg-white/10

            rounded-full

            overflow-hidden

            mt-12
          "
        >

          <div
            className="
              h-full

              bg-gradient-to-r
              from-red-500
              to-orange-500

              rounded-full

              animate-[loading_3s_linear_forwards]
            "
            style={{
              width: "100%",
            }}
          />

        </div>

        {/* TEXT */}

        <p
          className="
            text-white/40

            mt-6

            tracking-[3px]
          "
        >
          {t("loadingProducts")}
        </p>

      </div>

    </div>
  );
}
  return (
    
     <>
     
    <div
      className="
      bg-white
      dark:bg-black
      text-black
      dark:text-white
      duration-300
      min-h-screen
      "
      >
      

      {/* ================= LANGUAGE ================= */}

      <div
        className="
        max-w-[1200px]
        mx-auto
        flex
        justify-end
        gap-3
        pt-5
        px-5
        "
        >

      

      </div>

      {/* ===== MOBILE КАТАЛОГ ===== */}

      <div className="lg:hidden mt-5 px-5">

        {/* SEARCH */}

        <div
          className="
          border
          rounded-lg
          h-[65px]
          px-5
          flex
          items-center
          justify-between
          dark:bg-zinc-900
          "
          >

          <input
            placeholder={t("search")}
            className="
            outline-none
            w-full
            bg-transparent
            "
            />

        </div>

        {/* CATEGORIES */}

        <div className="flex flex-wrap gap-3 mt-6">

          {data.map(
            (
              item: any,
              index: number
            ) => (
              
              <Link
              key={item.id}
              to={`/category/${item.id}`}
              >

                <div
                  className="
                  bg-gray-100
                  dark:bg-zinc-900
                  px-4
                  py-4
                  rounded-lg
                  flex
                  gap-2
                  hover:bg-gray-200
                  dark:hover:bg-zinc-800
                  duration-200
                  "
                  >

                  {item.categoryName}

                  {index <= 1 && (
                    <span>›</span>
                  )}

                </div>

                
              </Link>

            )
          )}

        </div>

      </div>

      {/* ================= DESKTOP ================= */}

      <div
        className="
        max-w-[1200px]
        mx-auto
        mt-5
        flex
        gap-8
      "
      >

        {/* LEFT MENU */}

        <div
          className="
          hidden
          lg:block
          w-[250px]
          border-r
          pr-6
        "
        >

          <div
            className="
            flex
            flex-col
            text-[18px]
          "
          >

            {data.map((item: any) => (

              <div
                key={item.id}
                className="
                relative
                group
              "
              >

                {/* MAIN CATEGORY */}

                <Link
                  to={`/category/${item.id}`}
                >

                  <div
                    className="
                    flex
                    items-center
                    justify-between
                    px-3
                    py-4
                    hover:bg-gray-100
                    dark:hover:bg-zinc-900
                    rounded-lg
                    cursor-pointer
                    duration-200
                  "
                  >

                    <p>
                      {item.categoryName}
                    </p>

                    <span>›</span>

                  </div>

                </Link>

                {/* SUB MENU */}

                <div
                  className="
                  hidden
                  group-hover:block
                  absolute
                  top-0
                  left-full
                  w-[300px]
                  bg-white
                  dark:bg-zinc-900
                  shadow-2xl
                  rounded-xl
                  border
                  p-5
                  z-50
                "
                >

                  <div
                    className="
                    flex
                    flex-col
                    gap-4
                  "
                  >

                    <Link
                      to="/category/1"
                      className="
                      hover:text-red-500
                      cursor-pointer
                    "
                    >
                      {t("phones")}
                    </Link>

                    <Link
                      to="/category/1"
                      className="
                      hover:text-red-500
                      cursor-pointer
                    "
                    >
                      {t("laptops")}
                    </Link>

                    <Link
                      to="/category/1"
                      className="
                      hover:text-red-500
                      cursor-pointer
                    "
                    >
                      {t("watch")}
                    </Link>

                    <Link
                      to="/category/1"
                      className="
                      hover:text-red-500
                      cursor-pointer
                    "
                    >
                      {t("headphones")}
                    </Link>

                    <Link
                      to="/category/1"
                      className="
                      hover:text-red-500
                      cursor-pointer
                    "
                    >
                      {t("cameras")}
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* BANNER */}

        <Banner />

      </div>

      {/* PRODUCTS */}

      <Todays />
<AiChat />
    </div>
      </>
  );
};

export default Home;