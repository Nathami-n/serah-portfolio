import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { motion } from "framer-motion";
import { useState } from "react";
import { Link } from "react-router-dom";
const HomeHeader = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const handleOpen = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <nav className="w-full">
      {/* small nav */}
      <div className="flex justify-between p-3 z-[99]">
        <div>
          <div className="flex items-center gap-2">
            <img
              src='/serahemoji.png'
              className="w-14 object-contain"
              alt="SerahKe Logo"
            />
            <h1 className="text-3xl font-semibold">SerahKe<span className="font-extrabold text-2xl ">.</span></h1>
          </div>
        </div>
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
          className=" absolute  left-0 top-0 w-[100vw] border-b-1 rounded-md shadow-md z-[999]"
          animate={{ y: isNavOpen ? 100 : -300, opacity: isNavOpen ? 1 : 0 }}
          transition={{ duration: 0.3, type: "spring" }}
        >
          <div>
            <ul className="flex flex-col p-3">
              <li>
                <Link to="/" className="text-4xl">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/albums" className="text-4xl">
                  Albums
                </Link>
              </li>
              <li>
                <Link to="/About" className="text-4xl">
                  About
                </Link>
              </li>
              <li>
               <a className="text-4xl">Pages</a>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>
      {/* big nav */}
    </nav>
  );
};

export default HomeHeader;
