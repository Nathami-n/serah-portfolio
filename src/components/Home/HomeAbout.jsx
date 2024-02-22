import { motion } from "framer-motion";
import { linkData } from "../../utils/linkData";
import HomeLink from "./HomeLink";

const HomeAbout = () => {
  return (
    <section className="min-h-screen mt-20 overflow-hidden p-9 bg-neutral-950 ">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 0.5, type: "spring" }}
        className="text-center"
      >
        <h1 className=" text-home text-6xl text-white mb-5">Explore</h1>
      </motion.div>
      {linkData.map((item, idx)=> {
        return (<HomeLink key={idx} item={item}/>)
      })}
    </section>
  );
};

export default HomeAbout;
