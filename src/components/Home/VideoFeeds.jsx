import VideoCard from "../Player/VideoCard";
import { useEffect, useState } from "react";
import { data } from "../../utils/data";
import ReactPlayer from "react-player";
import { motion, useMotionValue } from "framer-motion";

const VideoFeeds = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState(data);
  const [showdraggable, setShowDraggable] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      const num = window.innerWidth;
      setShowDraggable(() => num <= 500);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  console.log(showdraggable);
  return videoUrl ? (
    <div className=" md:gap-4 md:p-5 max-md:grid max-md:grid-cols-3 max-sm:flex max-sm:flex-wrap max-lg:mt-10 md:grid md:grid-cols-4 lg:grid-cols-4  xl:grid-cols-5 shadow-lg shadow-slate-600 rounded-lg border border-[#5f1803] bg-[#0e0401]  max-sm:p-2 max-sm:gap-5 max-sm:overflow-x-hidden max-md:w-[80%] max-md:mx-auto max-md:mt-[20%] ">
      {!showdraggable ? (
        <div className=" md:col-span-3  max-md:col-span-2 max-md:row-span-2 md:row-span-2 xl:col-span-4  xl:row-span-3  w-full h-full">
          <div className=" w-full h-full">
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              playing={true}
            />
          </div>
        </div>
      ) : (
        <motion.div
       
          
          className=" text-white w-[350px] h-[200px] top-[40px] z-[9999]"
        >
          < motion.div
             drag 
             dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
          className="w-full h-full">
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              playing={true}
            />
          </motion.div>
        </motion.div>
      )}

      {videoData?.map((video, idx) => {
        return <VideoCard key={idx} video={video} />;
      })}
    </div>
  ) : (
    <div className=" md:gap-4 max-lg:grid max-lg:grid-cols-2 md:pt-12 lg:grid lg:grid-cols-4 max-lg:mt-12 md:p-5 max-md:flex max-sm:mt-16 max-md:flex-wrap max-md:justify-center max-md:m-auto max-sm:w-[80%] shadow-lg shadow-slate-600 rounded-lg border border-[#5f1803] bg-[#0e0401]  max-sm:p-12 max-sm:gap-5 max-sm:overflow-x-hidden max-sm:mx-auto">
      {videoData?.map((video, idx) => {
        return <VideoCard key={idx} video={video} />;
      })}
    </div>
  );
};

export default VideoFeeds;
