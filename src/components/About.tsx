import {
  Store,
  DollarSign,
  ShoppingBag,
  Wallet,
  Truck,
  Headphones,
  ShieldCheck,
 
} from "lucide-react";

import people from "../img/Side Image.png";
import man1 from "../img/Side Image.png";
import woman from "../img/Frame 875.png";
import man2 from "../img/Frame 874.png";

export default function About() {
  const stats = [
    { icon: <Store />, num: "10.5k", text: "Sallers active our site" },
    { icon: <DollarSign />, num: "33k", text: "Monthly Product Sale", active:true },
    { icon: <ShoppingBag />, num: "45.5k", text: "Customer active in our site" },
    { icon: <Wallet />, num: "25k", text: "Annual gross sale in our site" },
  ];

  const team = [
    {
      name:"Tom Cruise",
      role:"Founder & Chairman",
      img:man1
    },
    {
      name:"Emma Watson",
      role:"Managing Director",
      img:woman
    },
    {
      name:"Will Smith",
      role:"Product Designer",
      img:man2
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-5">

      {/* breadcrumb */}
      <div className="text-gray-400 text-sm flex gap-2 mt-8">
        <p>Home</p>
        <span>/</span>
        <p className="text-black">About</p>
      </div>


      {/* story */}
      <div className="grid lg:grid-cols-2 gap-12 items-center mt-14">

        <div>

          <h1 className="text-[34px] lg:text-[54px] font-bold">
            Our Story
          </h1>

          <p className="mt-8 leading-8 text-[14px] lg:text-[18px]">
            Launched in 2015, Exclusive is South Asia’s
            premier online shopping marketplace with
            an active presence in Bangladesh.
          </p>

          <p className="mt-8 leading-8 text-[14px] lg:text-[18px]">
            Exclusive has more than 1 Million products
            to offer, growing at a very fast pace.
          </p>

        </div>


        <img
          src={people}
          className="w-full"
        />

      </div>



      {/* stats */}

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mt-20">

        {stats.map((item,index)=>(

          <div
          key={index}
          className={`
          border
          h-[230px]
          flex
          flex-col
          justify-center
          items-center
          ${item.active ? "bg-[#DB4444] text-white":"bg-white"}
          `}
          >

            <div className="w-[80px] h-[80px] rounded-full bg-black text-white flex justify-center items-center">
              {item.icon}
            </div>

            <h2 className="text-[38px] font-bold mt-6">
              {item.num}
            </h2>

            <p className="mt-2">
              {item.text}
            </p>

          </div>

        ))}

      </div>




      {/* team */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-24">

        {team.map((item,index)=>(

          <div key={index}>

            <div className="bg-[#F5F5F5]">

              <img
              src={item.img}
              className="w-full h-[450px] object-contain"
              />

            </div>

            <h1 className="text-[36px] mt-5 font-semibold">
              {item.name}
            </h1>

            <p>{item.role}</p>


            <div className="flex gap-4 mt-4">

            

            </div>

          </div>

        ))}

      </div>



      {/* dots */}

      <div className="flex justify-center gap-3 mt-8">

        <div className="w-3 h-3 rounded-full bg-gray-300"/>
        <div className="w-3 h-3 rounded-full bg-gray-300"/>
        <div className="w-4 h-4 rounded-full bg-red-500 border"/>
        <div className="w-3 h-3 rounded-full bg-gray-300"/>
        <div className="w-3 h-3 rounded-full bg-gray-300"/>

      </div>




      {/* services */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-24 mb-20 text-center">

        <div>

          <div className="w-[80px] h-[80px] bg-black text-white rounded-full m-auto flex items-center justify-center">
            <Truck/>
          </div>

          <h2 className="font-bold text-[24px] mt-5">
            FREE AND FAST DELIVERY
          </h2>

          <p className="mt-2">
            Free delivery for all orders over $140
          </p>

        </div>


        <div>

          <div className="w-[80px] h-[80px] bg-black text-white rounded-full m-auto flex items-center justify-center">
            <Headphones/>
          </div>

          <h2 className="font-bold text-[24px] mt-5">
            24/7 CUSTOMER SERVICE
          </h2>

          <p className="mt-2">
            Friendly 24/7 customer support
          </p>

        </div>


        <div>

          <div className="w-[80px] h-[80px] bg-black text-white rounded-full m-auto flex items-center justify-center">
            <ShieldCheck/>
          </div>

          <h2 className="font-bold text-[24px] mt-5">
            MONEY BACK GUARANTEE
          </h2>

          <p className="mt-2">
            We return money within 30 days
          </p>

        </div>

      </div>

    </div>
  );
}