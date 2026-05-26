import { Card } from "@/components/ui/card";

import {
  Heart,
  Trash2,
  ShoppingCart,
  Star,
  ShoppingBag,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useEffect, useState } from "react";

export default function WishlistPage() {

  const [favorites, setFavorites] =
    useState<any[]>([]);

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

  // ================= REMOVE FAVORITE =================

  const removeFavorite = (
    id: number
  ) => {

    const updated =
      favorites.filter(
        (item) =>
          item.id !== id
      );

    setFavorites(updated);

    localStorage.setItem(
      "favorites",
      JSON.stringify(updated)
    );

    window.dispatchEvent(
      new Event(
        "favoritesUpdated"
      )
    );
  };

  // ================= ADD TO CART =================

  const addToCart = (
    product: any
  ) => {

    const savedCart =
      JSON.parse(
        localStorage.getItem(
          "cart"
        ) || "[]"
      );

    const existingProduct =
      savedCart.find(
        (item: any) =>
          item.id === product.id
      );

    let updatedCart = [];

    if (existingProduct) {

      updatedCart =
        savedCart.map(
          (item: any) => {

            if (
              item.id ===
              product.id
            ) {

              return {
                ...item,
                quantity:
                  (item.quantity ||
                    1) + 1,
              };
            }

            return item;
          }
        );

    } else {

      updatedCart = [
        ...savedCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    }

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // ================= MOVE ALL =================

  const moveAllToCart = () => {

    const savedCart =
      JSON.parse(
        localStorage.getItem(
          "cart"
        ) || "[]"
      );

    let updatedCart = [
      ...savedCart,
    ];

    favorites.forEach(
      (product) => {

        const exists =
          updatedCart.find(
            (item: any) =>
              item.id ===
              product.id
          );

        if (!exists) {

          updatedCart.push({
            ...product,
            quantity: 1,
          });
        }
      }
    );

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );

    alert(
      "All products moved to cart ✅"
    );
  };

  return (
    <div
      className="
        min-h-screen

        bg-[#fafafa]
        dark:bg-black

        text-black
        dark:text-white

        duration-300

        py-16
        px-4
      "
    >

      <div
        className="
          max-w-[1400px]
          mx-auto
        "
      >

        {/* ================= TOP ================= */}

        <div
          className="
            flex
            flex-col
            md:flex-row

            md:items-center
            md:justify-between

            gap-5

            mb-16
          "
        >

          <div>

            <p
              className="
                text-gray-500
                dark:text-gray-400
              "
            >
              Your Favorite Products
            </p>

            <h1
              className="
                text-3xl
                md:text-5xl

                font-bold

                mt-2
              "
            >
              Wishlist
              <span
                className="
                  text-[#DB4444]
                "
              >
                {" "}
                ({favorites.length})
              </span>
            </h1>

          </div>

          {favorites.length > 0 && (

            <button
              onClick={
                moveAllToCart
              }
              className="
                h-[60px]

                px-8

                rounded-2xl

                bg-[#DB4444]
                hover:bg-red-600

                text-white

                font-semibold
                text-lg

                flex
                items-center
                justify-center
                gap-3

                transition-all
                duration-300

                shadow-lg

                hover:scale-[1.02]
              "
            >

              <ShoppingBag
                size={22}
              />

              Move All To Cart

            </button>

          )}

        </div>

        {/* ================= EMPTY ================= */}

        {favorites.length === 0 ? (

          <div
            className="
              text-center

              py-32

              bg-white
              dark:bg-zinc-900/40

              rounded-3xl

              border
              border-gray-200
              dark:border-zinc-800

              backdrop-blur-2xl

              shadow-[0_10px_50px_rgba(0,0,0,0.06)]
              dark:shadow-[0_20px_100px_rgba(0,0,0,0.5)]
            "
          >

            <div
              className="
                w-[120px]
                h-[120px]

                rounded-full

                bg-red-100
                dark:bg-red-500/10

                flex
                items-center
                justify-center

                mx-auto
              "
            >

              <Heart
                size={60}
                className="
                  text-[#DB4444]
                "
              />

            </div>

            <h2
              className="
                text-4xl
                font-bold

                mt-10
              "
            >
              No Favorites Yet
            </h2>

            <p
              className="
                text-gray-500
                dark:text-gray-400

                mt-5
                text-lg
              "
            >
              Start adding products
              to your wishlist ❤️
            </p>

            <Link
              to="/"
              className="
                inline-flex

                mt-10

                h-[56px]

                px-8

                rounded-2xl

                bg-[#DB4444]
                hover:bg-red-600

                text-white

                items-center
                justify-center

                font-semibold

                transition-all
                duration-300

                hover:scale-[1.02]
              "
            >
              Continue Shopping
            </Link>

          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4

              gap-6
              md:gap-10
            "
          >

            {favorites.map(
              (item: any) => (

                <div key={item.id}>

                  {/* ================= CARD ================= */}

                  <Card
                    className="
                      group

                      bg-white
                      dark:bg-zinc-900/70

                      backdrop-blur-2xl

                      border
                      border-gray-200
                      dark:border-zinc-800

                      relative
                      overflow-hidden

                      rounded-3xl

                      h-[260px]
                      md:h-[360px]

                      transition-all
                      duration-500

                      hover:-translate-y-2

                      shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                      dark:shadow-[0_20px_80px_rgba(0,0,0,0.5)]

                      hover:shadow-[0_20px_100px_rgba(0,0,0,0.15)]
                      dark:hover:shadow-[0_20px_100px_rgba(0,0,0,0.7)]
                    "
                  >

                    {/* DELETE */}

                    <button
                      onClick={() =>
                        removeFavorite(
                          item.id
                        )
                      }
                      className="
                        absolute
                        top-4
                        right-4
                        z-20

                        w-11
                        h-11

                        rounded-full

                        bg-white/90
                        dark:bg-black/40

                        backdrop-blur-xl

                        border
                        border-gray-200
                        dark:border-zinc-700

                        flex
                        items-center
                        justify-center

                        transition
                        duration-300

                        hover:scale-110
                      "
                    >

                      <Trash2
                        size={20}
                      />

                    </button>

                    {/* IMAGE */}

                    <div
                      className="
                        h-full

                        flex
                        items-center
                        justify-center
                      "
                    >

                      <img
                        src={
                          item.image?.startsWith(
                            "http"
                          )
                            ? item.image
                            : `https://fastcard-1-o23z.onrender.com/images/${item.image}`
                        }
                        alt=""
                        className="
                          w-[140px]
                          md:w-[240px]

                          h-[140px]
                          md:h-[240px]

                          object-contain

                          transition-all
                          duration-500

                          group-hover:scale-110
                        "
                      />

                    </div>

                    {/* ADD TO CART */}

                    <button
                      onClick={() =>
                        addToCart(item)
                      }
                      className="
                        absolute
                        bottom-0
                        left-0

                        w-full

                        bg-black
                        dark:bg-white

                        dark:text-black
                        text-white

                        py-4

                        flex
                        items-center
                        justify-center
                        gap-3

                        text-lg
                        font-medium

                        transition-all
                        duration-300

                        hover:opacity-90
                      "
                    >

                      <ShoppingCart
                        size={22}
                      />

                      Add To Cart

                    </button>

                  </Card>

                  {/* ================= CONTENT ================= */}

                  <div className="mt-5">

                    <h2
                      className="
                        text-lg
                        md:text-2xl

                        font-semibold

                        line-clamp-1
                      "
                    >
                      {
                        item.productName
                      }
                    </h2>

                    {/* PRICE */}

                    <div
                      className="
                        flex
                        items-center
                        gap-4

                        mt-3
                      "
                    >

                      <span
                        className="
                          text-[#DB4444]

                          text-xl
                          md:text-2xl

                          font-bold
                        "
                      >
                        ${item.price}
                      </span>

                      <span
                        className="
                          text-gray-400

                          line-through

                          text-lg
                          md:text-xl
                        "
                      >
                        $
                        {item.price +
                          100}
                      </span>

                    </div>

                    {/* STARS */}

                    <div
                      className="
                        flex
                        items-center
                        gap-2

                        mt-4
                      "
                    >

                      {[1,2,3,4,5].map(
                        (star) => (

                          <Star
                            key={star}
                            size={18}
                            className="
                              fill-yellow-400
                              text-yellow-400
                            "
                          />

                        )
                      )}

                      <span
                        className="
                          text-gray-500
                        "
                      >
                        (65)
                      </span>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>

    </div>
  );
}