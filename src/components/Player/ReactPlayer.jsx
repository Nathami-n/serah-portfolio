import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import Hero from "../Hero";
const ReactPlay = ({ children }) => {
  const { videoUrl } = useParams();
  console.log(videoUrl);
  return (
    <div className="flex bg-primary">
      {children}
      <Hero ReactPlayer={ReactPlayer} videoUrl={videoUrl} />
    </div>
  );
};

export default ReactPlay;
