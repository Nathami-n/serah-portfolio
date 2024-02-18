import { motion } from "framer-motion";
import { useState } from "react";
import VideoModal from "./VideoModal";

const VideoCard = ({ video: { imgUrl, videoUrl, title, id } }) => {
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
            scale: 1.025,
            transition: {
              duration: 0.2,
            },
          }}
          src={imgUrl}
          className="object-contain w-full transition-all image-full cursor-pointer bg-base-100"
        />
      </div>
      <div className="flex justify-between items-center bg-gray-100">
        <p className="font-bold">{title}</p>
        <button onClick={()=>setOpenModal(!openModal)} className="btn btn-link text-lg">Listen</button>
      </div>
      {openModal && (
        <VideoModal
          title={title}
          image={imgUrl}
          openModal={openModal}
          setOpenModal={setOpenModal}
          id={id}
        />
      )}
    </div>
  );
};

export default VideoCard;
