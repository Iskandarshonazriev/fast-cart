import { Card } from "@/components/ui/card";
import { Heart, Eye, Star, StarHalf } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const url =
  "https://fastcard-1-o23z.onrender.com/api/Product/get-products";

function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => {

        if (star <= Math.floor(value)) {
          return (
            <Star
              key={star}
              size={20}
              className="fill-yellow-400 text-yellow-400"
            />
          );
        }

        if (star - value <= 0.5 && star > value) {
          return (
            <StarHalf
              key={star}
              size={20}
              className="fill-yellow-400 text-yellow-400"
            />
          );
        }

        return (
          <Star
            key={star}
            size={20}
            className="text-gray-300"
          />
        );
      })}
    </div>
  );
}

export default function BestSelling() {

  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

async function getProducts() {
  try {
    const { data } = await axios.get(url);

    // ВСЕ ПРОДУКТЫ
    const allProducts = data?.data?.products || [];

    // ТОЛЬКО СО СКИДКОЙ
    const discountProducts = allProducts.filter(
      (item: any) => item.hasDiscount === true
    );

    setProducts(discountProducts);

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


  if (loading) {
    return (
      <div className="text-center text-4xl py-20 font-bold">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto py-16 px-4">

      {/* top */}
      <div className="flex items-center gap-4">

        <div className="w-5 h-12 bg-red-500 rounded-md"></div>

        <p className="text-red-500 font-semibold text-2xl">
          This Month
        </p>

      </div>

      <div className="flex justify-between items-center mt-8">

        <h1 className="text-3xl md:text-6xl font-bold">
          Best Selling Products
        </h1>

        <Link className="bg-red-500 text-white px-8 md:px-14 py-3 md:py-5 rounded-md text-lg md:text-2xl" to="/category" >
          View All
        </Link>

      </div>

      {/* cards */}
      {products.length === 0 ? (

        <div className="text-center text-3xl font-bold py-20">
          No Products
        </div>

      ) : (

        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10 mt-14">

          {products.map((item: any) => (

            <div key={item.id}>
<Card
  className="
    group

    bg-[#f5f5f5]
    dark:bg-zinc-900/40

    backdrop-blur-md

    dark:border
    dark:border-zinc-700

    border-none
    p-5
    relative
    overflow-hidden

    h-[250px]
    md:h-[350px]

    duration-300
  "
>

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
        bg-white
        dark:bg-black/40

        backdrop-blur-md

        dark:border
        dark:border-zinc-700

        rounded-full
        p-2
        md:p-3

        transition
        duration-300

        hover:scale-110
        dark:hover:bg-zinc-800/60
      "
    >
      <Heart size={20} />
    </button>

    <button
      className="
        bg-white
        dark:bg-black/40

        backdrop-blur-md

        dark:border
        dark:border-zinc-700

        rounded-full
        p-2
        md:p-3

        transition
        duration-300

        hover:scale-110
        dark:hover:bg-zinc-800/60
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

        transition
        duration-300

        group-hover:scale-105
      "
      alt={item.productName}
    />

  </div>

</Card>

              {/* content */}
              <div className="mt-5">

                <h2 className="text-lg md:text-2xl font-semibold">

                  {item.productName || item.name}

                </h2>

                {/* prices */}
                <div className="flex gap-4 mt-3">

                  <span className="text-red-500 text-xl md:text-2xl font-semibold">

                    ${item.price}

                  </span>

                  <span className="text-gray-400 text-xl md:text-2xl line-through">

                    ${item.price + 100}

                  </span>

                </div>

                {/* rating */}
                <div className="flex items-center gap-3 mt-4">

                  <Rating value={4.5} />

                  <span className="text-gray-500 text-lg md:text-xl">
                    (65)
                  </span>

                </div>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}