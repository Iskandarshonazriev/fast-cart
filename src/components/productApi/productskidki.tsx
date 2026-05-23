import { Card } from "@/components/ui/card";
import { Heart, Eye, Star } from "lucide-react";
import { Link } from "react-router-dom";

import sony from "./productimgskidki/Frame 611.png";
import klaviatura from "./productimgskidki/Frame 612.png";
import TV from "./productimgskidki/Frame 613.png";
import stol from "./productimgskidki/Frame 614.png";

const products = [
  {
    id: 1,
    title: "HAVIT HV-G92 Gamepad",
    price: "$120",
    oldPrice: "$160",
    discount: "-40%",
    rating: 5,
    reviews: 88,
    image: sony,
  },
  {
    id: 2,
    title: "AK-900 Wired Keyboard",
    price: "$960",
    oldPrice: "$1160",
    discount: "-35%",
    rating: 4,
    reviews: 75,
    image: klaviatura,
  },
  {
    id: 3,
    title: "IPS LCD Gaming Monitor",
    price: "$370",
    oldPrice: "$400",
    discount: "-30%",
    rating: 5,
    reviews: 99,
    image: TV,
  },
  {
    id: 4,
    title: "S-Series Comfort Chair",
    price: "$375",
    oldPrice: "$400",
    discount: "-25%",
    rating: 4,
    reviews: 99,
    image: stol,
  },
];


export default function Products({ addToCart }: any) {
  return (
    <div className="max-w-[1400px] mx-auto py-10 px-4">

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">

        {products.map((item) => (
          <div key={item.id}>

            <Card
              className="
                group
                bg-[#f5f5f5]
                border-none
                p-3 md:p-5
                relative
                overflow-hidden
                rounded-md
              "
            >

              {/* discount */}
              <div
                className="
                  absolute
                  top-3
                  left-3
                  md:top-4
                  md:left-4
                  bg-red-500
                  text-white
                  px-3
                  py-1
                  rounded
                  text-sm
                  z-20
                "
              >
                {item.discount}
              </div>

              {/* icons */}
              <div
                className="
                  absolute
                  right-3
                  top-3
                  md:right-4
                  md:top-4
                  flex
                  flex-col
                  gap-3
                  z-30
                "
              >

                <button
                  className="
                    bg-white
                    p-2 md:p-3
                    rounded-full
                    shadow
                  "
                >
                  <Heart size={20} />
                </button>

                <Link
                  to={`/details/${item.id}`}
                  className="
                    bg-white
                    p-2 md:p-3
                    rounded-full
                    shadow
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Eye size={20} />
                </Link>

              </div>

              {/* image */}
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
                    transition
                    duration-300
                    group-hover:scale-105
                  "
                />

              </div>

              {/* add to cart */}
              <button
                onClick={() => addToCart(item)}
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

                  z-10
                "
              >
                Add To Cart
              </button>

            </Card>

            {/* text */}
            <div className="mt-4">

              <h2
                className="
                  font-semibold
                  text-[16px]
                  md:text-[24px]
                  leading-6
                "
              >
                {item.title}
              </h2>

              {/* prices */}
              <div className="flex gap-3 mt-2">

                <span
                  className="
                    text-red-500
                    text-lg
                    md:text-2xl
                    font-semibold
                  "
                >
                  {item.price}
                </span>

                <span
                  className="
                    text-gray-400
                    text-lg
                    md:text-2xl
                    line-through
                  "
                >
                  {item.oldPrice}
                </span>

              </div>

              {/* stars */}
              <div className="flex items-center gap-2 mt-2">

                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={
                      i < item.rating
                        ? "orange"
                        : "lightgray"
                    }
                  />
                ))}

                <span
                  className="
                    text-gray-500
                    text-sm
                    md:text-xl
                  "
                >
                  ({item.reviews})
                </span>

              </div>

            </div>

          </div>
        ))}

      </div>

      {/* button */}
      <div className="flex justify-center mt-12 md:mt-16">

        <Link
          to="/category"
          className="
            bg-red-500
            text-white
            px-8 md:px-16
            py-4 md:py-5
            rounded
            text-lg md:text-2xl
            inline-block
          "
        >
          View All Products
        </Link>

      </div>

      <hr className="mt-[70px] md:mt-[100px]" />

    </div>
  );
}