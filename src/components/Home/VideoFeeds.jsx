import VideoCard from "../Player/VideoCard";
import { useEffect, useState } from "react";
import { data } from "../../utils/data";
import ReactPlayer from "react-player";

const VideoFeeds = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState(data);
  const [showdraggable, setShowDraggable] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setShowDraggable(window.innerWidth <= 577);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    videoUrl ? (
    <div className=" md:gap-4 md:p-5 max-md:flex  max-lg:mt-10 max-md:flex-wrap max-md:justify-center max-md:m-20 max-sm:w-[400px] md:grid md:grid-cols-4 lg:grid-cols-4  xl:grid-cols-5 shadow-lg shadow-slate-600 rounded-lg border border-[#5f1803] bg-[#0e0401]  overflow-y-scroll max-sm:p-9 max-sm:gap-5 max-sm:overflow-x-hidden">
      <div className=" col-span-3 row-span-2 xl:col-span-4 ">
        <div className="w-full h-full max-sm:rounded-full">
          <ReactPlayer url={videoUrl} width="100%" height="100%" />
        </div>
      </div>

      {videoData?.map((video, idx) => {
        return <VideoCard key={idx} video={video} />;
      })}
    </div>)
    : (
      <div className=" md:gap-4  max-lg:grid max-lg:grid-cols-2  lg:grid lg:grid-cols-3 max-lg:mt-12 md:p-5 max-md:flex max-md:flex-wrap max-md:justify-center max-md:m-20 max-sm:w-[400px] shadow-lg shadow-slate-600 rounded-lg border border-[#5f1803] bg-[#0e0401]  overflow-y-scroll max-sm:p-9 max-sm:gap-5 max-sm:overflow-x-hidden">
      {videoData?.map((video, idx) => {
        return <VideoCard key={idx} video={video} />;
      })}
    </div>
    )
  );
};

export default VideoFeeds;
