import { motion } from "framer-motion";
import { Link } from "react-router-dom";
const VideoModal = ({
  image,
  title,
  openModal,
  setOpenModal,
  id,
  videoUrl,
}) => {
  return (
    <div>
      <div
        onClick={() => setOpenModal(!openModal)}
        className="fixed z-[999] top-0 bottom-0 right-0 left-0 bg-black/50 cursor-pointer flex justify-center flex-col items-center px-20"
      >
        <div
          // onClick={(e) => {
          //   e.stopPropagation();
          // }}
          className="flex flex-col justify-center items-center"
        >
          <motion.div layoutId={id} className="w-full">
            <img src={image} className="w-full object-contain" />
          </motion.div>
          <motion.div
            initial={{
              opacity: 0,
              y: 50,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="bg-white p-4 w-full rounded-md"
          >
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
           <Link to={`/video/${encodeURIComponent(videoUrl)}`}> <button className="btn btn-primary btn-block">Play</button></Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
