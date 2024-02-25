import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { CiMail } from "react-icons/ci";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
const HomeHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [miniNav, setMiniNav] = useState(false);
  const [largeNav, setLargeNav] = useState(false);
  const handleOpen = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <nav className="w-full">
      {/* small nav */}
      <div className="justify-between p-3 z-[99]  max-md:flex lg:hidden max-lg:flex">
        <motion.div
          whileHover={{ y: -1, scale: 1.023 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="cursor-pointer"
        >
          <Link to="/">
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
          </Link>
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
          className=" absolute  left-0 right-0 -top-4 w-[100vw] border-b-1 rounded-md shadow-md z-[99]"
          animate={{ y: isNavOpen ? 100 : -300, opacity: isNavOpen ? 1 : 0 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <div className="bg-white">
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
                <Link to="/about" className="text-4xl text-gray-600">
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
                    <Link to="/" className="mininav">
                      Home
                    </Link>
                    <Link to="/about" className="mininav">
                      About
                    </Link>
                    <Link to="/albums" className="mininav">
                      Albums
                    </Link>
                  </ul>
                  <ul className="flex flex-col gap-9">
                    <Link to="/events" className="mininav">
                      Events
                    </Link>
                    <Link to="/shop" className=" mininav">
                      Shop
                    </Link>
                    <Link to="/contacts" className="mininav">
                      Contacts
                    </Link>
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
          <div className="flex items-center gap-3 bg-white">
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

      <div className="max-lg:hidden flex justify-between items-center p-3">
        <motion.div
          whileHover={{ y: -1, scale: 1.023 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="cursor-pointer"
        >
          <Link to="/">
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
          </Link>
        </motion.div>

        <div>
          <ul className="flex gap-12">
            <li>
              <Link to="/" className="text-2xl text-black ">
                Home
              </Link>
            </li>
            <li>
              <Link to="/albums" className="text-2xl text-black">
                Albums
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-2xl text-black">
                About
              </Link>
            </li>
            <li>
              <a href="#" className="text-2xl text-black flex items-center ">
                <p>Pages</p>
                <motion.button
                  className="flex items-center"
                  onClick={() => {
                    setLargeNav(!largeNav);
                    setMiniNav(!setMiniNav);
                  }}
                  whileHover={{ scale: 1.25 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {!largeNav ? <IoIosArrowDown /> : <IoIosArrowUp />}
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

        {largeNav && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 0.3,
              ease: "easeIn",
            }}
            className="flex w-[350px] h-[300px] absolute top-[100px] right-[350px] lg:right-[400px] xl:right-[540px] z-[9999] bg-white px-10 rounded-lg border shadow-lg"
          >
            <div className="grid grid-cols-2 gap-9 p-4">
              <ul className=" flex flex-col gap-9">
                <Link to="/" className="mininav">
                  Home
                </Link>
                <Link to="/about" className="mininav">
                  About
                </Link>
                <Link to="/albums" className="mininav">
                  Albums
                </Link>
              </ul>
              <ul className="flex flex-col gap-9">
                <Link to="/events" className="mininav">
                  Events
                </Link>
                <Link to="/shop" className=" mininav">
                  Shop
                </Link>
                <Link to="/contacts" className="mininav">
                  Contacts
                </Link>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default HomeHeader;
