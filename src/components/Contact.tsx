import { Phone, Mail, Send } from "lucide-react";
import { useState } from "react";

export default function Contact() {

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [message, setMessage] =
    useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    if (
      !name ||
      !email ||
      !message
    ) {

      alert(
        "Please fill all fields"
      );

      return;
    }

    alert("Message Sent ✅");

    setName("");
    setEmail("");
    setPhone("");
    setMessage("");
  };

  return (
    <div
      className="
        min-h-screen

        bg-[#fafafa]
        dark:bg-black

        text-black
        dark:text-white

        duration-300

        py-14
        px-4
      "
    >

      {/* TITLE */}

      <div
        className="
          max-w-[1200px]
          mx-auto
        "
      >

        <h1
          className="
            text-4xl
            md:text-5xl
            font-bold
          "
        >
          Contact Us
        </h1>

        <p
          className="
            mt-3
            text-gray-500
            dark:text-gray-400
            text-lg
          "
        >
          We would love to hear from you.
        </p>

      </div>

      {/* CONTENT */}

      <div
        className="
          max-w-[1200px]
          mx-auto

          mt-12

          flex
          flex-col
          lg:flex-row

          gap-10
        "
      >

        {/* LEFT CARD */}

        <div
          className="
            w-full
            lg:w-[350px]

            bg-white
            dark:bg-zinc-900/70

            border
            border-gray-200
            dark:border-zinc-800

            rounded-3xl

            p-8

            shadow-[0_10px_60px_rgba(0,0,0,0.08)]
            dark:shadow-[0_20px_80px_rgba(0,0,0,0.6)]

            backdrop-blur-xl
          "
        >

          {/* PHONE */}

          <div>

            <div
              className="
                flex
                items-center
                gap-5
              "
            >

              <div
                className="
                  w-[60px]
                  h-[60px]

                  rounded-2xl

                  bg-[#DB4444]

                  text-white

                  flex
                  items-center
                  justify-center

                  shadow-lg
                "
              >

                <Phone size={26} />

              </div>

              <div>

                <h1
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  Call To Us
                </h1>

                <p
                  className="
                    text-gray-500
                    dark:text-gray-400
                    mt-1
                  "
                >
                  24/7 Support
                </p>

              </div>

            </div>

            <div className="mt-8">

              <p
                className="
                  text-lg
                  text-gray-700
                  dark:text-gray-300
                "
              >
                Phone:
              </p>

              <h2
                className="
                  text-2xl
                  font-semibold
                  mt-2
                "
              >
                +8801611112222
              </h2>

            </div>

          </div>

          {/* LINE */}

          <div
            className="
              my-10
              border-t
              border-gray-200
              dark:border-zinc-800
            "
          />

          {/* EMAIL */}

          <div>

            <div
              className="
                flex
                items-center
                gap-5
              "
            >

              <div
                className="
                  w-[60px]
                  h-[60px]

                  rounded-2xl

                  bg-[#DB4444]

                  text-white

                  flex
                  items-center
                  justify-center

                  shadow-lg
                "
              >

                <Mail size={26} />

              </div>

              <div>

                <h1
                  className="
                    text-2xl
                    font-bold
                  "
                >
                  Write To Us
                </h1>

                <p
                  className="
                    text-gray-500
                    dark:text-gray-400
                    mt-1
                  "
                >
                  Friendly Team
                </p>

              </div>

            </div>

            <div className="mt-8">

              <p
                className="
                  text-lg
                  text-gray-700
                  dark:text-gray-300
                "
              >
                Email:
              </p>

              <h2
                className="
                  text-xl
                  font-semibold
                  mt-2
                "
              >
                support@exclusive.com
              </h2>

            </div>

          </div>

        </div>

        {/* FORM */}

        <form
          onSubmit={handleSubmit}
          className="
            flex-1

            bg-white
            dark:bg-zinc-900/70

            border
            border-gray-200
            dark:border-zinc-800

            rounded-3xl

            p-8

            shadow-[0_10px_60px_rgba(0,0,0,0.08)]
            dark:shadow-[0_20px_80px_rgba(0,0,0,0.6)]

            backdrop-blur-xl
          "
        >

          {/* TOP INPUTS */}

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-3
              gap-5
            "
          >

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              placeholder="Your Name"
              className="
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

                duration-300
              "
            />

            <input
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="Your Email"
              className="
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

                duration-300
              "
            />

            <input
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              placeholder="Phone Number"
              className="
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

                duration-300
              "
            />

          </div>

          {/* TEXTAREA */}

          <textarea
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
            placeholder="Write your message..."
            className="
              mt-8

              w-full
              h-[250px]

              rounded-3xl

              p-6

              resize-none

              bg-gray-100
              dark:bg-black/40

              border
              border-transparent

              dark:border-zinc-800

              outline-none

              focus:border-[#DB4444]

              duration-300
            "
          />

          {/* BUTTON */}

          <div
            className="
              flex
              justify-end
              mt-8
            "
          >

            <button
              type="submit"
              className="
                h-[60px]

                px-10

                rounded-2xl

                bg-[#DB4444]
                hover:bg-red-600

                text-white

                font-semibold
                text-lg

                flex
                items-center
                gap-3

                transition
                duration-300

                shadow-lg
              "
            >

              <Send size={20} />

              Send Message

            </button>

          </div>

        </form>

      </div>

    </div>
  );
}