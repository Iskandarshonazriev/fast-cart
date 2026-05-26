import { useEffect, useState } from "react";
import axios from "axios";

import {
  ShoppingCart,
  Heart,
  Search,
  Moon,
  Sun,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useTheme } from "next-themes";

import { useTranslation } from "react-i18next";

import ProfileModal from "../components/ProfileModal";


type Product = {
  id: number;
  productName: string;
  price: number;
  image: string;
  quantity?: number;
};

export default function Navbar() {

  // ================= THEME =================

  const { theme, setTheme } =
    useTheme();

  // ================= TRANSLATE =================

  const { t, i18n } =
    useTranslation();

  // ================= SEARCH =================

  const [search, setSearch] =
    useState("");

  const [products, setProducts] =
    useState<Product[]>([]);

  const [
    filteredProducts,
    setFilteredProducts,
  ] = useState<Product[]>([]);

  const [openSearch, setOpenSearch] =
    useState(false);

  // ================= CART =================

  const [cart, setCart] =
    useState<Product[]>([]);

  // ================= FAVORITES =================

  const [favorites, setFavorites] =
    useState<Product[]>([]);

  // ================= API =================

  const url =
    "https://fastcard-1-o23z.onrender.com/api/Product/get-products";

  // ================= GET PRODUCTS =================

  useEffect(() => {

    async function getProducts() {

      try {

        const { data } =
          await axios.get(url);

        console.log(data);

        if (
          Array.isArray(
            data.data.products
          )
        ) {

          setProducts(
            data.data.products
          );

        } else {

          setProducts([]);

        }

      } catch (error) {

        console.log(error);

        setProducts([]);

      }
    }

    getProducts();

  }, []);

  // ================= SEARCH FILTER =================

  useEffect(() => {

    if (
      search.trim() === ""
    ) {

      setFilteredProducts([]);

      setOpenSearch(false);

      return;
    }

    const filtered =
      products.filter(
        (item: Product) => {

          return item.productName
            ?.toLowerCase()
            .trim()
            .includes(
              search
                .toLowerCase()
                .trim()
            );
        }
      );

    setFilteredProducts(filtered);

    setOpenSearch(true);

  }, [search, products]);

  // ================= LOAD CART =================

  useEffect(() => {

    const loadCart = () => {

      const savedCart =
        JSON.parse(
          localStorage.getItem("cart") || "[]"
        );

      setCart(savedCart);
    };

    loadCart();

    window.addEventListener(
      "cartUpdated",
      loadCart
    );

    return () => {

      window.removeEventListener(
        "cartUpdated",
        loadCart
      );
    };

  }, []);

  // ================= LOAD FAVORITES =================

  useEffect(() => {

    const loadFavorites = () => {

      const savedFavorites =
        JSON.parse(
          localStorage.getItem(
            "favorites"
          ) || "[]"
        );

      setFavorites(savedFavorites);
    };

    loadFavorites();

    window.addEventListener(
      "favoritesUpdated",
      loadFavorites
    );

    return () => {

      window.removeEventListener(
        "favoritesUpdated",
        loadFavorites
      );
    };

  }, []);

  return (
    <div
      className="
        sticky
        top-0
        z-50

        bg-white
        dark:bg-black

        text-black
        dark:text-white

        border-b

        duration-300
      "
    >

      {/* ================= NAVBAR ================= */}

      <div
        className="
          max-w-[1300px]
          mx-auto

          h-[90px]

          flex
          items-center
          justify-between

          px-4
        "
      >

        {/* ================= LOGO ================= */}

        <Link to="/">

          <h1
            className="
              text-[34px]
              font-bold
            "
          >
            Exclusive
          </h1>

        </Link>

        {/* ================= NAV ================= */}

        <div
          className="
            hidden
            lg:flex

            items-center
            gap-8
          "
        >

          <Link to="/">
            {t("home")}
          </Link>

          <Link to="/contact">
            {t("contact")}
          </Link>

          <Link to="/about">
            {t("about")}
          </Link>

          <Link to="/register">
            {t("signup")}
          </Link>

        </div>

        {/* ================= RIGHT ================= */}

        <div
          className="
            flex
            items-center
            gap-4
            relative
          "
        >

          {/* ================= SEARCH ================= */}

          <div className="relative">

            <div
              className="
                hidden
                md:flex

                items-center

                px-4

                h-[55px]
                w-[320px]

                rounded-2xl

                bg-gray-100
                dark:bg-zinc-900/50

                backdrop-blur-xl

                border
                border-transparent

                dark:border-zinc-800
              "
            >

              <input
                type="text"
                placeholder={t("search")}
                value={search}
                onChange={(e) =>
                  setSearch(
                    e.target.value
                  )
                }
                className="
                  flex-1
                  bg-transparent
                  outline-none
                "
              />

              <Search size={20} />

            </div>

            {/* ================= SEARCH DROPDOWN ================= */}

            {openSearch && (

              <div
                className="
                  absolute
                  top-16
                  left-0

                  w-[340px]

                  max-h-[400px]
                  overflow-y-auto

                  bg-white
                  dark:bg-zinc-900/95

                  backdrop-blur-2xl

                  border
                  border-gray-200
                  dark:border-zinc-800

                  rounded-2xl

                  overflow-hidden

                  shadow-[0_20px_60px_rgba(0,0,0,0.12)]
                  dark:shadow-[0_20px_80px_rgba(0,0,0,0.6)]

                  z-50
                "
              >

                {/* ================= EMPTY ================= */}

                {filteredProducts.length === 0 && (

                  <div
                    className="
                      p-5
                      text-center
                      text-gray-500
                    "
                  >
                    No Products
                  </div>

                )}

                {/* ================= PRODUCTS ================= */}

                {filteredProducts.map(
                  (item: Product) => (

                    <Link
                      key={item.id}
                      to={`/details/${item.id}`}
                      onClick={() => {

                        setSearch("");

                        setOpenSearch(false);

                      }}
                      className="
                        flex
                        items-center
                        gap-4

                        p-4

                        hover:bg-gray-100
                        dark:hover:bg-zinc-800

                        transition
                        duration-300
                      "
                    >

                      <img
                        src={
                          item.image ||
                          "https://via.placeholder.com/150"
                        }
                        alt=""
                        className="
                          w-16
                          h-16
                          object-contain
                        "
                      />

                      <div>

                        <h2
                          className="
                            font-semibold
                          "
                        >
                          {item.productName}
                        </h2>

                        <p
                          className="
                            text-red-500
                            font-bold
                            mt-1
                          "
                        >
                          ${item.price}
                        </p>

                      </div>

                    </Link>

                  )
                )}

              </div>

            )}

          </div>

          {/* ================= LANGUAGE ================= */}

          <div className="hidden md:flex gap-2">

            <button
              onClick={() =>
                i18n.changeLanguage("en")
              }
              className={`
                px-3
                py-1
                rounded-lg
                border

                ${
                  i18n.language === "en"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "dark:border-zinc-700"
                }
              `}
            >
              EN
            </button>

            <button
              onClick={() =>
                i18n.changeLanguage("ru")
              }
              className={`
                px-3
                py-1
                rounded-lg
                border

                ${
                  i18n.language === "ru"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "dark:border-zinc-700"
                }
              `}
            >
              RU
            </button>

          </div>

          {/* ================= THEME ================= */}

          <button
            onClick={() =>
              setTheme(
                theme === "dark"
                  ? "light"
                  : "dark"
              )
            }
            className="
              w-11
              h-11

              rounded-full

              flex
              items-center
              justify-center

              border
              dark:border-zinc-700
            "
          >

         {theme === "dark" ? (
  <Sun
    size={20}
    className="text-yellow-400"
  />
) : (
  <Moon
    size={20}
    className="text-black"
  />
)}

          </button>

          {/* ================= FAVORITES ================= */}

          <Link
            to="/wishlist"
            className="
              relative

              w-11
              h-11

              rounded-full

              flex
              items-center
              justify-center

              border
              dark:border-zinc-700
            "
          >

            <Heart size={20} />

            {favorites.length > 0 && (

              <span
                className="
                  absolute
                  -top-2
                  -right-2

                  w-5
                  h-5

                  rounded-full

                  bg-red-500
                  text-white

                  text-xs

                  flex
                  items-center
                  justify-center
                "
              >
                {favorites.length}
              </span>

            )}

          </Link>

          {/* ================= CART ================= */}

          <Link
            to="/cart"
            className="
              relative

              w-11
              h-11

              rounded-full

              flex
              items-center
              justify-center

              border
              dark:border-zinc-700
            "
          >

            <ShoppingCart size={20} />

            {cart.length > 0 && (

              <span
                className="
                  absolute
                  -top-2
                  -right-2

                  w-5
                  h-5

                  rounded-full

                  bg-red-500
                  text-white

                  text-xs

                  flex
                  items-center
                  justify-center
                "
              >
                {
                  cart.reduce(
                    (
                      total,
                      item: any
                    ) =>
                      total +
                      (item.quantity || 1),
                    0
                  )
                }
              </span>

            )}

          </Link>

          {/* ================= PROFILE ================= */}

          <ProfileModal />

        </div>

      </div>

    </div>
  );
}