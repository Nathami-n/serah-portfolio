import VideoFeeds from "./VideoFeeds"


const Hero = () => {
  return (
    <div className="p-3 overflow-auto w-full bg-white flex flex-col">
        <div className="w-[600px] absolute top-0 x-1">
            <h1 className="text-xl font-extrabold font-serif text- ">SeraKe.</h1>
        </div>
        <div className="mt-5 h-full p-5">
        <VideoFeeds/>
        </div>
    </div>
  )
}

export default Hero