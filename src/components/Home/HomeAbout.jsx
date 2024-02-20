import { motion } from "framer-motion";
import { linkData } from "../../utils/linkData";
import HomeLink from "./HomeLink";

const HomeAbout = () => {
  return (
    <section className="min-h-screen mt-20 bg-neutral-950 overflow-x-hidden p-5">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="text-center"
      >
        <h1 className="text-white text-home text-6xl">Explore</h1>
      </motion.div>
      {linkData.map((item, idx)=> {
        return (<HomeLink key={idx} item={item}/>)
      })}
    </section>
  );
};

export default HomeAbout;
