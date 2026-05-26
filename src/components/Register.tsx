import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  Sparkles,
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
} from "lucide-react";

import axios from "axios";

export default function Register() {

  const navigate = useNavigate();

  const [show, setShow] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [forms, setForms] =
    useState({
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phoneNumber: "",
    });

  // ================= PASSWORD STRENGTH =================

  const getStrength = () => {

    if (
      forms.password.length < 6
    ) {

      return {
        text: "Weak",
        color: "bg-red-500",
      };
    }

    if (
      forms.password.match(/[A-Z]/) &&
      forms.password.match(/[0-9]/) &&
      forms.password.length >= 8
    ) {

      return {
        text: "Strong",
        color: "bg-green-500",
      };
    }

    return {
      text: "Medium",
      color: "bg-yellow-500",
    };
  };

  const strength =
    getStrength();

  // ================= GENERATE PASSWORD =================

  const generatePassword = () => {

    const generated =
      "Ai@" +
      Math.random()
        .toString(36)
        .slice(2, 10);

    setForms({
      ...forms,
      password: generated,
      confirmPassword:
        generated,
    });
  };

  // ================= REGISTER =================

  async function register() {

    try {

      // VALIDATION

      if (
        !forms.userName ||
        !forms.email ||
        !forms.password ||
        !forms.phoneNumber
      ) {

        alert(
          "Please fill all fields"
        );

        return;
      }

      if (
        forms.password !==
        forms.confirmPassword
      ) {

        alert(
          "Passwords do not match"
        );

        return;
      }

      setLoading(true);

      const response =
        await axios.post(
          "https://store-api.softclub.tj/Account/register",
          forms
        );

      console.log(
        response.data
      );

      alert(
        "Registration successful ✅"
      );

      navigate("/login");

    } catch (error: any) {

      console.log(error);

      console.log(
        error?.response?.data
      );

      alert(
        error?.response?.data
          ?.errors?.[0] ||
          error?.response?.data
            ?.message ||
          "Registration failed"
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

        px-5
        py-10
      "
    >

      {/* CARD */}

      <div
        className="
          w-full
          max-w-[500px]

          bg-white
          dark:bg-zinc-900/70

          border
          border-gray-200
          dark:border-zinc-800

          backdrop-blur-2xl

          rounded-3xl

          p-8

          shadow-[0_10px_60px_rgba(0,0,0,0.08)]
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
            mb-2
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
              AI Registration
            </p>

            <h1
              className="
                text-3xl
                md:text-5xl
                font-bold
              "
            >
              Create Account
            </h1>

          </div>

        </div>

        <p
          className="
            text-gray-500
            dark:text-gray-400

            mt-4
            text-lg
          "
        >
          Create your premium account
        </p>

        {/* INPUTS */}

        <div
          className="
            flex
            flex-col
            gap-6
            mt-10
          "
        >

          {/* USERNAME */}

          <div className="relative">

            <User
              size={20}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2

                text-gray-500
              "
            />

            <input
              type="text"
              placeholder="Username"
              value={
                forms.userName
              }
              onChange={(e) =>
                setForms({
                  ...forms,
                  userName:
                    e.target.value,
                })
              }
              className="
                h-[60px]
                w-full

                rounded-2xl

                pl-12
                pr-4

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

          {/* EMAIL */}

          <div className="relative">

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

            <input
              type="email"
              placeholder="Email"
              value={forms.email}
              onChange={(e) =>
                setForms({
                  ...forms,
                  email:
                    e.target.value,
                })
              }
              className="
                h-[60px]
                w-full

                rounded-2xl

                pl-12
                pr-4

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

          {/* PHONE */}

          <div className="relative">

            <Phone
              size={20}
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2

                text-gray-500
              "
            />

            <input
              type="text"
              placeholder="Phone Number"
              value={
                forms.phoneNumber
              }
              onChange={(e) =>
                setForms({
                  ...forms,
                  phoneNumber:
                    e.target.value,
                })
              }
              className="
                h-[60px]
                w-full

                rounded-2xl

                pl-12
                pr-4

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

          {/* PASSWORD */}

          <div className="relative">

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

            <input
              type={
                show
                  ? "text"
                  : "password"
              }
              placeholder="Password"
              value={
                forms.password
              }
              onChange={(e) =>
                setForms({
                  ...forms,
                  password:
                    e.target.value,
                })
              }
              className="
                h-[60px]
                w-full

                rounded-2xl

                pl-12
                pr-14

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

            <button
              type="button"
              onClick={() =>
                setShow(!show)
              }
              className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2

                text-gray-500
              "
            >

              {show ? (
                <EyeOff size={22} />
              ) : (
                <Eye size={22} />
              )}

            </button>

          </div>

          {/* CONFIRM PASSWORD */}

          <div className="relative">

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

            <input
              type={
                show
                  ? "text"
                  : "password"
              }
              placeholder="Confirm Password"
              value={
                forms.confirmPassword
              }
              onChange={(e) =>
                setForms({
                  ...forms,
                  confirmPassword:
                    e.target.value,
                })
              }
              className="
                h-[60px]
                w-full

                rounded-2xl

                pl-12
                pr-4

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

          {/* PASSWORD STRENGTH */}

          <div>

            <div
              className="
                flex
                justify-between
                mb-2
              "
            >

              <p
                className="
                  text-sm
                  text-gray-500
                "
              >
                Password Strength
              </p>

              <p
                className="
                  text-sm
                  font-medium
                "
              >
                {strength.text}
              </p>

            </div>

            <div
              className="
                w-full
                h-2

                bg-gray-200
                dark:bg-zinc-800

                rounded-full
                overflow-hidden
              "
            >

              <div
                className={`
                  h-full
                  ${strength.color}
                  transition-all
                `}
                style={{
                  width:
                    strength.text ===
                    "Weak"
                      ? "30%"
                      : strength.text ===
                        "Medium"
                      ? "65%"
                      : "100%",
                }}
              />

            </div>

          </div>

          {/* GENERATE PASSWORD */}

          <button
            type="button"
            onClick={
              generatePassword
            }
            className="
              flex
              items-center
              justify-center
              gap-2

              h-[56px]

              rounded-2xl

              bg-black
              dark:bg-white

              dark:text-black
              text-white

              hover:opacity-90

              transition-all
            "
          >

            <Sparkles size={18} />

            Generate AI Password

          </button>

        </div>

        {/* REGISTER BUTTON */}

        <button
          onClick={register}
          disabled={loading}
          className="
            w-full
            h-[60px]

            bg-[#DB4444]
            hover:bg-red-600

            text-white

            rounded-2xl

            mt-8

            font-semibold
            text-lg

            transition-all
            duration-300

            hover:scale-[1.02]

            shadow-lg
          "
        >

          {loading
            ? "Loading..."
            : "Create Account"}

        </button>

        {/* GOOGLE */}

        <button
          className="
            w-full
            h-[60px]

            border
            border-gray-200
            dark:border-zinc-800

            rounded-2xl

            mt-4

            flex
            items-center
            justify-center
            gap-3

            hover:bg-gray-50
            dark:hover:bg-zinc-800

            transition-all
          "
        >

          <img
            src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
            className="w-6"
          />

          Sign up with Google

        </button>

        {/* LOGIN */}

        <div
          className="
            flex
            justify-center
            gap-2

            mt-8
          "
        >

          <p
            className="
              text-gray-500
            "
          >
            Already have account?
          </p>

          <Link
            to="/login"
            className="
              font-medium

              hover:text-[#DB4444]

              transition
            "
          >
            Log in
          </Link>

        </div>

      </div>

    </div>
  );
}