import { Card } from "@/components/ui/card";

import {
  Truck,
  Headphones,
  ShieldCheck,
} from "lucide-react";

import ps5 from "./productimgskidki/ps5-slim-goedkope-playstation_large 1.png";
import woman from "./productimgskidki/attractive-woman-wearing-hat-posing-black-background 1.png";
import sam from "./productimgskidki/Frame 707.png";
import duxi from "./productimgskidki/Frame 706.png";

export default function NewArrival() {
  return (
    <div className="max-w-[1400px] mx-auto py-16 px-4">

      {/* TOP */}
      <div className="flex items-center gap-4">

        <div className="w-5 h-12 bg-red-500 rounded"></div>

        <p className="text-red-500 font-semibold text-lg md:text-xl">
          Featured
        </p>

      </div>

      <h1 className="text-3xl md:text-5xl font-bold mt-8 mb-12">
        New Arrival
      </h1>

      {/* GRID */}
      <div className="grid lg:grid-cols-2 gap-8">

        {/* LEFT BIG */}
        <Card
          className="
            group
            bg-black
            border-none
            relative
            overflow-hidden
            h-[500px]
            md:h-[620px]
          "
        >

          {/* image */}
          <img
            src={ps5}
            className="
              absolute
              inset-0
              w-full
              h-full
              object-contain
              transition
              duration-500
              group-hover:scale-110
            "
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-black/20"></div>

          {/* content */}
          <div
            className="
              absolute
              bottom-6
              left-6
              md:left-8
              text-white
              transition-all
              duration-500
              group-hover:bottom-12
            "
          >

            <h2 className="text-3xl md:text-4xl font-bold">
              PlayStation 5
            </h2>

            <p className="text-gray-300 mt-4 max-w-[300px] text-sm md:text-base">
              Black and White version of the PS5 coming out on sale.
            </p>

            <button
              className="
                mt-5
                border-b
                text-lg
                hover:text-red-400
                transition
              "
            >
              Shop Now
            </button>

          </div>

        </Card>

        {/* RIGHT */}
        <div className="flex flex-col gap-8">

          {/* WOMEN */}
          <Card
            className="
              group
              bg-black
              border-none
              h-[300px]
              relative
              overflow-hidden
            "
          >

            <img
              src={woman}
              className="
                absolute
                right-0
                h-full
                object-cover
                transition
                duration-500
                group-hover:scale-110
              "
            />

            <div className="absolute inset-0 bg-black/30"></div>

            <div
              className="
                absolute
                bottom-5
                left-6
                md:left-8
                text-white
                transition-all
                duration-500
                group-hover:bottom-10
              "
            >

              <h2 className="text-2xl md:text-3xl font-bold">
                Women's Collections
              </h2>

              <p className="text-gray-300 mt-2 text-sm md:text-base">
                Featured woman collections that give you another vibe.
              </p>

              <button
                className="
                  border-b
                  mt-4
                  hover:text-red-400
                  transition
                "
              >
                Shop Now
              </button>

            </div>

          </Card>

          {/* BOTTOM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {/* SPEAKERS */}
            <Card
              className="
                group
                bg-black
                h-[260px]
                md:h-[300px]
                relative
                overflow-hidden
              "
            >

              <img
                src={sam}
                className="
                  absolute
                  right-0
                  bottom-0
                  w-[200px]
                  md:w-[240px]
                  transition
                  duration-500
                  group-hover:scale-110
                "
              />

              <div className="absolute inset-0 bg-black/20"></div>

              <div
                className="
                  absolute
                  bottom-5
                  left-6
                  text-white
                  transition-all
                  duration-500
                  group-hover:bottom-10
                "
              >

                <h2 className="text-2xl md:text-3xl font-bold">
                  Speakers
                </h2>

                <p className="text-gray-300 text-sm md:text-base">
                  Amazon wireless speakers
                </p>

                <button
                  className="
                    border-b
                    mt-3
                    hover:text-red-400
                    transition
                  "
                >
                  Shop Now
                </button>

              </div>

            </Card>

            {/* PERFUME */}
            <Card
              className="
                group
                bg-black
                h-[260px]
                md:h-[300px]
                relative
                overflow-hidden
              "
            >

              <img
                src={duxi}
                className="
                  absolute
                  right-0
                  bottom-0
                  w-[190px]
                  md:w-[230px]
                  transition
                  duration-500
                  group-hover:scale-110
                "
              />

              <div className="absolute inset-0 bg-black/20"></div>

              <div
                className="
                  absolute
                  bottom-5
                  left-6
                  text-white
                  transition-all
                  duration-500
                  group-hover:bottom-10
                "
              >

                <h2 className="text-2xl md:text-3xl font-bold">
                  Perfume
                </h2>

                <p className="text-gray-300 text-sm md:text-base">
                  GUCCI INTENSE OUD EDP
                </p>

                <button
                  className="
                    border-b
                    mt-3
                    hover:text-red-400
                    transition
                  "
                >
                  Shop Now
                </button>

              </div>

            </Card>

          </div>

        </div>

      </div>

      {/* SERVICES */}
      <div className="grid md:grid-cols-3 gap-12 mt-20 md:mt-28">

        {/* item */}
        <div className="text-center flex flex-col items-center">

          <div
            className="
              w-20
              h-20
              rounded-full
              bg-black
              text-white
              flex
              items-center
              justify-center
              transition
              duration-300
              hover:scale-110
            "
          >
            <Truck size={35} />
          </div>

          <h2 className="font-bold text-xl md:text-2xl mt-6">
            FREE AND FAST DELIVERY
          </h2>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Free delivery for all orders over $140
          </p>

        </div>

        {/* item */}
        <div className="text-center flex flex-col items-center">

          <div
            className="
              w-20
              h-20
              rounded-full
              bg-black
              text-white
              flex
              items-center
              justify-center
              transition
              duration-300
              hover:scale-110
            "
          >
            <Headphones size={35} />
          </div>

          <h2 className="font-bold text-xl md:text-2xl mt-6">
            24/7 CUSTOMER SERVICE
          </h2>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            Friendly 24/7 customer support
          </p>

        </div>

        {/* item */}
        <div className="text-center flex flex-col items-center">

          <div
            className="
              w-20
              h-20
              rounded-full
              bg-black
              text-white
              flex
              items-center
              justify-center
              transition
              duration-300
              hover:scale-110
            "
          >
            <ShieldCheck size={35} />
          </div>

          <h2 className="font-bold text-xl md:text-2xl mt-6">
            MONEY BACK GUARANTEE
          </h2>

          <p className="text-gray-500 mt-2 text-sm md:text-base">
            We return money within 30 days
          </p>

        </div>

      </div>

    </div>
  );
}