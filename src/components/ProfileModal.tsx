import {
  User,
  ShoppingBag,
  LogOut,
} from "lucide-react";

import { useState } from "react";

export default function ProfileModal() {

  const [openProfile, setOpenProfile] =
    useState(false);

  return (
    <div className="relative">

      {/* profile button */}
      <button
        onClick={() =>
          setOpenProfile(!openProfile)
        }
        className="
          w-[50px]
          h-[50px]
          rounded-full
          bg-[#DB4444]
          flex
          items-center
          justify-center
          text-white
        "
      >
        <User size={28} />
      </button>

      {/* modal */}
      {openProfile && (

        <div
          className="
            absolute
            top-[70px]
            right-0
            w-[280px]
            rounded-2xl
            overflow-hidden
            backdrop-blur-xl
            bg-black/70
            text-white
            p-6
            z-50
            shadow-2xl
          "
        >

          {/* account */}
          <button
            className="
              flex
              items-center
              gap-5
              w-full
              text-left
              py-4
              hover:opacity-70
              transition
            "
          >

            <User size={40} />

            <span className="text-[24px]">
              Account
            </span>

          </button>

          {/* orders */}
          <button
            className="
              flex
              items-center
              gap-5
              w-full
              text-left
              py-4
              hover:opacity-70
              transition
            "
          >

            <ShoppingBag size={40} />

            <span className="text-[24px]">
              My Order
            </span>

          </button>

          {/* logout */}
          <button
            className="
              flex
              items-center
              gap-5
              w-full
              text-left
              py-4
              hover:opacity-70
              transition
            "
          >

            <LogOut size={40} />

            <span className="text-[24px]">
              Logout
            </span>

          </button>

        </div>

      )}

    </div>
  );
}