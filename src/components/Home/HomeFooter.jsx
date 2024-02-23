import { FiInstagram, FiMail, FiTwitter } from "react-icons/fi";
import { PiFacebookLogoLight } from "react-icons/pi";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeFooter = () => {
  return (
    <footer className=" mt-5 border-t border-gray-300">
      <div className="flex flex-col justify-center px-3 max-sm:px-4 mt-5 gap-3 item-start max-sm:max-w-[671px]  ">
        <div className="flex flex-col gap-3">
          <div className="w-[70px] flex items-center gap-3">
            <img
              src="/musiclogo.svg"
              alt="music logo"
              className="w-full object-cover cursor-pointer"
            />
            <h1 className="text-black text-3xl font-home font-extrabold">
              SerahKe.
            </h1>
          </div>
          <p className=" text-xl font-semibold max-w-[600px] break-words ">
           Serah is a Medic in the making who has found Passion and Love in Music. You can find her in the Handles below
          </p>
        </div>
        <div className="flex gap-6 items-center mt-3">
          <PiFacebookLogoLight className="text-5xl text-black" />
          <FiTwitter className="text-4xl  text-black" />
          <FiInstagram className="text-4xl text-black" />
          <FaWhatsapp className="text-4xl text-black" />
        </div>

        <div className="mt-5 md:flex items-center">
          <ul className="flex items-center max-lg:gap-[120px] lg:gap-[350px] max-sm:flex-col max-sm:items-start max-sm:gap-0">
          <div className="flex flex-col gap-5">
          <p className="text-black font-bold text-3xl underline underline-offset-1">
              Pages
            </p>
            <Link to='/' className="footer-link">Home</Link>
            <Link to='/about' className="footer-link">About</Link>
            <Link  to='/contacts'className="footer-link">Contacts</Link>
          </div>
           <div className="flex flex-col gap-5 mt-12 max-sm:mt-2">
           <Link to='/albums' className="footer-link">Albums</Link>
            <Link to='/shop' className="footer-link">Shop</Link>
            <Link to='/events' className="footer-link">Events</Link>
           </div>
          </ul>
       

        <div className="ml-auto mr-[90px] max-md:mt-8 lg:mr-10">
          <h1 className="text-4xl text-black font-bold p-2">Contact Me</h1>
          <div className="flex items-center gap-4 mt-2">
            <FiMail className="text-4xl" />
            <p className="text-xl font-semibold">serahkemusic@gmail.com</p>
          </div>
        </div>
        </div>

       
      </div>
      <div className="border-t border-gray-300 mt-12 max-sm:text-center flex flex-col gap-3 md:flex-row md:justify-between md:items-center">
          <div className="mt-6">
            <p className=" border-r-2 border-gray-200 text-3xl">
              Copyright{" "}
              <span className="inline-block font-extrabold text-black">
                &#169;
              </span>{" "}
              SerahKe{" "}
            </p>
          </div>

          <p className="text-3xl">
            Designed by{" "}
            <a href="#" className="underline">
              CITA
            </a>
          </p>
        </div>
    </footer>
  );
};

export default HomeFooter;
