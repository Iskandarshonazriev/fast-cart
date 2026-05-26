import { Card } from "@/components/ui/card";
import { Heart, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const url =
  "https://fastcard-1-o23z.onrender.com/api/Product/get-products";

export default function Products() {
  const [products, setProducts] =
    useState<any[]>([]);

  const [favorites, setFavorites] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  // ================= GET PRODUCTS =================

  async function getProducts() {
    try {
      const { data } =
        await axios.get(url);

     setProducts(data.data.products)
    } catch (error) {
      console.log(error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }

  // ================= LOAD FAVORITES =================

  useEffect(() => {
    getProducts();

    const savedFavorites =
      JSON.parse(
        localStorage.getItem(
          "favorites"
        ) || "[]"
      );

    setFavorites(savedFavorites);
  }, []);

  // ================= ADD TO CART =================

const addToCart = (
  product: any
) => {

  const savedCart = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const existingProduct =
    savedCart.find(
      (item: any) =>
        item.id === product.id
    );

  let updatedCart = [];

  // если товар уже есть
  if (existingProduct) {

    updatedCart = savedCart.map(
      (item: any) => {

        if (item.id === product.id) {

          return {
            ...item,
            quantity:
              (item.quantity || 1) + 1,
          };
        }

        return item;
      }
    );

  } else {

    // если товара нет
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
  // ================= FAVORITES =================

  const addToFavorites = (
    product: any
  ) => {
    const savedFavorites =
      JSON.parse(
        localStorage.getItem(
          "favorites"
        ) || "[]"
      );

    const isExist =
      savedFavorites.find(
        (item: any) =>
          item.id === product.id
      );

    let updatedFavorites = [];

    if (isExist) {
      updatedFavorites =
        savedFavorites.filter(
          (item: any) =>
            item.id !== product.id
        );
    } else {
      updatedFavorites = [
        ...savedFavorites,
        product,
      ];
    }

    setFavorites(updatedFavorites);

    localStorage.setItem(
      "favorites",
      JSON.stringify(
        updatedFavorites
      )
    );

    window.dispatchEvent(
      new Event(
        "favoritesUpdated"
      )
    );
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <div
        className="
          text-center
          py-20
          text-3xl
          font-bold
        "
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      className="
        max-w-[1400px]
        mx-auto
        py-10
        px-4
      "
    >
      {products.length === 0 ? (
        <div
          className="
            text-center
            text-3xl
            font-bold
          "
        >
          No Products
        </div>
      ) : (
        <div
          className="
            grid
            grid-cols-2
            md:grid-cols-4
            gap-4
            md:gap-8
          "
        >
          {products.map(
            (item: any) => (
              <div key={item.id}>
                <Card
                  className="
                    group
                    bg-[#f5f5f5]
                    dark:bg-transparent
                    dark:border
                    dark:border-zinc-700
                    border-none
                    p-3
                    md:p-5
                    relative
                    overflow-hidden
                    rounded-md
                  "
                >
                  {/* HEART */}

                  <div
                    className="
                      absolute
                      right-3
                      top-3
                      flex
                      flex-col
                      gap-3
                      z-30
                    "
                  >
                    <button
                      onClick={() =>
                        addToFavorites(
                          item
                        )
                      }
                      className="
                        bg-white
                        dark:bg-zinc-900/40
                        p-2
                        rounded-full
                      "
                    >
                      <Heart
                        size={20}
                        className={
                          favorites.find(
                            (
                              fav
                            ) =>
                              fav.id ===
                              item.id
                          )
                            ? "fill-red-500 text-red-500"
                            : ""
                        }
                      />
                    </button>

                    {/* DETAILS */}

                    <Link
                      to={`/details/${item.id}`}
                      className="
                        bg-white
                        dark:bg-zinc-900/40
                        p-2
                        rounded-full
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Eye size={20} />
                    </Link>
                  </div>

                  {/* IMAGE */}

                  <div
                    className="
                      h-[160px]
                      md:h-[250px]
                      flex
                      items-center
                      justify-center
                    "
                  >
                    <img
                      src={item.image}
                      alt=""
                      className="
                        w-[140px]
                        md:w-[230px]
                        h-[140px]
                        md:h-[200px]
                        object-contain
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
                      left-0
                      w-full
                      bg-black
                      text-white
                      py-3
                      md:py-4
                      text-sm
                      md:text-xl
                      transition-all
                      duration-300
                      md:bottom-[-70px]
                      md:group-hover:bottom-0
                      bottom-0
                    "
                  >
                    Add To Cart
                  </button>
                </Card>

                {/* TEXT */}

                <div className="mt-4">
                  <h2
                    className="
                      font-semibold
                      text-[16px]
                      md:text-[22px]
                    "
                  >
                    {item.productName}
                  </h2>

                  <div className="flex gap-3 mt-2">
                    <span
                      className="
                        text-red-500
                        text-lg
                        md:text-2xl
                        font-semibold
                      "
                    >
                      ${item.price}
                    </span>
                  </div>

                  <div
                    className="
                      flex
                      items-center
                      gap-2
                      mt-2
                    "
                  >
                    {[...Array(5)].map(
                      (_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={
                            i < 4
                              ? "orange"
                              : "lightgray"
                          }
                        />
                      )
                    )}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}