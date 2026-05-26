import {
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";

import {
  MessageCircle,
  Send,
  X,
  Bot,
  User,
  Sparkles,
  ShoppingCart,
} from "lucide-react";

import { Link } from "react-router-dom";

type Product = {
  id: number;
  productName: string;
  price: number;
  image: string;
  hasDiscount?: boolean;
};

type Message = {
  role: "user" | "ai";
  text: string;
  products?: Product[];
};

export default function AiChat() {

  // ================= OPEN =================

  const [open, setOpen] =
    useState(false);

  // ================= MESSAGE =================

  const [message, setMessage] =
    useState("");

  // ================= LOADING =================

  const [loading, setLoading] =
    useState(false);

  // ================= PRODUCTS =================

  const [products, setProducts] =
    useState<Product[]>([]);

  // ================= CHAT =================

  const [messages, setMessages] =
    useState<Message[]>([
      {
        role: "ai",
        text: "Hello 👋 I am your AI Shop Assistant. Ask me about phones, laptops, cheap products, discounts and more.",
      },
    ]);

  // ================= SCROLL =================

  const messagesEndRef =
    useRef<HTMLDivElement | null>(
      null
    );

  // ================= API =================

  const url =
    "https://fastcard-1-o23z.onrender.com/api/Product/get-products";

  // ================= GET PRODUCTS =================

  useEffect(() => {

    async function getProducts() {

      try {

        const res =
          await axios.get(url);

        const data =
          res?.data?.data?.products ||
          res?.data?.data ||
          [];

        if (
          Array.isArray(data)
        ) {

          setProducts(data);

        }

      } catch (error) {

        console.log(error);
      }
    }

    getProducts();

  }, []);

  // ================= AUTO SCROLL =================

  useEffect(() => {

    messagesEndRef.current
      ?.scrollIntoView({
        behavior: "smooth",
      });

  }, [messages]);

  // ================= ADD TO CART =================

  const addToCart = (
    product: Product
  ) => {

    const cart =
      JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

    const updatedCart = [
      ...cart,
      product,
    ];

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  // ================= AI LOGIC =================

  const getAIResponse = (
    text: string
  ) => {

    const lower =
      text.toLowerCase();

    // ================= PHONE =================

    if (
      lower.includes("phone") ||
      lower.includes("iphone") ||
      lower.includes("телефон")
    ) {

      const filtered =
        products.filter((item) =>
          item.productName
            ?.toLowerCase()
            .includes("phone")
        );

      return {
        text: "I found phones for you 📱",
        products: filtered,
      };
    }

    // ================= LAPTOP =================

    if (
      lower.includes("laptop") ||
      lower.includes("ноут") ||
      lower.includes("macbook")
    ) {

      const filtered =
        products.filter((item) =>
          item.productName
            ?.toLowerCase()
            .includes("laptop")
        );

      return {
        text: "Best laptops 💻",
        products: filtered,
      };
    }

    // ================= CHEAP =================

    if (
      lower.includes("cheap") ||
      lower.includes("cheap products") ||
      lower.includes("дешево")
    ) {

      const filtered =
        [...products]
          .sort(
            (a, b) =>
              a.price - b.price
          )
          .slice(0, 4);

      return {
        text: "Cheap products 💸",
        products: filtered,
      };
    }

    // ================= DISCOUNT =================

    if (
      lower.includes("discount") ||
      lower.includes("sale") ||
      lower.includes("скидка")
    ) {

      const filtered =
        products.filter(
          (item) =>
            item.hasDiscount
        );

      return {
        text: "Discount products 🔥",
        products: filtered,
      };
    }

    // ================= CAMERA =================

    if (
      lower.includes("camera") ||
      lower.includes("камера")
    ) {

      const filtered =
        products.filter((item) =>
          item.productName
            ?.toLowerCase()
            .includes("camera")
        );

      return {
        text: "Best cameras 📸",
        products: filtered,
      };
    }

    // ================= DEFAULT =================

    return {
      text: `
Try asking:
• phones
• laptops
• cheap products
• discount
• cameras
      `,
      products: [],
    };
  };

  // ================= SEND MESSAGE =================

  const sendMessage = () => {

    if (
      message.trim() === ""
    ) return;

    // USER MESSAGE

    const userMessage: Message = {
      role: "user",
      text: message,
    };

    setMessages((prev) => [
      ...prev,
      userMessage,
    ]);

    setLoading(true);

    // AI THINKING

    setTimeout(() => {

      const ai =
        getAIResponse(message);

      const aiMessage: Message = {
        role: "ai",
        text: ai.text,
        products: ai.products,
      };

      setMessages((prev) => [
        ...prev,
        aiMessage,
      ]);

      setLoading(false);

    }, 1000);

    setMessage("");
  };

  return (
    <div>

      {/* ================= BUTTON ================= */}

      <button
        onClick={() =>
          setOpen(!open)
        }
        className="
          fixed
          bottom-6
          right-6

          w-16
          h-16

          rounded-full

          bg-red-500
          text-white

          flex
          items-center
          justify-center

          shadow-[0_10px_40px_rgba(239,68,68,0.5)]

          z-[999]

          hover:scale-110

          transition-all
          duration-300
        "
      >

        {open ? (
          <X size={28} />
        ) : (
          <MessageCircle size={28} />
        )}

      </button>

      {/* ================= CHAT ================= */}

      {open && (

        <div
          className="
            fixed
            bottom-28
            right-6

            w-[400px]
            max-w-[95vw]

            h-[700px]
            max-h-[85vh]

            bg-white
            dark:bg-zinc-950

            border
            border-gray-200
            dark:border-zinc-800

            rounded-[30px]

            overflow-hidden

            shadow-[0_20px_80px_rgba(0,0,0,0.25)]

            flex
            flex-col

            z-[999]
          "
        >

          {/* ================= TOP ================= */}

          <div
            className="
              h-[85px]

              bg-gradient-to-r
              from-red-500
              to-red-600

              px-6

              flex
              items-center
              justify-between

              text-white
            "
          >

            <div
              className="
                flex
                items-center
                gap-4
              "
            >

              <div
                className="
                  w-14
                  h-14

                  rounded-full

                  bg-white/20

                  flex
                  items-center
                  justify-center
                "
              >

                <Sparkles size={28} />

              </div>

              <div>

                <h1
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  AI Assistant
                </h1>

                <p
                  className="
                    text-sm
                    opacity-80
                  "
                >
                  Online
                </p>

              </div>

            </div>

          </div>

          {/* ================= MESSAGES ================= */}

          <div
            className="
              flex-1

              overflow-y-auto

              p-5

              flex
              flex-col

              gap-5
            "
          >

            {messages.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className={`
                    flex

                    ${
                      item.role ===
                      "user"
                        ? "justify-end"
                        : "justify-start"
                    }
                  `}
                >

                  <div
                    className="
                      max-w-[85%]
                    "
                  >

                    {/* ================= USER / AI ================= */}

                    <div
                      className={`
                        px-5
                        py-4

                        rounded-3xl

                        text-sm
                        leading-7

                        ${
                          item.role ===
                          "user"

                            ? `
                              bg-red-500
                              text-white
                            `

                            : `
                              bg-gray-100
                              dark:bg-zinc-900
                            `
                        }
                      `}
                    >

                      <div
                        className="
                          flex
                          items-center
                          gap-2

                          mb-2
                        "
                      >

                        {item.role ===
                        "user" ? (

                          <User size={18} />

                        ) : (

                          <Bot size={18} />

                        )}

                        <span
                          className="
                            font-semibold
                          "
                        >

                          {item.role ===
                          "user"

                            ? "You"

                            : "AI"}

                        </span>

                      </div>

                      {item.text}

                    </div>

                    {/* ================= PRODUCTS ================= */}

                    {item.products &&
                      item.products
                        .length > 0 && (

                      <div
                        className="
                          mt-4

                          grid
                          grid-cols-2

                          gap-3
                        "
                      >

                        {item.products
                          .slice(0, 4)
                          .map(
                            (
                              product
                            ) => (

                              <div
                                key={
                                  product.id
                                }
                                className="
                                  bg-gray-100
                                  dark:bg-zinc-900

                                  rounded-2xl

                                  p-3

                                  border
                                  dark:border-zinc-800
                                "
                              >

                                <Link
                                  to={`/details/${product.id}`}
                                >

                                  <img
                                    src={
                                      product.image
                                    }
                                    alt=""
                                    className="
                                      w-full
                                      h-[110px]

                                      object-contain
                                    "
                                  />

                                </Link>

                                <h2
                                  className="
                                    text-sm
                                    font-semibold

                                    mt-2

                                    line-clamp-1
                                  "
                                >

                                  {
                                    product.productName
                                  }

                                </h2>

                                <p
                                  className="
                                    text-red-500
                                    font-bold

                                    mt-1
                                  "
                                >
                                  $
                                  {
                                    product.price
                                  }
                                </p>

                                <button
                                  onClick={() =>
                                    addToCart(
                                      product
                                    )
                                  }
                                  className="
                                    mt-3

                                    w-full

                                    h-[42px]

                                    rounded-xl

                                    bg-black
                                    dark:bg-white

                                    dark:text-black
                                    text-white

                                    flex
                                    items-center
                                    justify-center

                                    gap-2

                                    text-sm

                                    transition

                                    hover:scale-[1.02]
                                  "
                                >

                                  <ShoppingCart
                                    size={16}
                                  />

                                  Add

                                </button>

                              </div>

                            )
                          )}

                      </div>

                    )}

                  </div>

                </div>

              )
            )}

            {/* ================= LOADING ================= */}

            {loading && (

              <div
                className="
                  bg-gray-100
                  dark:bg-zinc-900

                  px-5
                  py-4

                  rounded-3xl

                  w-fit
                "
              >
                AI is typing...
              </div>

            )}

            <div ref={messagesEndRef} />

          </div>

          {/* ================= INPUT ================= */}

          <div
            className="
              p-4

              border-t
              border-gray-200
              dark:border-zinc-800

              flex
              items-center

              gap-3
            "
          >

            <input
              value={message}
              onChange={(e) =>
                setMessage(
                  e.target.value
                )
              }
              onKeyDown={(e) => {

                if (
                  e.key === "Enter"
                ) {

                  sendMessage();
                }
              }}
              placeholder="Ask AI..."
              className="
                flex-1

                h-[58px]

                px-5

                rounded-2xl

                bg-gray-100
                dark:bg-zinc-900

                outline-none

                border
                border-transparent

                focus:border-red-500
              "
            />

            <button
              onClick={sendMessage}
              className="
                w-14
                h-14

                rounded-2xl

                bg-red-500
                text-white

                flex
                items-center
                justify-center

                hover:scale-105

                transition
              "
            >

              <Send size={22} />

            </button>

          </div>

        </div>

      )}

    </div>
  );
}