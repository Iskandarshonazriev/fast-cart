import { useEffect, useState } from "react";
import {
  Menu,
  ShoppingCart,
  Heart,
  X,
  Trash2,
} from "lucide-react";

import { Link } from "react-router-dom";
import ProfileModal from "../components/ProfileModal";

export default function Navbar() {
  // MOBILE MENU
  const [open, setOpen] = useState(false);

  // SEARCH
  const [search, setSearch] = useState("");

  // CART
  const [cart, setCart] = useState<any[]>([]);

  // OPEN CART
  const [openCart, setOpenCart] =
    useState(false);

  // LOAD CART
  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

      setCart(savedCart);
    };

    // first load
    loadCart();

    // listen storage
    window.addEventListener(
      "storage",
      loadCart
    );

    // custom event
    window.addEventListener(
      "cartUpdated",
      loadCart as EventListener
    );

    return () => {
      window.removeEventListener(
        "storage",
        loadCart
      );

      window.removeEventListener(
        "cartUpdated",
        loadCart as EventListener
      );
    };
  }, []);

  // REMOVE ITEM
  const removeFromCart = (
    index: number
  ) => {
    const updatedCart = cart.filter(
      (_, i) => i !== index
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // CLEAR CART
  const clearCart = () => {
    setCart([]);

    localStorage.removeItem("cart");
  };

  // TOTAL PRICE
  const totalPrice = cart.reduce(
    (acc, item) => acc + Number(item.price),
    0
  );

  return (
    <>
      {/* ================= MOBILE ================= */}

      <div className="lg:hidden border-b">
        <div
          className="
          px-6
          h-[90px]
          flex
          items-center
          justify-between
        "
        >
          {/* BURGER */}
          <button
            onClick={() => setOpen(true)}
          >
            <Menu size={35} />
          </button>

          {/* LOGO */}
          <h1
            className="
            text-[36px]
            font-bold
          "
          >
            Exclusive
          </h1>

          {/* MOBILE CART */}
          <div
            className="relative cursor-pointer"
            onClick={() =>
              setOpenCart(!openCart)
            }
          >
            <ShoppingCart size={35} />

            <div
              className="
              absolute
              -top-2
              -right-2
              w-6
              h-6
              rounded-full
              bg-[#DB4444]
              text-white
              flex
              items-center
              justify-center
              text-[13px]
            "
            >
              {cart.length}
            </div>
          </div>
        </div>
      </div>

      {/* OVERLAY */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
          fixed
          inset-0
          bg-black/50
          z-40
        "
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`
        fixed
        top-0
        left-0
        h-screen
        w-[280px]
        bg-white
        z-50
        p-8
        duration-300
        ${
          open
            ? "translate-x-0"
            : "-translate-x-full"
        }
      `}
      >
        <div className="flex justify-end">
          <button
            onClick={() => setOpen(false)}
          >
            <X size={32} />
          </button>
        </div>

        <div
          className="
          flex
          flex-col
          gap-8
          mt-10
          text-[24px]
        "
        >
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="
            border-b
            border-gray-300
            pb-3
            hover:text-gray-500
          "
          >
            Home
          </Link>

          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="hover:text-gray-500"
          >
            Contact
          </Link>

          <Link
            to="/about"
            onClick={() => setOpen(false)}
            className="hover:text-gray-500"
          >
            About
          </Link>

          <Link
            to="/register"
            onClick={() => setOpen(false)}
            className="hover:text-gray-500"
          >
            Sign up
          </Link>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}

      <div className="hidden lg:block border-b">
        <div
          className="
          max-w-[1200px]
          mx-auto
          h-[90px]
          flex
          items-center
          justify-between
          relative
        "
        >
          {/* LOGO */}
          <h1
            className="
            text-[32px]
            font-bold
          "
          >
            Exclusive
          </h1>

          {/* NAV */}
          <section
            className="
            flex
            items-center
            gap-8
          "
          >
            <Link
              className="
              border-b
              hover:text-gray-400
            "
              to="/"
            >
              Home
            </Link>

            <Link
              className="hover:text-gray-400"
              to="/contact"
            >
              Contact
            </Link>

            <Link
              className="hover:text-gray-400"
              to="/about"
            >
              About
            </Link>

            <Link
              className="hover:text-gray-400"
              to="/register"
            >
              Sign up
            </Link>
          </section>

          {/* RIGHT */}
          <section
            className="
            flex
            items-center
            gap-5
          "
          >
            {/* SEARCH */}
            <div
              className="
              flex
              items-center
              gap-3
            "
            >
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="
                border
                px-4
                py-3
                rounded-md
                outline-none
                w-[250px]
              "
              />
            </div>

            {/* HEART */}
            <button>
              <Heart />
            </button>

            {/* CART */}
            <div
              className="
              relative
              cursor-pointer
            "
              onClick={() =>
                setOpenCart(!openCart)
              }
            >
              <ShoppingCart size={30} />

              {/* COUNT */}
              <span
                className="
                absolute
                -top-2
                -right-2
                bg-red-500
                text-white
                text-xs
                w-5
                h-5
                rounded-full
                flex
                items-center
                justify-center
              "
              >
                {cart.length}
              </span>
            </div>

            {/* CART DROPDOWN */}
            {openCart && (
              <div
                className="
                absolute
                right-0
                top-20
                w-[380px]
                bg-white
                shadow-2xl
                rounded-2xl
                p-5
                z-50
                border
              "
              >
                {/* TITLE */}
                <div
                  className="
                  flex
                  items-center
                  justify-between
                  mb-5
                "
                >
                  <h2
                    className="
                    text-2xl
                    font-bold
                  "
                  >
                    Cart
                  </h2>

                  {cart.length > 0 && (
                    <button
                      onClick={clearCart}
                      className="
                      text-red-500
                      text-sm
                    "
                    >
                      Clear All
                    </button>
                  )}
                </div>

                {/* EMPTY */}
                {cart.length === 0 ? (
                  <div
                    className="
                    text-center
                    py-10
                    text-gray-400
                  "
                  >
                    Cart is empty 🛒
                  </div>
                ) : (
                  <>
                    {/* ITEMS */}
                    <div className="space-y-4 max-h-[350px] overflow-auto">
                      {cart.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="
                            flex
                            items-center
                            justify-between
                            gap-4
                            border-b
                            pb-4
                          "
                          >
                            <div className="flex items-center gap-4">
                              <img
                                src={item.image}
                                className="
                                w-16
                                h-16
                                object-contain
                                bg-gray-100
                                rounded
                              "
                              />

                              <div>
                                <h3
                                  className="
                                  font-semibold
                                  text-sm
                                "
                                >
                                  {item.title}
                                </h3>

                                <p
                                  className="
                                  text-red-500
                                  font-bold
                                  mt-1
                                "
                                >
                                  ${item.price}
                                </p>
                              </div>
                            </div>

                            {/* DELETE */}
                            <button
                              onClick={() =>
                                removeFromCart(
                                  index
                                )
                              }
                              className="
                              text-red-500
                              hover:scale-110
                              transition
                            "
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        )
                      )}
                    </div>

                    {/* TOTAL */}
                    <div
                      className="
                      mt-6
                      border-t
                      pt-5
                    "
                    >
                      <div
                        className="
                        flex
                        items-center
                        justify-between
                        text-lg
                        font-bold
                      "
                      >
                        <p>Total:</p>

                        <p>${totalPrice}</p>
                      </div>

                      {/* CHECKOUT */}
                      <Link
                        to="/cart"
                        onClick={() =>
                          setOpenCart(false)
                        }
                        className="
                        w-full
                        mt-5
                        bg-red-500
                        text-white
                        h-[55px]
                        rounded-xl
                        font-semibold
                        hover:opacity-90
                        transition
                        flex
                        items-center
                        justify-center
                      "
                      >
                        Checkout
                      </Link>
                    </div>
                  </>
                )}
              </div>
            )}

            {/* PROFILE */}
            <ProfileModal />
          </section>
        </div>
      </div>
    </>
  );
}