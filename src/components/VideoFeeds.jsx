import VideoCard from "./VideoCard";
import { useState } from "react";
import { data } from "../utils/data";

const VideoFeeds = () => {
  const [videoData, setVideoData] = useState(data);
  return (
    <>
      
      <div className="grid md:grid-cols-3 md:gap-4 p-9">
        <div className=" hidden md:block md:col-span-2 row-span-2 bg-blue-400 rounded-lg shadow-lg">hell</div>
        {videoData?.map((video, idx) => {
          return <VideoCard key={idx} video={video} />;
        })}
      </div>
    </>
  );
};

export default VideoFeeds;
