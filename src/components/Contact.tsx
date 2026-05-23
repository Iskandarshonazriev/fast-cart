import { Phone, Mail } from "lucide-react";
import { useState } from "react";

export default function Contact() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [phone,setPhone] = useState("");
  const [message,setMessage] = useState("");

async function sendTelegram() {
  const BOT_TOKEN = import.meta.env.VITE_BOT_TOKEN;
  const CHAT_ID = import.meta.env.VITE_CHAT_ID;

  console.log("BOT:", BOT_TOKEN);
  console.log("CHAT:", CHAT_ID);

  const text = `
📩 Новое сообщение

👤 Name: ${name}
📧 Email: ${email}
📱 Phone: ${phone}

💬 Message:
${message}
`;

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text,
        }),
      }
    );

    const data = await response.json();

    console.log("TELEGRAM:", data);

    if (data.ok) {
      alert("Сообщение отправлено");

      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } else {
      alert(data.description);
    }

  } catch (err) {
    console.log("ERROR:", err);
    alert("Смотри ошибку в Console (F12)");
  }
}

  return (
    <div className="max-w-[1200px] mx-auto px-4">

      <div className="mt-10 flex flex-col lg:flex-row gap-10">

        {/* LEFT */}
        <div className="w-full lg:w-[340px] bg-white shadow-xl rounded p-8">

          <div className="flex items-center gap-5">
            <div className="w-[50px] h-[50px] rounded-full bg-[#DB4444] text-white flex items-center justify-center">
              <Phone/>
            </div>

            <h1 className="text-[22px] font-semibold">
              Call To Us
            </h1>
          </div>

          <p className="mt-8">
            Phone: +8801611112222
          </p>

          <hr className="my-10"/>

          <div className="flex items-center gap-5">

            <div className="w-[50px] h-[50px] rounded-full bg-[#DB4444] text-white flex items-center justify-center">
              <Mail/>
            </div>

            <h1 className="text-[22px] font-semibold">
              Write To Us
            </h1>

          </div>

        </div>



        {/* FORM */}

        <div className="flex-1 bg-white shadow-xl rounded p-6">

          <div className="flex flex-col lg:flex-row gap-5">

            <input
              value={name}
              onChange={(e)=>setName(e.target.value)}
              placeholder="Name"
              className="h-[55px] border rounded px-4 w-full"
            />

            <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              placeholder="Email"
              className="h-[55px] border rounded px-4 w-full"
            />

            <input
              value={phone}
              onChange={(e)=>setPhone(e.target.value)}
              placeholder="Phone"
              className="h-[55px] border rounded px-4 w-full"
            />

          </div>


          <textarea
            value={message}
            onChange={(e)=>setMessage(e.target.value)}
            placeholder="Your Message"
            className="mt-8 w-full h-[250px] border rounded p-4"
          />

          <div className="flex justify-end mt-8">

            <button
              onClick={sendTelegram}
              className="w-full lg:w-[220px] h-[56px] bg-[#DB4444] text-white rounded"
            >
              Send Message
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}