import { useEffect, useState } from "react";

import {
  X,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";

import { Link } from "react-router-dom";

export default function Cart() {

  const [cart, setCart] =
    useState<any[]>([]);

    const [
  openCheckout,
  setOpenCheckout,
] = useState(false);
  // ================= LOAD CART =================

  useEffect(() => {

    const loadCart = () => {

      const savedCart =
        JSON.parse(
          localStorage.getItem(
            "cart"
          ) || "[]"
        );

      const updatedCart =
        savedCart.map(
          (item: any) => ({
            ...item,
            quantity:
              item.quantity || 1,
          })
        );

      setCart(updatedCart);
    };

    loadCart();

    window.addEventListener(
      "cartUpdated",
      loadCart
    );

    return () => {

      window.removeEventListener(
        "cartUpdated",
        loadCart
      );
    };

  }, []);

  // ================= REMOVE ITEM =================

  const removeItem = (
    index: number
  ) => {

    const updatedCart =
      cart.filter(
        (_, i) => i !== index
      );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // ================= CLEAR CART =================

  const clearCart = () => {

    setCart([]);

    localStorage.removeItem(
      "cart"
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // ================= UPDATE QUANTITY =================

  const updateQuantity = (
    index: number,
    quantity: number
  ) => {

    const updatedCart = [
      ...cart,
    ];

    updatedCart[index].quantity =
      quantity;

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // ================= TOTAL =================

  const total = cart.reduce(
    (acc, item) =>

      acc +
      Number(item.price) *
        Number(item.quantity),

    0
  );


  return (
    <div
      className="
        min-h-screen

        bg-[#fafafa]
        dark:bg-black

        text-black
        dark:text-white

        duration-300

        py-16
        px-4
      "
    >

      <div
        className="
          max-w-[1400px]
          mx-auto
        "
      >

        {/* ================= BREADCRUMB ================= */}

        <div
          className="
            flex
            items-center
            gap-3

            text-gray-400

            mb-16
          "
        >

          <Link
            to="/"
            className="
              hover:text-[#DB4444]
              transition
            "
          >
            Home
          </Link>

          <span>/</span>

          <p
            className="
              text-black
              dark:text-white
            "
          >
            Cart
          </p>

        </div>

        {/* ================= TOP ================= */}

        <div
          className="
            flex
            flex-col
            md:flex-row

            md:items-center
            md:justify-between

            gap-5

            mb-12
          "
        >

          <div>

            <p
              className="
                text-gray-500
                dark:text-gray-400
              "
            >
              Shopping Cart
            </p>

            <h1
              className="
                text-4xl
                md:text-6xl

                font-bold

                mt-2
              "
            >
              Your Cart
            </h1>

          </div>

          {cart.length > 0 && (

            <button
              onClick={clearCart}
              className="
                h-[56px]

                px-8

                rounded-2xl

                border
                border-red-500

                text-red-500

                hover:bg-red-500
                hover:text-white

                transition-all
                duration-300
              "
            >
              Remove All
            </button>

          )}

        </div>

        {/* ================= EMPTY ================= */}

        {cart.length === 0 ? (

          <div
            className="
              text-center

              py-32

              bg-white
              dark:bg-zinc-900/40

              rounded-3xl

              border
              border-gray-200
              dark:border-zinc-800

              backdrop-blur-2xl

              shadow-[0_10px_50px_rgba(0,0,0,0.06)]
              dark:shadow-[0_20px_100px_rgba(0,0,0,0.5)]
            "
          >

            <div
              className="
                w-[120px]
                h-[120px]

                rounded-full

                bg-red-100
                dark:bg-red-500/10

                flex
                items-center
                justify-center

                mx-auto
              "
            >

              <ShoppingBag
                size={60}
                className="
                  text-[#DB4444]
                "
              />

            </div>

            <h2
              className="
                text-4xl
                font-bold

                mt-10
              "
            >
              Cart Is Empty
            </h2>

            <p
              className="
                text-gray-500
                dark:text-gray-400

                mt-5
                text-lg
              "
            >
              Add products to your
              cart 🛒
            </p>

            <Link
              to="/"
              className="
                inline-flex

                mt-10

                h-[56px]

                px-8

                rounded-2xl

                bg-[#DB4444]
                hover:bg-red-600

                text-white

                items-center
                justify-center
                gap-3

                font-semibold

                transition-all
                duration-300

                hover:scale-[1.02]
              "
            >

              <ArrowLeft
                size={20}
              />

              Continue Shopping

            </Link>

          </div>

        ) : (

          <>
            {/* ================= TABLE HEADER ================= */}

            <div
              className="
                hidden
                lg:grid

                grid-cols-4

                bg-white
                dark:bg-zinc-900/70

                border
                border-gray-200
                dark:border-zinc-800

                rounded-3xl

                px-10
                py-6

                mb-6

                backdrop-blur-2xl

                shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                dark:shadow-[0_20px_80px_rgba(0,0,0,0.5)]
              "
            >

              <p
                className="
                  font-semibold
                "
              >
                Product
              </p>

              <p
                className="
                  font-semibold
                "
              >
                Price
              </p>

              <p
                className="
                  font-semibold
                "
              >
                Quantity
              </p>

              <p
                className="
                  font-semibold
                "
              >
                Subtotal
              </p>

            </div>

            {/* ================= ITEMS ================= */}

            <div
              className="
                space-y-6
              "
            >

              {cart.map(
                (
                  item,
                  index
                ) => (

                  <div
                    key={index}
                    className="
                      grid
                      grid-cols-1
                      lg:grid-cols-4

                      items-center

                      gap-6

                      bg-white
                      dark:bg-zinc-900/70

                      border
                      border-gray-200
                      dark:border-zinc-800

                      rounded-3xl

                      p-6

                      relative

                      backdrop-blur-2xl

                      shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                      dark:shadow-[0_20px_80px_rgba(0,0,0,0.5)]
                    "
                  >

                    {/* REMOVE */}

                    <button
                      onClick={() =>
                        removeItem(
                          index
                        )
                      }
                      className="
                        absolute
                        top-4
                        right-4

                        w-9
                        h-9

                        rounded-full

                        bg-red-500

                        text-white

                        flex
                        items-center
                        justify-center

                        hover:scale-110

                        transition-all
                      "
                    >

                      <X
                        size={18}
                      />

                    </button>

                    {/* PRODUCT */}

                    <div
                      className="
                        flex
                        items-center
                        gap-5
                      "
                    >

                      <img
                        src={
                          item.image?.startsWith(
                            "http"
                          )
                            ? item.image
                            : `https://fastcard-1-o23z.onrender.com/images/${item.image}`
                        }
                        alt=""
                        className="
                          w-[100px]
                          h-[100px]

                          object-contain
                        "
                      />

                      <div>

                        <h2
                          className="
                            text-xl
                            font-semibold
                          "
                        >
                          {
                            item.productName
                          }
                        </h2>

                        <p
                          className="
                            text-gray-500
                            mt-2
                          "
                        >
                          Premium Product
                        </p>

                      </div>

                    </div>

                    {/* PRICE */}

                    <p
                      className="
                        text-2xl
                        font-bold
                        text-[#DB4444]
                      "
                    >
                      ${item.price}
                    </p>

                    {/* QUANTITY */}

                    <select
                      value={
                        item.quantity
                      }
                      onChange={(e) =>
                        updateQuantity(
                          index,
                          Number(
                            e.target
                              .value
                          )
                        )
                      }
                      className="
                        h-[56px]
                        w-[120px]

                        rounded-2xl

                        bg-gray-100
                        dark:bg-black/40

                        border
                        border-transparent

                        dark:border-zinc-800

                        px-4

                        outline-none
                      "
                    >

                      <option value={1}>
                        01
                      </option>

                      <option value={2}>
                        02
                      </option>

                      <option value={3}>
                        03
                      </option>

                      <option value={4}>
                        04
                      </option>

                      <option value={5}>
                        05
                      </option>

                    </select>

                    {/* SUBTOTAL */}

                    <p
                      className="
                        text-2xl
                        font-bold
                      "
                    >
                      $
                      {Number(
                        item.price
                      ) *
                        Number(
                          item.quantity
                        )}
                    </p>

                  </div>

                )
              )}

            </div>

            {/* ================= ACTIONS ================= */}

            <div
              className="
                flex
                flex-col
                md:flex-row

                justify-between

                gap-5

                mt-12
              "
            >

              <Link
                to="/"
                className="
                  h-[56px]

                  px-8

                  rounded-2xl

                  border
                  border-gray-200
                  dark:border-zinc-800

                  flex
                  items-center
                  justify-center
                  gap-3

                  hover:bg-gray-100
                  dark:hover:bg-zinc-900

                  transition-all
                "
              >

                <ArrowLeft
                  size={20}
                />

                Return To Shop

              </Link>

            </div>

            {/* ================= TOTAL ================= */}

            <div
              className="
                flex
                justify-end

                mt-16
              "
            >

              <div
                className="
                  w-full
                  md:w-[500px]

                  bg-white
                  dark:bg-zinc-900/70

                  border
                  border-gray-200
                  dark:border-zinc-800

                  rounded-3xl

                  p-8

                  backdrop-blur-2xl

                  shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                  dark:shadow-[0_20px_80px_rgba(0,0,0,0.5)]
                "
              >

                <h2
                  className="
                    text-4xl
                    font-bold

                    mb-10
                  "
                >
                  Cart Total
                </h2>

                <div
                  className="
                    space-y-6
                  "
                >

                  <div
                    className="
                      flex
                      justify-between
                    "
                  >

                    <p>
                      Subtotal
                    </p>

                    <p
                      className="
                        font-semibold
                      "
                    >
                      ${total}
                    </p>

                  </div>

                  <div
                    className="
                      flex
                      justify-between
                    "
                  >

                    <p>
                      Shipping
                    </p>

                    <p
                      className="
                        text-green-500
                        font-semibold
                      "
                    >
                      Free
                    </p>

                  </div>

                  <hr
                    className="
                      dark:border-zinc-800
                    "
                  />

                  <div
                    className="
                      flex
                      justify-between

                      text-3xl
                      font-bold
                    "
                  >

                    <p>Total</p>

                    <p>
                      ${total}
                    </p>

                  </div>

                </div>

                {/* CHECKOUT */}

            <button
  onClick={() =>
    setOpenCheckout(true)
  }
  className="
    w-full
    h-[60px]

    mt-10

    rounded-2xl

    bg-[#DB4444]
    hover:bg-red-600

    text-white

    text-lg
    font-semibold

    transition-all
    duration-300

    hover:scale-[1.02]

    shadow-lg
  "
>
  Proceed To Checkout
</button>

              </div>

            </div>
          </>
        )}

      </div>
{/* ================= CHECKOUT MODAL ================= */}

{openCheckout && (

  <div
    className="
      fixed
      inset-0

      bg-black/60

      backdrop-blur-md

      z-[999]

      flex
      items-center
      justify-center

      p-4
    "
  >

    {/* MODAL */}

    <div
      className="
        w-full
        max-w-[600px]

        bg-white
        dark:bg-zinc-900

        rounded-[40px]

        border
        border-gray-200
        dark:border-zinc-800

        p-8

        relative

        overflow-hidden

        shadow-[0_20px_100px_rgba(0,0,0,0.2)]
        dark:shadow-[0_20px_120px_rgba(0,0,0,0.8)]

        animate-in
        fade-in
        zoom-in-95
        duration-300
      "
    >

      {/* CLOSE */}

      <button
        onClick={() =>
          setOpenCheckout(false)
        }
        className="
          absolute
          top-5
          right-5

          w-11
          h-11

          rounded-full

          bg-gray-100
          dark:bg-zinc-800

          flex
          items-center
          justify-center

          hover:scale-110

          transition-all
        "
      >

        <X size={20} />

      </button>

      {/* TOP */}

      <div
        className="
          text-center
        "
      >

        <div
          className="
            w-[90px]
            h-[90px]

            rounded-full

            bg-[#DB4444]/10

            flex
            items-center
            justify-center

            mx-auto
          "
        >

          <ShoppingBag
            size={40}
            className="
              text-[#DB4444]
            "
          />

        </div>

        <h1
          className="
            text-4xl
            font-bold

            mt-8
          "
        >
          Checkout
        </h1>

        <p
          className="
            text-gray-500
            dark:text-gray-400

            mt-4
            text-lg
          "
        >
          Complete your order
          securely
        </p>

      </div>

      {/* FORM */}

      <div
        className="
          mt-10
          space-y-5
        "
      >

        <input
          type="text"
          placeholder="Full Name"
          className="
            w-full
            h-[60px]

            rounded-2xl

            px-5

            bg-gray-100
            dark:bg-black/40

            border
            border-transparent

            dark:border-zinc-800

            outline-none

            focus:border-[#DB4444]
          "
        />

        <input
          type="text"
          placeholder="Phone Number"
          className="
            w-full
            h-[60px]

            rounded-2xl

            px-5

            bg-gray-100
            dark:bg-black/40

            border
            border-transparent

            dark:border-zinc-800

            outline-none

            focus:border-[#DB4444]
          "
        />

        <input
          type="text"
          placeholder="Address"
          className="
            w-full
            h-[60px]

            rounded-2xl

            px-5

            bg-gray-100
            dark:bg-black/40

            border
            border-transparent

            dark:border-zinc-800

            outline-none

            focus:border-[#DB4444]
          "
        />

      </div>

      {/* TOTAL */}

      <div
        className="
          mt-10

          bg-gray-100
          dark:bg-black/30

          rounded-3xl

          p-6
        "
      >

        <div
          className="
            flex
            justify-between

            text-lg
          "
        >

          <p>
            Total
          </p>

          <p
            className="
              font-bold
              text-2xl
            "
          >
            ${total}
          </p>

        </div>

      </div>

      {/* BUTTONS */}

      <div
        className="
          flex
          gap-4

          mt-10
        "
      >

        <button
          onClick={() =>
            setOpenCheckout(false)
          }
          className="
            flex-1
            h-[60px]

            rounded-2xl

            border
            border-gray-200
            dark:border-zinc-800

            hover:bg-gray-100
            dark:hover:bg-zinc-800

            transition-all
          "
        >
          Cancel
        </button>




<button
  onClick={async () => {
    try {
      const botToken =
        "8673776780:AAFRTgknbzjURWREjMycMjjEUwDpF5rIopg";

      const chatId =
        "7152972467";

      const orderMessage = `
🛒 Новый заказ!

📦 Товары:
${cart
  .map(
    (item) =>
      `• ${item.productName} x ${item.quantity}`
  )
  .join("\n")}

💰 Total: $${total}
`;

      const response =
        await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: "POST",
            headers: {
              "Content-Type":
                "application/json",
            },
            body: JSON.stringify({
              chat_id: chatId,
              text: orderMessage,
            }),
          }
        );

      const data =
        await response.json();

      console.log(
        "Telegram:",
        data
      );

      if (data.ok) {
        alert(
          "Order Successfully ✅"
        );

        localStorage.removeItem(
          "cart"
        );

        setCart([]);

        setOpenCheckout(false);

        window.dispatchEvent(
          new Event(
            "cartUpdated"
          )
        );
      } else {
        alert(
          data.description
        );
      }
    } catch (error) {
      console.log(error);

      alert(
        "Ошибка отправки заказа ❌"
      );
    }
  }}
  className="
    flex-1
    h-[60px]

    rounded-2xl

    bg-[#DB4444]
    hover:bg-red-600

    text-white

    font-semibold

    transition-all
    duration-300

    hover:scale-[1.02]
  "
>
  Confirm Order
</button>

      </div>

    </div>

  </div>

)}
    </div>
  );
}