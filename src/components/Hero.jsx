import VideoFeeds from "./VideoFeeds";

const Hero = ({videoUrl}) => {
  return (
    <div className="bg-primary">
      <VideoFeeds videoUrl={videoUrl}/>
    </div>
  );
};

export default Hero;
