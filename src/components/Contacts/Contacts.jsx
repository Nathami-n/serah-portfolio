import { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { HomeFooter, HomeHeader } from "../Home";
const Contacts = () => {
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });

  useEffect(()=>{
    if (success){
      setTimeout(()=>{
        setSuccess(false);
      },3000)
    }

  },[success])
  const handleFormChange = (e) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [e.target.name]: e.target.value,
      };
    });
  };
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();
    emailjs
      .sendForm("service_hzvc20k", "template_ogkyzkd", form.current, {
        publicKey: import.meta.env.VITE_API_KEY,
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
      setFormData({
        user_name: "",
        user_email: "",
        message: "",
      });
      setSuccess(true);
  };

  return (
    <section className=" bg-gray-400/5">
      <HomeHeader />
      <div className="flex flex-col md:grid md:grid-cols-10 gap-5 md:grid-grows-5">
        <div className="px-4 col-span-2">
          <h1 className="text-4xl text-blue-900 font-bold font-home">
            Get In Touch
          </h1>
          <div>
            <div className="flex flex-col mt-5">
              <h2 className="uppercase text-blue-500 mb-1">Email</h2>
              <p className="text-gray-400 text-xl font-semibold">
                serahkemusic@gmail.com
              </p>
            </div>
            <ul className="flex flex-col gap-1 mb-9">
              <li>
                <h1 className="uppercase text-blue-500 mb-1 mt-5">Social</h1>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/harez.tanya.50?mibextid=ZbWKwL"
                  target="_blank"
                  className="text-gray-400 text-xl font-semibold"
                >
                  Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/NyabokeSerah?t=F2Po3SMW8yuNcsHd4vLDSA&s=09"
                  target="_blank"
                  className="text-gray-400 text-xl font-semibold"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/serah__ke?igsh=NXZzdmY3OHh4cDF6"
                  target="_blank"
                  className="text-gray-400 text-xl font-semibold"
                >
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className=" col-start-4 col-span-7 row-span-3">
          {" "}
          <form
            ref={form}
            onSubmit={sendEmail}
            className="border p-5 flex flex-col gap-3 md:p-14"
          >
            {success && <div className="bg-blue-400 rounded-full"> <h1 className="
            text-center text-white p-2">email sent successfully</h1></div>}
            <div className="md:grid md:grid-cols-4 grid-rows-2 gap-x-3 ">
              <div className=" flex flex-col col-span-2 ">
                <label
                  htmlFor="from_name"
                  className="uppercase text-gray-500 font-bold block "
                >
                  Name:
                </label>
                <input
                  onChange={handleFormChange}
                  value={formData.user_name}
                  id="from_name"
                  type="text"
                  name="user_name"
                  className="w-full border-2 outline-none p-3 border-green-200 col-span-3"
                />
              </div>
              <div className=" flex flex-col col-span-2">
                <label
                  htmlFor="user_email"
                  className="uppercase text-gray-500 font-bold block"
                >
                  Email:
                </label>
                <input
                  onChange={handleFormChange}
                  value={formData.user_email}
                  id="user_email"
                  type="email"
                  name="user_email"
                  className="w-full border-2 outline-none p-3 border-green-200"
                />
              </div>
              <div className="flex flex-col col-span-4">
                <label
                  htmlFor="message"
                  className="uppercase text-gray-500 font-bold"
                >
                  Message:
                </label>
                <textarea 
                value={formData.message}
                  onChange={handleFormChange}
                  id="message"
                  name="message"
                  className="w-full h-[100px] outline-none border-2 border-green-200"
                />
              </div>
            </div>
            <button
              type="submit"
              className="bg-blue-300 rounded-xl p-4 hover:bg-green-600 transition-colors group"
            >
              <p className="font-home text-2xl text-white group-hover:text-black">
                Send
              </p>
            </button>
          </form>
        </div>
      </div>

      <HomeFooter />
    </section>
  );
};
export default Contacts;
