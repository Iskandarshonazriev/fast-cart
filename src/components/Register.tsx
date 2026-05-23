import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Sparkles, Eye, EyeOff } from "lucide-react";
import axios from "axios";

export default function Register() {
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  const [forms, setForms] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
  });

  // PASSWORD STRENGTH
  const getStrength = () => {
    if (forms.password.length < 6) {
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

  const strength = getStrength();

  // GENERATE PASSWORD
  const generatePassword = () => {
    const generated =
      "Ai@" + Math.random().toString(36).slice(2, 10);

    setForms({
      ...forms,
      password: generated,
      confirmPassword: generated,
    });
  };

  // REGISTER
  async function register() {
    try {
      // VALIDATION

      if (
        !forms.userName ||
        !forms.email ||
        !forms.password ||
        !forms.phoneNumber
      ) {
        alert("Fill all inputs");
        return;
      }

      const response = await axios.post(
        "https://store-api.softclub.tj/Account/register",
        forms
      );

      console.log(response.data);

      alert("Registration successful");

      navigate("/login");

    } catch (error: any) {
      console.log(error);

      console.log(error?.response?.data);

      alert(
        error?.response?.data?.errors?.[0] ||
        error?.response?.data?.message ||
        "Registration failed"
      );
    }
  }

  return (
    <div className="min-h-screen bg-[#fafafa] flex items-center justify-center px-5">

      <div
        className="
        w-full
        max-w-[1200px]
        flex
        items-center
        justify-center
        "
      >

        <div
          className="
          w-full
          max-w-[420px]
          bg-white
          p-8
          rounded-2xl
          shadow-sm
          border
          "
        >

          {/* HEADER */}

          <div className="flex items-center gap-2 mb-2">

            <Sparkles
              className="text-[#DB4444]"
              size={22}
            />

            <p className="text-[#DB4444] font-medium">
              AI Registration
            </p>

          </div>

          <h1 className="text-[32px] font-semibold">
            Create an account
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your details below
          </p>

          {/* INPUTS */}

          <div className="flex flex-col gap-5 mt-10">

            {/* USERNAME */}

            <input
              type="text"
              placeholder="Username"
              value={forms.userName}
              onChange={(e) =>
                setForms({
                  ...forms,
                  userName: e.target.value,
                })
              }
              className="
              h-[56px]
              border
              rounded-xl
              px-4
              outline-none
              focus:border-[#DB4444]
              "
            />

            {/* EMAIL */}

            <input
              type="email"
              placeholder="Email"
              value={forms.email}
              onChange={(e) =>
                setForms({
                  ...forms,
                  email: e.target.value,
                })
              }
              className="
              h-[56px]
              border
              rounded-xl
              px-4
              outline-none
              focus:border-[#DB4444]
              "
            />

            {/* PHONE */}

            <input
              type="text"
              placeholder="Phone Number"
              value={forms.phoneNumber}
              onChange={(e) =>
                setForms({
                  ...forms,
                  phoneNumber: e.target.value,
                })
              }
              className="
              h-[56px]
              border
              rounded-xl
              px-4
              outline-none
              focus:border-[#DB4444]
              "
            />

            {/* PASSWORD */}

            <div className="relative">

              <input
                type={show ? "text" : "password"}
                placeholder="Password"
                value={forms.password}
                onChange={(e) =>
                  setForms({
                    ...forms,
                    password: e.target.value,
                    confirmPassword: e.target.value,
                  })
                }
                className="
                h-[56px]
                border
                rounded-xl
                px-4
                pr-14
                w-full
                outline-none
                focus:border-[#DB4444]
                "
              />

              <button
                type="button"
                onClick={() => setShow(!show)}
                className="
                absolute
                right-4
                top-1/2
                -translate-y-1/2
                text-gray-500
                "
              >
                {show ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

            {/* PASSWORD STRENGTH */}

            <div>

              <div className="flex justify-between mb-2">

                <p className="text-sm text-gray-500">
                  AI Password Strength
                </p>

                <p className="text-sm font-medium">
                  {strength.text}
                </p>

              </div>

              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">

                <div
                  className={`
                    h-full
                    ${strength.color}
                    transition-all
                  `}
                  style={{
                    width:
                      strength.text === "Weak"
                        ? "30%"
                        : strength.text === "Medium"
                        ? "65%"
                        : "100%",
                  }}
                />

              </div>

            </div>

            {/* GENERATE PASSWORD */}

            <button
              type="button"
              onClick={generatePassword}
              className="
              flex
              items-center
              justify-center
              gap-2
              h-[50px]
              rounded-xl
              bg-black
              text-white
              hover:opacity-90
              "
            >

              <Sparkles size={18} />

              Generate AI Password

            </button>

          </div>

          {/* REGISTER */}

          <button
            onClick={register}
            className="
            w-full
            h-[56px]
            bg-[#DB4444]
            text-white
            rounded-xl
            mt-8
            hover:opacity-90
            font-medium
            "
          >
            Create Account
          </button>

          {/* GOOGLE */}

          <button
            className="
            w-full
            h-[56px]
            border
            rounded-xl
            mt-4
            flex
            items-center
            justify-center
            gap-3
            hover:bg-gray-50
            "
          >

            <img
              src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"
              className="w-6"
            />

            Sign up with Google

          </button>

          {/* LOGIN */}

          <div className="flex justify-center gap-2 mt-8">

            <p className="text-gray-500">
              Already have account?
            </p>

            <Link
              to="/login"
              className="font-medium hover:text-[#DB4444]"
            >
              Log in
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
}