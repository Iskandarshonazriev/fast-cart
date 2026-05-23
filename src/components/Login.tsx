import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Eye,
  EyeOff,
  Mail,
  Lock,
} from "lucide-react";

import axios from "axios";

export default function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [form, setForm] = useState({
    userName: "",
    password: "",
  });

  async function login(e: any) {
    e.preventDefault();

    try {

      const response = await axios.post(
        "https://store-api.softclub.tj/Account/login",
        form
      );

      console.log(response.data);

      // TOKEN SAVE
      localStorage.setItem(
        "token",
        response.data.data
      );

      alert("Login successful");

      navigate("/");

    } catch (error: any) {

      console.log(error.response?.data);

      alert(
        error.response?.data?.message ||
        "Login failed"
      );
    }
  }

  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">

      <div className="w-full max-w-[520px]">

        {/* Title */}

        <h1 className="text-[42px] md:text-[56px] font-bold text-black">
          Log in to Exclusive
        </h1>

        <p className="text-gray-700 text-lg mt-3">
          Enter your details below
        </p>

        {/* Form */}

        <form
          onSubmit={login}
          className="mt-12 space-y-7"
        >

          {/* Username */}

          <div className="relative">

            <label className="absolute -top-3 left-4 bg-white px-2 text-gray-500 text-sm">
              Username
            </label>

            <Mail
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <Input
              type="text"
              placeholder="username"
              value={form.userName}
              onChange={(e) =>
                setForm({
                  ...form,
                  userName: e.target.value,
                })
              }
              className="
                h-16
                pl-12
                text-lg
                border-gray-300
                rounded-md
                focus-visible:ring-red-500
              "
            />

          </div>

          {/* Password */}

          <div className="relative">

            <label className="absolute -top-3 left-4 bg-white px-2 text-gray-500 text-sm">
              Password
            </label>

            <Lock
              size={20}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
            />

            <Input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="**********"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              className="
                h-16
                pl-12
                pr-14
                text-lg
                border-gray-300
                rounded-md
                focus-visible:ring-red-500
              "
            />

            <button
              type="button"
              onClick={() =>
                setShowPassword(!showPassword)
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

          {/* Forgot */}

          <div className="flex justify-center">

            <button
              type="button"
              className="
                text-red-500
                text-xl
                hover:text-red-600
                transition
              "
            >
              Forget Password?
            </button>

          </div>

          {/* Button */}

          <Button
            type="submit"
            className="
              w-full
              h-16
              bg-red-500
              hover:bg-red-600
              text-white
              text-2xl
              rounded-md
            "
          >
            Log In
          </Button>

        </form>

      </div>

    </div>
  );
}