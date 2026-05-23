import { useEffect, useState } from "react";

import { X } from "lucide-react";

import { Link } from "react-router-dom";

export default function Cart() {

  const [cart, setCart] = useState<any[]>([]);

  // LOAD CART
  useEffect(() => {

    const savedCart = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    // add quantity
    const updatedCart = savedCart.map(
      (item: any) => ({
        ...item,
        quantity: item.quantity || 1,
      })
    );

    setCart(updatedCart);

  }, []);

  // REMOVE ITEM
  const removeItem = (index: number) => {

    const updatedCart = cart.filter(
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

  // CLEAR CART
  const clearCart = () => {

    setCart([]);

    localStorage.removeItem("cart");

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // UPDATE QUANTITY
  const updateQuantity = (
    index: number,
    quantity: number
  ) => {

    const updatedCart = [...cart];

    updatedCart[index].quantity =
      quantity;

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  // TOTAL
  const total = cart.reduce(
    (acc, item) =>
      acc +
      Number(item.price) *
        Number(item.quantity),
    0
  );

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-16">

      {/* breadcrumb */}
      <div className="flex items-center gap-3 text-gray-400 mb-16">

        <Link to="/">Home</Link>

        <span>/</span>

        <p className="text-black">
          Cart
        </p>

      </div>

      {/* table header */}
      <div
        className="
        hidden
        md:grid
        grid-cols-4
        bg-white
        shadow-sm
        rounded
        px-10
        py-6
        mb-5
      "
      >

        <p>Product</p>

        <p>Price</p>

        <p>Quantity</p>

        <p>Subtotal</p>

      </div>

      {/* cart items */}
      <div className="space-y-5">

        {cart.map((item, index) => (

          <div
            key={index}
            className="
            grid
            grid-cols-1
            md:grid-cols-4
            items-center
            gap-5
            bg-white
            shadow-sm
            rounded
            px-6
            py-6
            relative
          "
          >

            {/* remove */}
            <button
              onClick={() =>
                removeItem(index)
              }
              className="
              absolute
              top-4
              right-4
              bg-red-500
              text-white
              rounded-full
              w-7
              h-7
              flex
              items-center
              justify-center
            "
            >

              <X size={16} />

            </button>

            {/* product */}
            <div className="flex items-center gap-5">

              <img
                src={item.image}
                alt=""
                className="
                w-[90px]
                h-[90px]
                object-contain
              "
              />

              <h2 className="font-medium">
                {item.title}
              </h2>

            </div>

            {/* price */}
            <p className="font-semibold">
              ${item.price}
            </p>

            {/* quantity */}
            <select
              value={item.quantity}
              onChange={(e) =>
                updateQuantity(
                  index,
                  Number(e.target.value)
                )
              }
              className="
              border
              rounded
              w-[80px]
              h-[50px]
              px-3
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

            </select>

            {/* subtotal */}
            <p className="font-bold">

              $
              {Number(item.price) *
                Number(item.quantity)}

            </p>

          </div>
        ))}

      </div>

      {/* buttons */}
      <div
        className="
        flex
        flex-col
        md:flex-row
        justify-between
        gap-5
        mt-10
      "
      >

        <Link
          to="/"
          className="
          border
          px-10
          py-4
          rounded
          text-center
          hover:bg-gray-100
        "
        >

          Return To Shop

        </Link>

        <button
          onClick={clearCart}
          className="
          border
          border-red-500
          text-red-500
          px-10
          py-4
          rounded
          hover:bg-red-500
          hover:text-white
          transition
        "
        >

          Remove all

        </button>

      </div>

      {/* total */}
      <div className="flex justify-end mt-16">

        <div
          className="
          border
          rounded
          p-8
          w-full
          md:w-[450px]
        "
        >

          <h2 className="text-3xl font-bold mb-8">
            Cart Total
          </h2>

          <div className="space-y-5">

            <div className="flex justify-between">

              <p>Subtotal:</p>

              <p>${total}</p>

            </div>

            <div className="flex justify-between">

              <p>Shipping:</p>

              <p>Free</p>

            </div>

            <hr />

            <div
              className="
              flex
              justify-between
              text-2xl
              font-bold
            "
            >

              <p>Total:</p>

              <p>${total}</p>

            </div>

          </div>

          <button
            className="
            w-full
            mt-8
            bg-red-500
            text-white
            h-[60px]
            rounded
            text-lg
            hover:opacity-90
            transition
          "
          >

            Proceed to checkout

          </button>

        </div>

      </div>

    </div>
  );
}