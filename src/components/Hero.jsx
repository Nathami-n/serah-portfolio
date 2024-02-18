import { CiMenuBurger } from "react-icons/ci"
import VideoFeeds from "./VideoFeeds"


const Hero = () => {
  return (
    <div className="p-3 overflow-auto w-full bg-white flex flex-col">
        <div className="w-full absolute top-0 right-1 p-2 x-1 flex justify-between md:hidden">
            <h1 className="text-xl font-extrabold font-serif text- ">SeraKe.</h1>
            <CiMenuBurger className="text-black text-3xl cursor-pointer md:hidden"/>
        </div>
        <div className="mt-5 h-full sm:p-16 md:p-9">
        <VideoFeeds/>
        </div>
    </div>
  )
}

export default Hero