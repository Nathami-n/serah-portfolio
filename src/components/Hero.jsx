import VideoFeeds from "./Home/VideoFeeds";

const Hero = ({ videoUrl }) => {
  return (
    <div className="bg-primary overflow-x-hidden">
      <VideoFeeds videoUrl={videoUrl} />
    </div>
  );
};

export default Hero;
