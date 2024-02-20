import { Link } from "react-router-dom";
import {motion} from 'framer-motion'
import { FiArrowRight } from "react-icons/fi";

const HomeLink = ({ item: { heading, subHeading, imgSrc } }) => {
  return (
    <Link >
      <motion.div className="group relative flex items-center justify-between border-b-2 border-neutral-700 py-4 transition-colors duration-500 md:py-8 hover:border-neutral-50">
      <div>
        <span className="explore-link text-5xl md:text-6xl">{heading}</span>
        <span className="explore-link">{subHeading}</span>
        {/* image here */}
      </div>
      <motion.div 
      className="relative z-10 p-5"

      >
        <FiArrowRight className="text-5xl text-neutral-50" />
      </motion.div>
      </motion.div>
    </Link>
  );
};

export default HomeLink;
