import { Card } from "@/components/ui/card";
import {
  Smartphone,
  Monitor,
  Watch,
  Camera,
  Headphones,
  Gamepad2,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

const categories = [
  {
    id: 1,
    title: "Phones",
    icon: Smartphone,
  },
  {
    id: 2,
    title: "Computers",
    icon: Monitor,
  },
  {
    id: 3,
    title: "SmartWatch",
    icon: Watch,
  },
  {
    id: 4,
    title: "Camera",
    icon: Camera,
    active: true,
  },
  {
    id: 5,
    title: "HeadPhones",
    icon: Headphones,
  },
  {
    id: 6,
    title: "Gaming",
    icon: Gamepad2,
  },
];

export default function BrowseCategory() {
  return (
   <div className="max-w-[1400px] mx-auto py-14 px-4">

  {/* TOP */}
  <div className="flex items-center gap-3 md:gap-4">

    <div className="w-5 h-10 md:w-8 md:h-16 bg-red-500 rounded-md"></div>

    <p className="text-red-500 text-lg md:text-2xl font-semibold">
      Categories
    </p>

  </div>

  {/* TITLE + ARROWS */}
  <div className="flex flex-col md:flex-row md:justify-between md:items-center mt-8 gap-6">

    <h1 className="text-3xl md:text-6xl font-bold">
      Browse By Category
    </h1>

    <div className="flex gap-4">

      <button className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
        <ArrowLeft size={24} className="md:w-[35px] md:h-[35px]" />
      </button>

      <button className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 transition">
        <ArrowRight size={24} className="md:w-[35px] md:h-[35px]" />
      </button>

    </div>
  </div>

  {/* CARDS */}
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-8 mt-10 md:mt-16">

    {categories.map((item) => {
      const Icon = item.icon;

      return (
        <Card
          key={item.id}
          className={`
            h-[150px]
            md:h-[220px]
            flex
            flex-col
            items-center
            justify-center
            border
            cursor-pointer
            transition-all
            duration-300
            hover:bg-red-500
            hover:text-white
            hover:scale-105
            ${
              item.active
                ? "bg-red-500 text-white border-red-500"
                : "bg-white"
            }
          `}
        >
          <Icon
            size={35}
            strokeWidth={1.5}
            className="md:w-[60px] md:h-[60px]"
          />

          <p className="text-lg md:text-3xl mt-4 md:mt-8 text-center">
            {item.title}
          </p>
        </Card>
      );
    })}
  </div>

</div>
  );
}