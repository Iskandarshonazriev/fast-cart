import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Sparkles,
} from "lucide-react";

import axios from "axios";

export default function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  async function login(e: any) {

    e.preventDefault();

    try {

      if (
        !form.userName ||
        !form.password
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      setLoading(true);

      const response =
        await axios.post(
          "https://store-api.softclub.tj/Account/login",
          form
        );

      console.log(response.data);

      // SAVE TOKEN

      localStorage.setItem(
        "token",
        response.data.data
      );

      alert(
        "Login successful ✅"
      );

      navigate("/");

    } catch (error: any) {

      console.log(
        error.response?.data
      );

      alert(
        error.response?.data
          ?.message ||
          "Login failed"
      );

    } finally {

      setLoading(false);

    }
  }

  return (
    <div
      className="
        min-h-screen

        bg-[#fafafa]
        dark:bg-black

        text-black
        dark:text-white

        duration-300

        flex
        items-center
        justify-center

        px-4
      "
    >

      {/* CARD */}

      <div
        className="
          w-full
          max-w-[520px]

          bg-white
          dark:bg-zinc-900/70

          border
          border-gray-200
          dark:border-zinc-800

          backdrop-blur-2xl

          rounded-3xl

          p-10

          shadow-[0_10px_80px_rgba(0,0,0,0.08)]
          dark:shadow-[0_20px_100px_rgba(0,0,0,0.7)]

          transition-all
          duration-300
        "
      >

        {/* HEADER */}

        <div
          className="
            flex
            items-center
            gap-3
          "
        >

          <div
            className="
              w-12
              h-12

              rounded-2xl

              bg-[#DB4444]

              flex
              items-center
              justify-center

              text-white
            "
          >

            <Sparkles />

          </div>

          <div>

            <p
              className="
                text-[#DB4444]
                font-medium
              "
            >
              Welcome Back
            </p>

            <h1
              className="
                text-3xl
                md:text-5xl
                font-bold
              "
            >
              Login
            </h1>

          </div>

        </div>

        <p
          className="
            text-gray-500
            dark:text-gray-400

            mt-5
            text-lg
          "
        >
          Enter your account details
        </p>

        {/* FORM */}

        <form
          onSubmit={login}
          className="
            mt-10
            space-y-7
          "
        >

          {/* USERNAME */}

          <div className="relative">

            <label
              className="
                absolute
                -top-3
                left-4

                bg-white
                dark:bg-zinc-900

                px-2

                text-gray-500
                text-sm
              "
            >
              Username
            </label>

            <Mail
              size={20}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2

                text-gray-500
              "
            />

            <Input
              type="text"
              placeholder="username"
              value={form.userName}
              onChange={(e) =>
                setForm({
                  ...form,
                  userName:
                    e.target.value,
                })
              }
              className="
                h-16
                pl-12

                text-lg

                rounded-2xl

                bg-gray-100
                dark:bg-black/40

                border
                border-transparent

                dark:border-zinc-800

                focus-visible:ring-[#DB4444]
                focus-visible:border-[#DB4444]

                transition-all
              "
            />

          </div>

          {/* PASSWORD */}

          <div className="relative">

            <label
              className="
                absolute
                -top-3
                left-4

                bg-white
                dark:bg-zinc-900

                px-2

                text-gray-500
                text-sm
              "
            >
              Password
            </label>

            <Lock
              size={20}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2

                text-gray-500
              "
            />

            <Input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="********"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password:
                    e.target.value,
                })
              }
              className="
                h-16
                pl-12
                pr-14

                text-lg

                rounded-2xl

                bg-gray-100
                dark:bg-black/40

                border
                border-transparent

                dark:border-zinc-800

                focus-visible:ring-[#DB4444]
                focus-visible:border-[#DB4444]

                transition-all
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2

                text-gray-500
              "
            >

              {showPassword ? (
                <EyeOff size={24} />
              ) : (
                <Eye size={24} />
              )}

            </button>

          </div>

          {/* FORGOT */}

          <div
            className="
              flex
              justify-end
            "
          >

            <button
              type="button"
              className="
                text-[#DB4444]

                hover:text-red-600

                transition
              "
            >
              Forget Password?
            </button>

          </div>

          {/* BUTTON */}

          <Button
            type="submit"
            disabled={loading}
            className="
              w-full
              h-16

              rounded-2xl

              bg-[#DB4444]
              hover:bg-red-600

              text-white
              text-2xl

              shadow-lg

              transition-all
              duration-300

              hover:scale-[1.02]
            "
          >

            {loading
              ? "Loading..."
              : "Log In"}

          </Button>

        </form>

      </div>

    </div>
  );
}