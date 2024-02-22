import VideoFeeds from "./Home/VideoFeeds";

const Hero = ({ videoUrl }) => {
  return (
    <div className="bg-primary">
      <VideoFeeds videoUrl={videoUrl} />
    </div>
  );
};

export default Hero;
