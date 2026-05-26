import {
  Send,

} from "lucide-react";

import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-[136px]">
      <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-10 py-10 md:py-16">
        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-10 md:gap-12
        ">
          
          {/* Exclusive */}
          <div className="text-center sm:text-left">
            <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8">
              Exclusive
            </h2>

            <h3 className="text-xl md:text-2xl mb-4 md:mb-6">
              Subscribe
            </h3>

            <p className="mb-6 text-gray-300 text-sm md:text-base">
              Get 10% off your first order
            </p>

            <div className="relative max-w-[350px] mx-auto sm:mx-0">
              <Input
                placeholder="Enter your email"
                className="
                bg-transparent
                border-white
                h-12 md:h-14
                pr-14
                text-white
                placeholder:text-gray-500
              "
              />

              <Send
                size={20}
                className="
                  absolute
                  right-4
                  top-1/2
                  -translate-y-1/2
                  cursor-pointer
                "
              />
            </div>
          </div>

          {/* Support */}
          <div className="text-center sm:text-left">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">
              Support
            </h2>

            <div className="space-y-3 md:space-y-4 text-gray-300 text-sm md:text-base">
              <p>
                111 Bijoy sarani, Dhaka,
                Bangladesh
              </p>

              <p>exclusive@gmail.com</p>

              <p>+88015-88888-9999</p>
            </div>
          </div>

          {/* Account */}
          <div className="text-center sm:text-left">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">
              Account
            </h2>

            <div className="space-y-3 md:space-y-4 text-gray-300 text-sm md:text-base">
              <p className="cursor-pointer hover:text-white">
                My Account
              </p>

              <p className="cursor-pointer hover:text-white">
                Cart
              </p>

              <p className="cursor-pointer hover:text-white">
                Wishlist
              </p>

              <p className="cursor-pointer hover:text-white">
                Shop
              </p>
            </div>
          </div>

          {/* Quick Link */}
          <div className="text-center sm:text-left">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">
              Quick Link
            </h2>

            <div className="space-y-3 md:space-y-4 text-gray-300 text-sm md:text-base">
              <p className="cursor-pointer hover:text-white">
                Privacy Policy
              </p>

              <p className="cursor-pointer hover:text-white">
                Terms Of Use
              </p>

              <p className="cursor-pointer hover:text-white">
                FAQ
              </p>

              <p className="cursor-pointer hover:text-white">
                Contact
              </p>
            </div>
          </div>

          {/* Social */}
          <div className="text-center sm:text-left">
            <h2 className="text-xl md:text-2xl font-semibold mb-6 md:mb-8">
              Social
            </h2>

            <div className="
              flex
              justify-center
              sm:justify-start
              gap-5
            ">
            
            </div>
          </div>

        </div>
      </div>

      <div className="border-t border-gray-800 py-6 md:py-8">
        <p className="text-center text-gray-500 text-xs md:text-base px-4">
          © Copyright Rimel 2022. All rights reserved
        </p>
      </div>
    </footer>
  );
}