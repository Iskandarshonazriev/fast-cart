import { Card } from "@/components/ui/card";
import sambufer from "../productApi/productimgskidki/Frame 694.png"
import soya from "../productApi/productimgskidki/Ellipse 23.png"
export default function MusicBanner() {
  return (
    <div className="max-w-[1400px] mx-auto py-16">
      <Card className="bg-black border-none rounded-none overflow-hidden px-14 py-10">

        <div className="grid md:grid-cols-2 items-center">

          {/* LEFT */}
          <div className="text-white">

            <p className="text-green-400 text-xl font-semibold mb-8">
              Categories
            </p>

            <h1 className="text-[72px] font-bold leading-[1.1] mb-10">
              Enhance Your
              <br />
              Music Experience
            </h1>

            {/* TIMER */}
            <div className="flex gap-5 mb-14">

              <div className="w-20 h-20 rounded-full bg-white text-black flex flex-col items-center justify-center">
                <span className="font-bold text-xl">23</span>
                <span className="text-sm">Hours</span>
              </div>

              <div className="w-20 h-20 rounded-full bg-white text-black flex flex-col items-center justify-center">
                <span className="font-bold text-xl">05</span>
                <span className="text-sm">Days</span>
              </div>

              <div className="w-20 h-20 rounded-full bg-white text-black flex flex-col items-center justify-center">
                <span className="font-bold text-xl">59</span>
                <span className="text-sm">Minutes</span>
              </div>

              <div className="w-20 h-20 rounded-full bg-white text-black flex flex-col items-center justify-center">
                <span className="font-bold text-xl">35</span>
                <span className="text-sm">Seconds</span>
              </div>

            </div>

            <button className="bg-green-500 hover:bg-green-600 px-14 py-5 rounded-md text-black text-2xl font-semibold transition">
              Buy Now!
            </button>

          </div>

          {/* RIGHT */}
          <div className="relative flex justify-center">

            {/* glow */}
            <div className="absolute w-[500px] h-[500px] bg-gray-500 blur-[150px] opacity-30 rounded-full"></div>

            <img
              src={sambufer}
              alt=""
              className="relative w-[700px] object-contain z-1"
            />
              <img 
              src={soya}
              alt=""
              className="absolute w-[700px] object-contain z-0"
            />

          </div>

        </div>

      </Card>
    </div>
  );
}