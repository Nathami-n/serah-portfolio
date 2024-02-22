import VideoCard from "../Player/VideoCard";
import { useState } from "react";
import { data } from "../../utils/data";
import ReactPlayer from "react-player";

const VideoFeeds = ({ videoUrl }) => {
  const [videoData, setVideoData] = useState(data);
  return (
    <div className=" md:gap-4 md:p-5 max-md:flex max-md:flex-wrap max-md:justify-center max-md:m-20 max-sm:w-[400px] md:grid md:grid-cols-4 lg:grid-cols-4  xl:grid-cols-5 shadow-lg shadow-slate-600 rounded-lg border border-[#5f1803] bg-[#0e0401]  overflow-y-scroll">
      <div className=" col-span-3 row-span-2 xl:col-span-4 max-md:fixed max-md:top-0 max-md:w-full max-md:h-[400px] max-md:z-[89]">
        <div className="w-full h-full">
          <ReactPlayer url={videoUrl} width="100%" height="100%" />
        </div>
      </div>

      {videoData?.map((video, idx) => {
        return <VideoCard key={idx} video={video} />;
      })}
    </div>
  );
};

export default VideoFeeds;
