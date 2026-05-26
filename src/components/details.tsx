import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Details() {
  const { id } = useParams();

  const [product, setProduct] =
    useState<any>(null);


  // CART
const addToCart = (item: any) => {
  const cart = JSON.parse(
    localStorage.getItem("cart") || "[]"
  );

  const exists = cart.find(
    (product: any) => product.id === item.id
  );

  let updatedCart: any[] = [];

  if (exists) {
    updatedCart = cart.map((product: any) =>
      product.id === item.id
        ? {
            ...product,
            quantity:
              (product.quantity || 1) + 1,
          }
        : product
    );
  } else {
    updatedCart = [
      ...cart,
      { ...item, quantity: 1 },
    ];
  }

  localStorage.setItem(
    "cart",
    JSON.stringify(updatedCart)
  );

  window.dispatchEvent(
    new Event("cartUpdated")
  );
};
  // GET PRODUCT
  async function getProductById() {
    try {
      const { data } =
        await axios.get(
          `https://fastcard-1-o23z.onrender.com/api/Product/get-product-by-id?id=${id}`
        );

      console.log(data);

      // FIX
      setProduct(data?.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProductById();
  }, [id]);

  // LOADING
  if (!product) {
    return (
      <div
        className="
        text-center
        py-20
        text-2xl
      "
      >
        Loading...
      </div>
    );
  }

  return (
    <section className="max-w-[1200px] mx-auto px-5 py-10">
      <div className="grid lg:grid-cols-2 gap-10">
        {/* IMAGE */}

        <div
          className="
          bg-[#F5F5F5]
          rounded-2xl
          flex
          items-center
          justify-center
          p-10
        "
        >
          <img
            src={
              product.image?.startsWith(
                "http"
              )
                ? product.image
                : "https://fastcard-1-o23z.onrender.com/images/" +
                  product.image
            }
            alt={
              product.productName
            }
            className="
            w-full
            max-w-[400px]
            object-contain
          "
          />
        </div>

        {/* INFO */}

        <div>
          {/* TITLE */}

          <h1
            className="
            text-4xl
            font-bold
          "
          >
            {product.productName}
          </h1>

          {/* PRICE */}

          <p
            className="
            text-red-500
            text-3xl
            font-bold
            mt-5
          "
          >
            ${product.price}
          </p>

          {/* DESCRIPTION */}

          <p
            className="
            text-gray-500
            mt-6
            leading-8
          "
          >
            {product.description}
          </p>


        {/* CATEGORY */}
<div className="mt-8">
  <span className="font-semibold">
    Category:
  </span>{" "}
  {product.category?.categoryName}
</div>

{/* BRAND */}
<div className="mt-4">
  <span className="font-semibold">
    Brand:
  </span>{" "}
  {product.brand?.brandName}
</div>

          {/* BRAND */}

          <div className="mt-4">
            <span className="font-semibold">
              Brand:
            </span>{" "}
       { product.brand.brandName }
          </div>

          {/* STOCK */}

          <div className="mt-4">
            <span className="font-semibold">
              In Stock:
            </span>{" "}
            {
              product.quantity
            }
          </div>

          {/* BUTTON */}

          <button
            className="
            mt-10
            bg-red-500
            hover:bg-red-600
            text-white
            px-10
            h-[55px]
            rounded-xl
            transition
          "
          onClick={() => addToCart(product)}
          >
            Add To Cart
          </button>
        </div>
      </div>
    </section>
  );
}