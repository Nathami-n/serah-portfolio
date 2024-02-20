import {motion} from 'framer-motion'
import { Link } from 'react-router-dom';
const HomeHero = () => {
  return (
    <section className="min-h-full mt-20">
      <div className='flex justify-center flex-col items-center gap-10 '>
        <div className="text-center">
          <h1 className="text-2xl text-black">Hello there, I am Serah George </h1>
          <p className="text-[#14142b] text-6xl">I enjoy song and Art</p>
        </div>
        <Link to='/contanct' className='text-4xl'>
            <motion.button className='p-5 bg-[#14142b] text-white rounded-full w-[250px] hover:bg-gray-100 transition-all hover:shadow-lg hover:text-black' whileHover={{backgroundColor:'', y:-2}} transition={{duration:0.2}}>
                Reach Me
            </motion.button>
        </Link>
      </div>
    </section>
  );
};

export default HomeHero;
