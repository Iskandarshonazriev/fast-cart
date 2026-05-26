import { Card } from "@/components/ui/card";
import { Heart, Eye, Star, StarHalf } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
const url =
  "https://fastcard-1-o23z.onrender.com/api/Product/get-products";

function Rating({ value }: { value: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        if (star <= Math.floor(value)) {
          return (
            <Star
              key={star}
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
          );
        }

        if (star - value <= 0.5 && star > value) {
          return (
            <StarHalf
              key={star}
              size={16}
              className="fill-yellow-400 text-yellow-400"
            />
          );
        }

        return (
          <Star
            key={star}
            size={16}
            className="text-gray-300"
          />
        );
      })}
    </div>
  );
}

export default function ExploreProducts() {

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function getProducts() {

    try {

      const { data } = await axios.get(url);

      console.log(data);

      // ВСЕ ПРОДУКТЫ
      const allProducts =
        data?.data?.products ||
        data?.data ||
        [];

      // ТОЛЬКО СО СКИДКОЙ
      const discountProducts = allProducts.filter(
        (item: any) => item.hasDiscount === true
      );

      // RANDOM
      const randomProducts = [...discountProducts].sort(
        () => Math.random() - 0.5
      );

      setProducts(randomProducts);

    } catch (error) {

      console.log(error);
      setProducts([]);

    } finally {

      setLoading(false);

    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // LOADING
  if (loading) {
    return (
      <div className="text-center py-20 text-3xl font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto py-16 px-4">

      {/* top */}
      <div className="flex items-center gap-4">

        <div className="w-5 h-12 bg-red-500 rounded"></div>

        <p className="text-red-500 font-semibold">
          Our Products
        </p>

      </div>

      <h1 className="text-5xl font-bold mt-8">
        Explore Our Products
      </h1>

      {/* products */}
      <div className="grid md:grid-cols-4 gap-8 mt-16">

        {products.map((item: any) => (

          <div key={item.id}>
<Card
  className="
    group

    bg-white
    dark:bg-zinc-900/50

    backdrop-blur-2xl

    border
    border-gray-200
    dark:border-zinc-800

    p-5
    relative
    overflow-hidden

    h-[250px]
    md:h-[350px]

    rounded-3xl

    transition-all
    duration-500

    hover:-translate-y-2
    hover:scale-[1.02]

    shadow-[0_8px_30px_rgb(0,0,0,0.06)]
    dark:shadow-[0_8px_40px_rgba(0,0,0,0.45)]

    hover:shadow-[0_20px_60px_rgb(0,0,0,0.12)]
    dark:hover:shadow-[0_20px_80px_rgba(0,0,0,0.7)]
  "
>

  {/* glow effect */}

  <div
    className="
      absolute
      inset-0

      opacity-0
      group-hover:opacity-100

      transition
      duration-500

      bg-gradient-to-br
      from-red-500/5
      via-transparent
      to-transparent

      dark:from-red-500/10
    "
  />

  {/* icons */}

  <div
    className="
      absolute
      top-4
      right-4
      flex
      flex-col
      gap-4
      z-20
    "
  >

    <button
      className="
        bg-white/90
        dark:bg-black/40

        backdrop-blur-xl

        border
        border-gray-200
        dark:border-zinc-700

        rounded-full
        p-3

        shadow-lg
        dark:shadow-black/30

        transition-all
        duration-300

        hover:scale-110
        hover:rotate-6

        dark:hover:bg-zinc-800/70
      "
    >
      <Heart size={20} />
    </button>

    <button
      className="
        bg-white/90
        dark:bg-black/40

        backdrop-blur-xl

        border
        border-gray-200
        dark:border-zinc-700

        rounded-full
        p-3

        shadow-lg
        dark:shadow-black/30

        transition-all
        duration-300

        hover:scale-110
        hover:rotate-6

        dark:hover:bg-zinc-800/70
      "
    >
      <Eye size={20} />
    </button>

  </div>

  {/* image */}

  <div
    className="
      h-full
      flex
      items-center
      justify-center
      relative
      z-10
    "
  >

    <img
      src={item.image}
      className="
        w-[140px]
        md:w-[250px]

        h-[140px]
        md:h-[250px]

        object-contain

        transition-all
        duration-500

        group-hover:scale-110
        group-hover:rotate-2

        drop-shadow-[0_10px_25px_rgba(0,0,0,0.15)]
        dark:drop-shadow-[0_15px_35px_rgba(0,0,0,0.5)]
      "
      alt={item.productName}
    />

  </div>

</Card>  <div className="mt-4">

              <h2 className="font-semibold text-xl">
                {item.productName}
              </h2>

              {/* price */}
              <div className="flex items-center gap-3 mt-2">

                <span className="text-red-500 text-xl">
                  ${item.price}
                </span>

                <Rating value={4.5} />

                <span className="text-gray-500">
                  (120)
                </span>

              </div>

              {/* colors */}
              {item.colors && (
                <div className="flex gap-3 mt-4">

                  {item.colors.map(
                    (color: string, i: number) => (
                      <div
                        key={i}
                        className="
                          w-6
                          h-6
                          rounded-full
                          border-2
                        "
                        style={{
                          backgroundColor: color,
                        }}
                      />
                    )
                  )}

                </div>
              )}

            </div>

          </div>

        ))}

      </div>

      {/* button */}
      <div className="flex justify-center mt-16">

        <Link to="/category"
          className="
            bg-red-500
            text-white
            px-16
            py-5
            rounded-md
            text-xl

            transition
            duration-300
            hover:bg-black
          "
        >
          View All Products
        </Link>

      </div>

    </div>
  );
}