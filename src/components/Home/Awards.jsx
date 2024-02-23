import { imgData } from "../../utils/imageData";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Card from "./Card";

const Awards = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
  });
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);
  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        height: "400vh"
      }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          display: "flex",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <motion.div style={{ x }} className="flex gap-9">
          {imgData.map((img, i) => {
            return <Card img={img} key={i} />;
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default Awards;
