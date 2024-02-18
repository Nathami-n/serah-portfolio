import VideoCard from "./VideoCard";
import { getSerahData } from "../utils/fetchData";
import { useEffect, useState } from "react";

const VideoFeeds = () => {
  const [videoData, setVideoData] = useState([]);
  useEffect(() => {
    getSerahData()
    .then(data=> {
        setVideoData(data);
    })
    .catch(e=> {
        console.error(e.message);
    })
  }, []);
  return (
    <div className="grid grid-cols-3 gap-1">
     {videoData.items?.map((video, idx)=> {
        return <VideoCard key={idx} video={video}/>
     })}
    </div>
  );
};

export default VideoFeeds;
