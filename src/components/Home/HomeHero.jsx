import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const HomeHero = () => {
  const [isAnimating, setIsAnimating] = useState(true);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating((prevState) => !prevState);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  return (
    <section className="min-h-screen mt-20 md:mt-5 w-full">
      <div className=" w-full flex justify-between  max-lg:flex-col items-center max-lg:mt-20">
        <div className="text-center flex flex-col gap-2 items-center justify-center md:w-[600px]">
          <h1 className="text-3xl text-black">This is Serah Ke </h1>
          <p className="text-[#14142b] text-6xl md:text-wrap">Bringing to life African <span className="inline-block mt-4">Classical Music</span></p>
          <Link to="/contanct" className="text-4xl my-8">
            <motion.button
              animate={{ y: isAnimating ? [0, 10] : 0 }}
              className="p-5 bg-[#14142b] text-white rounded-full w-[250px] hover:bg-gray-100 transition-all hover:shadow-lg hover:text-black hover:duration-300 hover:delay-1 md:mt-4"
              transition={{ duration: 1, yoyo: Infinity }}
            >
              Reach Me
            </motion.button>
          </Link>
        </div>
        <div className="p-4 w-[400px] ml-5 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
            className="rounded-full bg-blue-300 border   max-md:left-1 max-md:w-[400px] max-md:h-[400px] max-sm:h-[350px]  max-sm:w-[350px] absolute z-0 top-[160px] right-12 md:w-[350px] md:h-[350px] md:top-[100px]  "
          />
          <motion.img
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              delay: 0.6,
              duration: 0.25,
            }}
            src="/serah-bg-1.png"
            alt="serah image"
            className="w-full object-contain relative"
          />
        </div>
      </div>
     
    </section>
  );
};

export default HomeHero;
