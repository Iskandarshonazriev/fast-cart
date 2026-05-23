import sony from "../components/productApi/productimgskidki/Frame 611.png";
import klaviatura from "../components/productApi/productimgskidki/Frame 612.png";
import TV from "../components/productApi/productimgskidki/Frame 613.png";
import stol from "../components/productApi/productimgskidki/Frame 614.png";


export const products = [
  {
    id: 1,
    title: "HAVIT HV-G92 Gamepad",
    price: "$120",
    oldPrice: "$160",
    discount: "-40%",
    rating: 5,
    reviews: 88,
    image: sony,
    description: "Gaming controller",
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
    description: "RGB keyboard",
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
    description: "Gaming monitor",
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
    description: "Comfort chair",
  },
];