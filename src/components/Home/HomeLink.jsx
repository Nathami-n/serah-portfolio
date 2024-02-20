import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";

const HomeLink = ({ item: { heading, subHeading, imgSrc } }) => {
  return (
    <Link>
      <motion.div
        initial="initial"
        whileHover="whileHover"
        className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 md:py-8 hover:border-neutral-50"
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
            className="explore-link text-5xl md:text-6xl"
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
          <span className="explore-link">{subHeading}</span>
          {/* image here */}
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
          style={{
            top: "50%",
            left: "50%",
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
  );
};

export default HomeLink;
