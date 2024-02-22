import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";
import { useRef } from "react";

const HomeLink = ({ item: { heading, subHeading, imgSrc } }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
//  const top = useTransform(y, [ ], ['40%, 60%'])
  // const left = useTransform(y, [0.5, -0.5], ['40%, 60%'])


  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect(); //rectangle of the div containing the links
    const rectWidth = rect.width;
    const rectHeight = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPercent = mouseX / rectWidth - 0.5;
    const yPercent = mouseY / rectHeight - 0.5;
    x.set(xPercent);
    y.set(yPercent);
  };
  return (
    <motion.div
    initial={{opacity:0}}
    whileInView={{opacity:1}}
    transition={{
      delay:0.8
    }}
    className="w-full">
    <Link>
      <motion.div
        ref={ref}
        
        onMouseMove={handleMouseMove}
        initial="initial"
        whileHover="whileHover"
        className=" w-full p-3 rounded-md group relative flex items-center justify-between border-b-2 border-neutral-400 py-4 transition-colors duration-500 md:py-8 hover:border-neutral-50"
      >
        <div>
          <motion.span
            initial={{
              x: 0,
            }}
            whileHover={{
              x: -10,
            }}
            transition={{
              type: "spring",
              duration: 0.5,
              delayChildren: 0.25,
              staggerChildren: 0.075,
            }}
            className="explore-link text-5xl md:text-6xl font-bold "
          >
            {heading.split("").map((c, idx) => (
              <motion.span
                key={idx}
                initial={{
                  opacity: 1,
                }}
                whileHover={{
                  opacity: [0, 1, 0, 1],
                }}
                transition={{ type: "spring" }}
                className="inline-block"
              >
                {c}
              </motion.span>
            ))}
          </motion.span>
          <span className="explore-link text-2xl">{subHeading}</span>
        </div>
        <motion.img
          variants={{
            initial: {
              rotate: "-12.5deg",
              scale: 0,
            },
            whileHover: {
              rotate: "12.5deg",
              scale: 1,
            },
          }}
          transition={{ type: "spring" }}
          style={{
            top:'50%',
            left:"50%",
            translateX: "-50%",
            translateY: "-50%",
          }}
          src={imgSrc}
          alt={`image of ${heading}`}
          className="absolute z-0 h-20 w-32 rounded-lg object-cover md:h-40 md:w-64 "
        />
        <motion.div
          variants={{
            initial: {
              x: "9%",
              opacity: 0,
            },
            whileHover: {
              opacity: 1,
              x: 0,
            },
          }}
          transition={{
            type: "spring",
          }}
          className="relative z-10 p-5"
        >
          <FiArrowRight className="text-5xl text-neutral-50" />
        </motion.div>
      </motion.div>
    </Link>
    </motion.div>
  );
};

export default HomeLink;
