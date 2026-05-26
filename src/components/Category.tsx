import axios from "axios";

import {
  Heart,
  Eye,
  ChevronDown,
  ShoppingCart,
  SlidersHorizontal,
  Star,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";

import { Link } from "react-router-dom";

const url =
  "https://fastcard-1-o23z.onrender.com/api/Product/get-products";

export default function Category() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [favorites, setFavorites] =
    useState<any[]>([]);

  // ================= CATEGORY =================

  const [
    selectedCategory,
    setSelectedCategory,
  ] = useState("All");

  // ================= BRANDS =================

  const [
    selectedBrands,
    setSelectedBrands,
  ] = useState<string[]>([]);

  // ================= FEATURES =================

  const [
    selectedFeatures,
    setSelectedFeatures,
  ] = useState<string[]>([]);

  // ================= PRICE =================

  const [minPrice, setMinPrice] =
    useState(0);

  const [maxPrice, setMaxPrice] =
    useState(999999);

  // ================= SORT =================

  const [sortType, setSortType] =
    useState("Popular");

  // ================= GET PRODUCTS =================

  async function getProduct() {

    try {

      const { data } =
        await axios.get(url);

      setProducts(
        data?.data?.products || []
      );

    } catch (error) {

      console.log(error);

    }
  }

  // ================= LOAD FAVORITES =================

  useEffect(() => {

    getProduct();

    const savedFavorites =
      JSON.parse(
        localStorage.getItem(
          "favorites"
        ) || "[]"
      );

    setFavorites(savedFavorites);

  }, []);

  // ================= BRAND FILTER =================

  const handleBrandChange = (
    brand: string
  ) => {

    setSelectedBrands(
      (prev) =>

        prev.includes(brand)
          ? prev.filter(
              (b) => b !== brand
            )
          : [...prev, brand]
    );
  };

  // ================= FEATURE FILTER =================

  const handleFeatureChange = (
    feature: string
  ) => {

    setSelectedFeatures(
      (prev) =>

        prev.includes(feature)
          ? prev.filter(
              (f) =>
                f !== feature
            )
          : [...prev, feature]
    );
  };

  // ================= FAVORITES =================

  const addToFavorites = (
    item: any
  ) => {

    const exists =
      favorites.find(
        (fav) =>
          fav.id === item.id
      );

    let updatedFavorites =
      [];

    if (exists) {

      updatedFavorites =
        favorites.filter(
          (fav) =>
            fav.id !== item.id
        );

    } else {

      updatedFavorites = [
        ...favorites,
        item,
      ];
    }

    setFavorites(
      updatedFavorites
    );

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

    alert(
      "Added to cart ✅"
    );
  };

  // ================= FILTER PRODUCTS =================

  let filteredProducts =
    products.filter(
      (item: any) => {

        const productPrice =
          Number(item.price);

        // CATEGORY

        const categoryMatch =
          selectedCategory ===
          "All"
            ? true
            : item.categoryName
                ?.toLowerCase()
                .includes(
                  selectedCategory.toLowerCase()
                );

        // BRAND

        const brandMatch =
          selectedBrands.length ===
          0
            ? true
            : selectedBrands.includes(
                item.brand
              );

        // FEATURES

        const featureMatch =
          selectedFeatures.length ===
          0
            ? true
            : selectedFeatures.some(
                (feature) =>
                  item.features?.includes(
                    feature
                  )
              );

        // PRICE

        const priceMatch =
          productPrice >=
            minPrice &&
          productPrice <=
            maxPrice;

        return (
          categoryMatch &&
          brandMatch &&
          featureMatch &&
          priceMatch
        );
      }
    );

  // ================= SORT =================

  if (sortType === "Price Low") {

    filteredProducts.sort(
      (a, b) =>
        a.price - b.price
    );
  }

  if (sortType === "Price High") {

    filteredProducts.sort(
      (a, b) =>
        b.price - a.price
    );
  }

  if (sortType === "Newest") {

    filteredProducts.reverse();
  }

  return (
    <section
      className="
        min-h-screen

        bg-[#fafafa]
        dark:bg-black

        text-black
        dark:text-white

        duration-300

        py-10
        px-4
      "
    >

      <div
        className="
          max-w-[1400px]
          mx-auto
        "
      >

        {/* ================= BREADCRUMB ================= */}

        <div
          className="
            flex
            items-center
            gap-2

            text-sm

            text-gray-400

            mb-10
          "
        >

          <p>Home</p>

          <span>/</span>

          <p
            className="
              text-black
              dark:text-white

              font-medium
            "
          >
            Explore Products
          </p>

        </div>

        {/* ================= CONTENT ================= */}

        <div
          className="
            flex
            gap-10
          "
        >

          {/* ================= SIDEBAR ================= */}

          <aside
            className="
              w-[300px]

              hidden
              lg:block

              bg-white
              dark:bg-zinc-900/70

              border
              border-gray-200
              dark:border-zinc-800

              rounded-3xl

              p-6

              h-fit

              backdrop-blur-2xl

              shadow-[0_10px_50px_rgba(0,0,0,0.06)]
              dark:shadow-[0_20px_100px_rgba(0,0,0,0.5)]
            "
          >

            {/* FILTER TITLE */}

            <div
              className="
                flex
                items-center
                gap-3

                mb-8
              "
            >

              <div
                className="
                  w-12
                  h-12

                  rounded-2xl

                  bg-[#DB4444]

                  text-white

                  flex
                  items-center
                  justify-center
                "
              >

                <SlidersHorizontal />

              </div>

              <div>

                <p
                  className="
                    text-gray-500
                  "
                >
                  Product Filters
                </p>

                <h2
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  Categories
                </h2>

              </div>

            </div>

            {/* CATEGORY */}

            <div
              className="
                border-b
                dark:border-zinc-800

                pb-6
                mb-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between

                  mb-4
                "
              >

                <h2
                  className="
                    font-semibold
                    text-[18px]
                  "
                >
                  Category
                </h2>

                <ChevronDown
                  size={18}
                />

              </div>

              <div
                className="
                  flex
                  flex-col
                  gap-3
                "
              >

                {[
                  "All",
                  "Electronics",
                  "Home & Lifestyle",
                  "Medicine",
                  "Sports & Outdoor",
                ].map(
                  (category) => (

                    <button
                      key={category}
                      onClick={() =>
                        setSelectedCategory(
                          category
                        )
                      }
                      className={`
                        text-left

                        transition-all
                        duration-300

                        hover:text-[#DB4444]

                        ${
                          selectedCategory ===
                          category
                            ? "text-[#DB4444] font-semibold"
                            : "text-gray-500"
                        }
                      `}
                    >
                      {category}
                    </button>

                  )
                )}

              </div>

            </div>

            {/* BRANDS */}

            <div
              className="
                border-b
                dark:border-zinc-800

                pb-6
                mb-6
              "
            >

              <div
                className="
                  flex
                  items-center
                  justify-between

                  mb-4
                "
              >

                <h2
                  className="
                    font-semibold
                    text-[18px]
                  "
                >
                  Brands
                </h2>

                <ChevronDown
                  size={18}
                />

              </div>

              <div
                className="
                  flex
                  flex-col
                  gap-4
                "
              >

                {[
                  "Samsung",
                  "Apple",
                  "Huawei",
                  "Pocco",
                  "Lenovo",
                ].map(
                  (brand) => (

                    <label
                      key={brand}
                      className="
                        flex
                        items-center
                        gap-3

                        cursor-pointer
                      "
                    >

                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(
                          brand
                        )}
                        onChange={() =>
                          handleBrandChange(
                            brand
                          )
                        }
                      />

                      {brand}

                    </label>

                  )
                )}

              </div>

            </div>

            {/* PRICE */}

            <div>

              <div
                className="
                  flex
                  items-center
                  justify-between

                  mb-4
                "
              >

                <h2
                  className="
                    font-semibold
                    text-[18px]
                  "
                >
                  Price Range
                </h2>

                <ChevronDown
                  size={18}
                />

              </div>

              <div
                className="
                  flex
                  gap-3

                  mb-4
                "
              >

                <input
                  type="number"
                  value={minPrice}
                  onChange={(e) =>
                    setMinPrice(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="
                    w-full

                    h-[50px]

                    rounded-xl

                    bg-gray-100
                    dark:bg-black/40

                    border
                    border-transparent

                    dark:border-zinc-800

                    px-4

                    outline-none
                  "
                  placeholder="Min"
                />

                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) =>
                    setMaxPrice(
                      Number(
                        e.target.value
                      )
                    )
                  }
                  className="
                    w-full

                    h-[50px]

                    rounded-xl

                    bg-gray-100
                    dark:bg-black/40

                    border
                    border-transparent

                    dark:border-zinc-800

                    px-4

                    outline-none
                  "
                  placeholder="Max"
                />

              </div>

            </div>

          </aside>

          {/* ================= PRODUCTS ================= */}

          <div className="flex-1">

            {/* TOP */}

            <div
              className="
                flex
                flex-col
                md:flex-row

                md:items-center
                md:justify-between

                gap-5

                mb-10
              "
            >

              <div>

                <p
                  className="
                    text-gray-500
                  "
                >
                  Showing
                  {" "}
                  {
                    filteredProducts.length
                  }
                  {" "}
                  products
                </p>

                <h1
                  className="
                    text-3xl
                    md:text-5xl

                    font-bold

                    mt-2
                  "
                >
                  Explore
                  Products
                </h1>

              </div>

              {/* SORT */}

              <select
                value={sortType}
                onChange={(e) =>
                  setSortType(
                    e.target.value
                  )
                }
                className="
                  h-[55px]

                  px-5

                  rounded-2xl

                  bg-white
                  dark:bg-zinc-900/70

                  border
                  border-gray-200
                  dark:border-zinc-800

                  outline-none
                "
              >

                <option>
                  Popular
                </option>

                <option>
                  Newest
                </option>

                <option>
                  Price Low
                </option>

                <option>
                  Price High
                </option>

              </select>

            </div>

            {/* GRID */}

            <div
              className="
                grid
                grid-cols-1
                sm:grid-cols-2
                xl:grid-cols-3

                gap-8
              "
            >

              {filteredProducts?.map(
                (item: any) => (

                  <div
                    key={item.id}
                  >

                    {/* CARD */}

                    <div
                      className="
                        group

                        bg-white
                        dark:bg-zinc-900/70

                        rounded-3xl

                        h-[300px]

                        relative

                        flex
                        items-center
                        justify-center

                        overflow-hidden

                        border
                        border-gray-200
                        dark:border-zinc-800

                        backdrop-blur-2xl

                        transition-all
                        duration-500

                        hover:-translate-y-2

                        shadow-[0_10px_40px_rgba(0,0,0,0.08)]
                        dark:shadow-[0_20px_80px_rgba(0,0,0,0.5)]
                      "
                    >

                      {/* IMAGE */}

                      <img
                        src={
                          item.image?.startsWith(
                            "http"
                          )
                            ? item?.image
                            : "https://fastcard-1-o23z.onrender.com/images/" +
                              item?.image
                        }
                        alt={
                          item.description
                        }
                        className="
                          w-[170px]
                          h-[170px]

                          object-contain

                          duration-500

                          group-hover:scale-110
                        "
                      />

                      {/* ICONS */}

                      <div
                        className="
                          absolute
                          top-4
                          right-4

                          flex
                          flex-col
                          gap-3
                        "
                      >

                        <button
                          onClick={() =>
                            addToFavorites(
                              item
                            )
                          }
                          className="
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

                            transition-all
                            duration-300

                            hover:scale-110
                          "
                        >

                          <Heart
                            size={18}
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

                        <Link
                          to={`/details/${item.id}`}
                          className="
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

                            transition-all
                            duration-300

                            hover:scale-110
                          "
                        >

                          <Eye
                            size={18}
                          />

                        </Link>

                      </div>

                      {/* ADD TO CART */}

                      <button
                        onClick={() =>
                          addToCart(
                            item
                          )
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

                          translate-y-full
                          group-hover:translate-y-0

                          duration-500
                        "
                      >

                        <ShoppingCart
                          size={22}
                        />

                        Add To Cart

                      </button>

                    </div>

                    {/* CONTENT */}

                    <div className="mt-5">

                      <h3
                        className="
                          font-semibold

                          text-[20px]

                          line-clamp-1
                        "
                      >
                        {
                          item.productName
                        }
                      </h3>

                      <div
                        className="
                          flex
                          items-center
                          gap-3

                          mt-3
                        "
                      >

                        <span
                          className="
                            text-[#DB4444]

                            text-2xl

                            font-bold
                          "
                        >
                          $
                          {item.price}
                        </span>

                        <div
                          className="
                            flex
                            items-center
                            gap-1
                          "
                        >

                          {[1,2,3,4,5].map(
                            (
                              star
                            ) => (

                              <Star
                                key={
                                  star
                                }
                                size={
                                  16
                                }
                                className="
                                  fill-yellow-400
                                  text-yellow-400
                                "
                              />

                            )
                          )}

                        </div>

                        <span
                          className="
                            text-gray-500
                            text-sm
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

          </div>

        </div>

      </div>

    </section>
  );
}