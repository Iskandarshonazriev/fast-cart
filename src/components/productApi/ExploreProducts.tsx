import { Card } from "@/components/ui/card";
import { Heart, Eye, Star, StarHalf } from "lucide-react";

const products = [
  {
    id: 1,
    title: "Breed Dry Dog Food",
    price: 100,
    image: "https://pngimg.com/d/dog_food_PNG34.png",
    rating: 3,
    reviews: 35,
  },
  {
    id: 2,
    title: "CANON EOS DSLR Camera",
    price: 360,
    image: "https://pngimg.com/d/camera_PNG102.png",
    rating: 4,
    reviews: 95,
    cart: true,
  },
  {
    id: 3,
    title: "ASUS FHD Gaming Laptop",
    price: 700,
    image: "https://pngimg.com/d/laptop_PNG101816.png",
    rating: 5,
    reviews: 325,
  },
  {
    id: 4,
    title: "Curology Product Set",
    price: 500,
    image: "https://pngimg.com/d/cosmetics_PNG44.png",
    rating: 4,
    reviews: 145,
  },
  {
    id: 5,
    title: "Kids Electric Car",
    price: 960,
    image: "https://pngimg.com/d/car_PNG1567.png",
    rating: 5,
    reviews: 65,
    isNew: true,
    colors: ["red", "tomato"],
  },
  {
    id: 6,
    title: "Jr. Zoom Soccer Cleats",
    price: 1160,
    image: "https://pngimg.com/d/shoes_PNG7475.png",
    rating: 5,
    reviews: 35,
    colors: ["yellow", "red"],
  },
  {
    id: 7,
    title: "GP11 Shooter USB Gamepad",
    price: 660,
    image: "https://pngimg.com/d/gamepad_PNG95.png",
    rating: 4.5,
    reviews: 55,
    isNew: true,
    colors: ["black", "tomato"],
  },
  {
    id: 8,
    title: "Quilted Satin Jacket",
    price: 660,
    image: "https://pngimg.com/d/jacket_PNG8056.png",
    rating: 4.5,
    reviews: 55,
    colors: ["teal", "tomato"],
  },
];

function Rating({ value }: { value: number }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map((star) => {
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
  return (
    <div className="max-w-[1400px] mx-auto py-16">

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

        {products.map((item) => (
          <div key={item.id}>

            <Card className="group bg-[#f5f5f5] relative overflow-hidden border-none p-5">

              {item.isNew && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded">
                  NEW
                </div>
              )}

              {/* icons */}
              <div className="absolute right-4 top-4 flex flex-col gap-3">
                <button className="bg-white rounded-full p-2">
                  <Heart size={20}/>
                </button>

                <button className="bg-white rounded-full p-2">
                  <Eye size={20}/>
                </button>
              </div>

              {/* image */}
              <div className="h-[240px] flex items-center justify-center">
                <img
                  src={item.image}
                  alt=""
                  className="w-[220px] h-[180px] object-contain transition duration-300 group-hover:scale-105"
                />
              </div>

              {/* add to cart */}
              <button
                className="
                absolute bottom-[-60px]
                left-0
                w-full
                bg-black
                text-white
                py-3
                transition-all
                duration-300
                group-hover:bottom-0
                "
              >
                Add To Cart
              </button>

            </Card>

            <div className="mt-4">

              <h2 className="font-semibold text-xl">
                {item.title}
              </h2>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-red-500 text-xl">
                  ${item.price}
                </span>

                <Rating value={item.rating}/>

                <span className="text-gray-500">
                  ({item.reviews})
                </span>
              </div>

              {item.colors && (
                <div className="flex gap-3 mt-4">
                  {item.colors.map((color, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full border-2"
                      style={{
                        backgroundColor: color,
                      }}
                    />
                  ))}
                </div>
              )}

            </div>

          </div>
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <button className="bg-red-500 text-white px-16 py-5 rounded-md text-xl">
          View All Products
        </button>
      </div>

    </div>
  );
}