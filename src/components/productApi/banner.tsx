import Autoplay from "embla-carousel-autoplay";
import iphone from "../../img/hero_endframe__cvklg0xk3w6e_large 2 (1).png";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

import { ArrowRight } from "lucide-react";

const banners = [
  {
    id: 1,
    title: "Up to 10% off Voucher",
    subtitle: "iPhone 14 Series",
    image: iphone,
  },
  {
    id: 2,
    title: "iPhone 16 Pro Max",
    subtitle: "Apple New",
    image: iphone,
  },
];

export default function Banner() {
  return (
    <>
      {/* MOBILE */}
      <div className="lg:hidden mt-8">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2500,
            }),
          ]}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {banners.map((item) => (
              <CarouselItem key={item.id}>
                <div className="bg-black text-white">

                  <div className="px-8 pt-8">

                    <div className="flex items-center gap-4">
                      <p>{item.subtitle}</p>
                    </div>

                    <h1 className="text-5xl font-bold mt-8">
                      {item.title}
                    </h1>

                    <button className="flex items-center gap-2 mt-8 border-b">
                      Shop Now
                      <ArrowRight/>
                    </button>

                  </div>

                  <img
                    src={item.image}
                    className="w-full mt-10"
                  />

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>

      {/* ПК */}
      <div className="hidden lg:block">
        <Carousel
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
          opts={{ loop: true }}
        >
          <CarouselContent>
            {banners.map((item) => (
              <CarouselItem key={item.id}>
                <div className="bg-black h-[400px] text-white flex items-center justify-between px-10">

                  <h1 className="text-6xl font-bold">
                    {item.title}
                  </h1>

                  <img
                    src={item.image}
                    className="w-[500px]"
                  />

                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </>
  );
}