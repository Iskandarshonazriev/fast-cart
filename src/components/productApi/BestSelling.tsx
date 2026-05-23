import { Card } from "@/components/ui/card";
import { Heart, Eye, Star, StarHalf } from "lucide-react";
import kurtka from "./productimgskidki/Frame 605 (1).png"
import sumka from "./productimgskidki/Frame 606.png"
import sambufer from "./productimgskidki/Frame 610.png"
import tabl from "./productimgskidki/Frame 612 (1).png"
const products = [
  {
    id: 1,
    title: "The north coat",
    price: 260,
    oldPrice: 360,
    rating: 5,
    reviews: 65,
    image:kurtka
  },
  {
    id: 2,
    title: "Gucci duffle bag",
    price: 960,
    oldPrice: 1160,
    rating: 4.5,
    reviews: 65,
    image:sumka
  },
  {
    id: 3,
    title: "RGB liquid CPU Cooler",
    price: 160,
    oldPrice: 170,
    rating: 4.5,
    reviews: 65,
    image:sambufer
  },
  {
    id: 4,
    title: "Small BookSelf",
    price: 360,
    oldPrice: null,
    rating: 5,
    reviews: 65,
    image:tabl
  },
];

function Rating({ value }: { value: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1,2,3,4,5].map((star) => {
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
  return (
    <div className="max-w-[1400px] mx-auto py-16">

      {/* top */}
      <div className="flex items-center gap-4">
        <div className="w-5 h-12 bg-red-500 rounded-md"></div>

        <p className="text-red-500 font-semibold text-2xl">
          This Month
        </p>
      </div>

      <div className="flex justify-between items-center mt-8">

        <h1 className="text-6xl font-bold">
          Best Selling Products
        </h1>

        <button className="bg-red-500 text-white px-14 py-5 rounded-md text-2xl">
          View All
        </button>

      </div>

      {/* cards */}
      <div className="grid md:grid-cols-4 gap-10 mt-14">

        {products.map((item) => (
          <div key={item.id}>

            <Card className="group bg-[#f5f5f5] border-none p-5 relative overflow-hidden h-[350px]">

              {/* icons */}
              <div className="absolute top-4 right-4 flex flex-col gap-4">

                <button className="bg-white rounded-full p-3">
                  <Heart />
                </button>

                <button className="bg-white rounded-full p-3">
                  <Eye />
                </button>

              </div>

              <div className="h-full flex items-center justify-center">
                <img
                  src={item.image}
                  className="w-[250px] h-[250px] object-contain transition group-hover:scale-105"
                  alt=""
                />
              </div>

            </Card>

            <div className="mt-5">

              <h2 className="text-2xl font-semibold">
                {item.title}
              </h2>

              <div className="flex gap-4 mt-3">
                <span className="text-red-500 text-2xl font-semibold">
                  ${item.price}
                </span>

                {item.oldPrice && (
                  <span className="text-gray-400 text-2xl line-through">
                    ${item.oldPrice}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 mt-4">

                <Rating value={item.rating} />

                <span className="text-gray-500 text-xl">
                  ({item.reviews})
                </span>

              </div>

            </div>

          </div>
        ))}
      </div>
    </div>
  );
}