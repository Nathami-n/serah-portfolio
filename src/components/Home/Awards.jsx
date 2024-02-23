import { imgData } from "../../utils/imageData";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Card from "./Card";

const Awards = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], ["-95%", "1%"]);
  return (
    <section
      ref={sectionRef}
      style={{
        position:'relative',
        minHeight:'300%',
        overflowX:'hidden'
      }}
    //   className="relative h-[600vh] overflow-x-hidden"
    >
      <div
      style={{
        position:'sticky',
        top:0,
        display:'flex',
        alignItems:'center',
        overflow:'hidden',
        minHeight:'100%'
      }}
    //    className=" sticky top-0 flex h-[100vh] items-center overflow-hidden" 
    >
        <motion.div style={{x}} className="flex gap-9">
          {imgData.map((img, i) => {
            return <Card img={img} key={i} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Awards;
