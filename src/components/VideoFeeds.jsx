import VideoCard from "./VideoCard";
import { useState } from "react";
import { data } from "../utils/data";

const VideoFeeds = () => {
  const [videoData, setVideoData] = useState(data);
  return (
    <>
      
      <div className=" md:gap-4 p-20 md:p-5 flex flex-wrap md:grid md:grid-cols-2 lg:grid-cols-3 shadow-lg shadow-slate-600 rounded-lg border border-[#5f1803] bg-[#0e0401]  md:h-[90vh] md:overflow-y-scroll">
        {/* <div className=" hidden md:block md:col-span-2 row-span-2 bg-blue-400 rounded-lg shadow-lg">hell</div> */}
        {videoData?.map((video, idx) => {
          return <VideoCard key={idx} video={video} />;
        })}
      </div>
    </>
  );
};

export default VideoFeeds;
