import { useEffect, useState } from "react";
import { HomeHeader } from "../Home";
import AboutAddition from "./AboutAddition";
import { motion } from "framer-motion";
import { HiOutlineBookOpen } from "react-icons/hi";
import { Blurhash } from "react-blurhash";
const About = () => {
  const [openBlog, setOpenBlog] = useState(false);
  const [loaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      setIsLoaded(true);
    };
    img.src = "/awards/sit.JPG";
  }, []);
  const handleClick = () => {
    setOpenBlog(!openBlog);
  };
  return (
    <section className=" font-home bg-gray-400/10 relative ">
      <HomeHeader />
      {openBlog && (
        <motion.div
          animate={{
            x: openBlog ? 1000 : -1000,
          }}
          className="fixed top-[60%]   p-4 -left-[1000px] z-[999] bg-white  rounded-lg "
        >
          <div className="p-6 flex flex-col items-center">
            <h1 className="text-2xl text-blue-400 mb-5">Blogs</h1>
            <ul className="flex flex-col gap-3 items-center">
              <li>
                <a
                  className="text-lg hover:border-b-2 border-blue-800 transition-all"
                  target="_blank"
                  href="https://www.tuko.co.ke/people/527742-fast-rising-zilizopendwa-cover-artiste-receives-prestigious-honorary-award/ "
                >
                  Honorary Award
                </a>
              </li>

              <li>
                <a
                  className="text-xl hover:border-b-2 border-blue-800 transition-all"
                  target="_blank"
                  href="https://nation.africa/kenya/life-and-style/dn2/-meet-the-medical-student-who-has-found-fame-as-rhumba-singer--4531190 "
                >
                  Ntv Feature
                </a>
              </li>
              <li>
                <a
                  className="text-xl hover:border-b-2 border-blue-800 transition-all"
                  target="_blank"
                  href="https://whownskenya.com/recognising-serah-nyaboke-nyamira-based-songbird-delivering-masterpieces-in-rhumba-music-covers/  "
                >
                  Who Owns Kenya
                </a>
              </li>
              <li>
                <a
                  className="text-xl hover:border-b-2 border-blue-800 transition-all"
                  target="_blank"
                  href="https://www.ghafla.com/ke/talented-queen-of-zilizopendwa-serah-george-honored-by-fred-obachi-machokaavideo/ "
                >
                  Fred Machoka Honor
                </a>
              </li>
            </ul>
          </div>
        </motion.div>
      )}
      <div onClick={handleClick} className="fixed top-[70%] right-0">
        <button>
          <HiOutlineBookOpen className="text-5xl text-white rounded-full p-1 bg-green-300 transition-all hover:bg-red-300 hover:scale-105" />
        </button>
      </div>
      <div className="h-full ">
        <div className=" flex max-md:justify-center max-lg:justify-center lg:justify-around">
          <div className="w-[300px] h-[300px] bg-red-300/20">
            {!loaded ? (
              <Blurhash
                width={300}
                height={300}
                hash="LSK0y+xX};x^_MofwuX8x[kDVsad"
                punch={1}
              />
            ) : (
              <img
                src="/awards/sit.JPG"
                alt="SerahKeImage"
                className="h-full w-full object-cover"
              />
            )}
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl md:text-7xl font-extrabold font-about text-gray-400">
              SERAH
            </h1>
            <h1 className="text-5xl  md:text-7xl font-about font-extrabold text-gray-400 ">
              KE
            </h1>
          </div>
        </div>
        <div className="text-center bg-[#Be5b25]/40 p-4">
          <p className="text-2xl ">Harmonizing Passions:</p>
          <p className="text-2xl">
            The SerahKe Story-A journey through Music, Medicine and MotherHood
          </p>
        </div>

        <div className="p-5 mb-[200px]">
          <p className="text-2xl break-words">
            With a passion for preserving the rich heritage of African music,
            Serah, under Serah KE Music, specializes in covering timeless
            classics, particularly in genres like Zilizopendwa and Rhumba. Serah
            discovered her musical talent at the tender age of three while
            singing with the local church choir. Her musical journey is not just
            about rendering these classics but infusing them with a contemporary
            touch and paying homage to the legendary sounds of the past. Beyond
            her musical pursuits, Serah is a dedicated medical student and holds
            a Bachelor &apos;s degree in Education Science (maths , physics) Her
            decision to cover African classicals is deeply rooted in the
            nostalgic memories these songs evoke, and she aspires to keep the
            flame of these classics alive by entertaining audiences and sparking
            cherished recollections. Key among her hit songs include her
            rendition of Charonyi Ni Wasi, initially done by the Maroon
            Commandos, and Afro, done by Les Wanyika
          </p>
        </div>
      </div>
      <AboutAddition />
    </section>
  );
};

export default About;
