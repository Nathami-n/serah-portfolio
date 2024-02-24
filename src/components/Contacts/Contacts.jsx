import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { HomeFooter, HomeHeader } from "../Home";
const Contacts = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", form.current, {
        publicKey: "YOUR_PUBLIC_KEY",
      })
      .then(
        () => {
          console.log("SUCCESS!");
        },
        (error) => {
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <section className=" bg-gray-400/5">
      <HomeHeader />
      <div className="px-4">
        <h1 className="text-4xl text-blue-900 font-bold font-home">
          Get In Touch
        </h1>
        <div>
          <div className="flex flex-col mt-5">
            <h2 className="uppercase text-blue-500 mb-1">Email</h2>
            <p className="text-gray-400 text-xl font-semibold">serahkemusic@gmail.com</p>
          </div>
          <ul className="flex flex-col gap-1 mb-9">
            <li>
              <h1 className="uppercase text-blue-500 mb-1 mt-5">Social</h1>
            </li>
            <li>
              <a href="" className="text-gray-400 text-xl font-semibold">Facebook</a>
            </li>
            <li>
              <a href="" className="text-gray-400 text-xl font-semibold">Twitter</a>
            </li>
            <li>
              <a href="" className="text-gray-400 text-xl font-semibold">Instagram</a>
            </li>
          </ul>
        </div>
      </div>
      <form
        ref={form}
        onSubmit={sendEmail}
        className="border p-5 flex flex-col gap-3"
      >
        <label
          htmlFor="user_name"
          className="uppercase text-gray-500 font-bold "
        >
          Name:
        </label>
        <input
          id="user_name"
          type="text"
          name="user_name"
          className="w-full border-2 outline-none p-3 border-green-200"
        />
        <label
          htmlFor="user_email"
          className="uppercase text-gray-500 font-bold"
        >
          Email:
        </label>
        <input
          id="user_email"
          type="email"
          name="user_email"
          className="w-full border-2 outline-none p-3 border-green-200"
        />
        <label htmlFor="message" className="uppercase text-gray-500 font-bold">
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          className="w-full h-[100px] outline-none border-2 border-green-200"
        />
        <button
          type="submit"
          className="bg-blue-300 rounded-xl p-4 hover:bg-green-600 transition-colors group"
        >
          <p className="font-home text-2xl text-white group-hover:text-black">
            Send
          </p>
        </button>
      </form>
      <HomeFooter />
    </section>
  );
};
export default Contacts;
