import { motion } from "framer-motion";
import { useState } from "react";
import VideoModal from "./VideoModal";

const VideoCard = ({ video: { imgUrl, videoUrl, title, id }, yes }) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <div className="w-[100%] rounded-lg shadow-lg">
      <div className="w-full">
        <motion.img
          layoutId={id}
          onClick={() => setOpenModal(!openModal)}
          whileTap={{
            scale: 0.95,
          }}
          whileHover={{
            scale: 1.005,
            transition: {
              duration: 0.2,
            },
          }}
          src={imgUrl}
          className="object-contain w-full transition-all image-full cursor-pointer bg-base-100 rounded-md"
        />
      </div>
      <div
        onClick={() => setOpenModal(!openModal)}
        className="flex  cursor-pointer justify-between items-center bg-gray-100"
      >
        <p className="font-bold  font-home text-gray-900 text-nowrap">
          {title}
        </p>
      </div>
      {openModal && (
        <VideoModal
          title={title}
          image={imgUrl}
          videoUrl={videoUrl}
          openModal={openModal}
          setOpenModal={setOpenModal}
          id={id}
        />
      )}
    </div>
  );
};

export default VideoCard;
