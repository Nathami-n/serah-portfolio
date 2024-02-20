import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { CiMail } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
const HomeHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [miniNav, setMiniNav] = useState(false);
  const handleOpen = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <nav className="w-full">
      {/* small nav */}
      <div className="flex justify-between p-3 z-[99] md:hidden">
        <motion.div
          whileHover={{ y: -1, scale: 1.023 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <img
              src="/musiclogo.svg"
              className="w-12 object-contain"
              alt="SerahKe Logo"
            />
            <h1 className="text-3xl font-semibold">
              SerahKe<span className="font-extrabold text-2xl ">.</span>
            </h1>
          </div>
        </motion.div>
        <div>
          <motion.button
            onClick={handleOpen}
            whileTap={{ scale: 0.9 }}
            className="cursor-pointer"
          >
            {isNavOpen ? (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <VscEye className="text-5xl text-gray-800" />
              </motion.div>
            ) : (
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <VscEyeClosed className="text-5xl text-gray-800" />
              </motion.div>
            )}
          </motion.button>
        </div>

        <motion.div
          initial={{ opacity: 0, y: -300 }}
          className=" absolute  left-0 top-0 w-[100vw] border-b-1 rounded-md shadow-md z-[99]"
          animate={{ y: isNavOpen ? 100 : -300, opacity: isNavOpen ? 1 : 0 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <div className="z-[999]">
            <ul className="flex flex-col p-3 gap-4">
              <li>
                <Link to="/" className="text-4xl text-gray-600">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/albums" className="text-4xl text-gray-600">
                  Albums
                </Link>
              </li>
              <li>
                <Link to="/About" className="text-4xl text-gray-600">
                  About
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-4xl text-gray-600 flex items-center "
                >
                  <p>Pages</p>
                  <motion.button
                    className="flex items-center"
                    onClick={() => setMiniNav(!miniNav)}
                    whileHover={{ scale: 1.25 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {!miniNav ? <IoIosArrowDown /> : <IoIosArrowUp />}
                  </motion.button>
                </a>
              </li>
            </ul>
            {miniNav && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.3,
                  ease: "easeIn",
                }}
                className="flex w-[200px]"
              >
                <div className="grid grid-cols-2 gap-9 p-4">
                  <ul className=" flex flex-col gap-9">
                    <Link className="mininav">Home</Link>
                    <Link className="mininav">About</Link>
                    <Link className="mininav">Albums</Link>
                  </ul>
                  <ul className="flex flex-col gap-9">
                    <Link className="mininav">Events</Link>
                    <Link className=" mininav">Shop</Link>
                    <Link className="mininav">Contacts</Link>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
          <div className="flex items-center gap-3 ">
            <div>
              <CiMail className="text-5xl text-black " />
            </div>
            <p className="text-2xl text-black font-bold">
              serahkemusic@gmail.com
            </p>
          </div>
        </motion.div>
      </div>
      {/* big nav */}

      <div className="hidden md:flex p-2 items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/musiclogo.svg"
            className="w-12 object-contain"
            alt="SerahKe Logo"
          />
          <h1 className="text-3xl font-semibold text-black">
            SerahKe<span className="font-extrabold text-2xl">.</span>
          </h1>
        </div>

        <div>
          <ul className="flex gap-12">
            <li>
              <Link to="/" className="text-lg text-black">
                Home
              </Link>
            </li>
            <li>
              <Link to="/albums" className="text-lg text-black">
                Albums
              </Link>
            </li>
            <li>
              <Link to="/About" className="text-lg text-black">
                About
              </Link>
            </li>
            <li>
              <a href="#" className="text-lg text-black flex items-center ">
                <p>Pages</p>
                <motion.button
                  className="flex items-center"
                  onClick={() => setMiniNav(!miniNav)}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {!miniNav ? <IoIosArrowDown /> : <IoIosArrowUp />}
                </motion.button>
              </a>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-3 max-lg:hidden">
          <div>
            <CiMail className="text-5xl text-black " />
          </div>
          <p className="text-2xl text-black font-bold">
            serahkemusic@gmail.com
          </p>
        </div>
      </div>
    </nav>
  );
};

export default HomeHeader;
