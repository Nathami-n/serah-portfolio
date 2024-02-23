import { useEffect, useState } from "react";
import { Awards } from "./";
import { motion } from "framer-motion";

const HomeInterlude = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating((prevState) => !prevState);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <div className="bg-neutral-950 relative">
      <div className="flex max-sm:h-12 h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          Scroll down
        </span>
      </div>
      <div>
        <Awards />
      </div>

      <div className="flex h-48 items-center justify-center">
        <span className="font-semibold uppercase text-neutral-500">
          <motion.button
            animate={{ y: isAnimating ? [0, 10] : 0 }}
            className="p-5 bg-[#14142b] text-white rounded-full w-[250px] text-3xl hover:bg-gray-100 transition-all hover:shadow-lg hover:text-black hover:duration-300 hover:delay-1 md:mt-4"
            transition={{ duration: 1, yoyo: Infinity }}
          >
            More About me
          </motion.button>
        </span>
      </div>
    </div>
  );
};

export default HomeInterlude;
