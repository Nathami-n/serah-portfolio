import { HomeHeader } from "../Home";
import AboutAddition from "./AboutAddition";

const About = () => {
  return (
    <section className=" font-home bg-gray-400/10">
      <HomeHeader />
      <div className="h-full">
        <div className=" flex max-md:justify-center max-lg:justify-center lg:justify-around">
          <div className="w-[300px] h-[300px] bg-red-300">
            <img
              src="/awards/studio.jpg"
              alt="SerahKeImage"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl md:text-7xl font-extrabold font-about text-gray-400">SERAH</h1>
            <h1 className="text-5xl  md:text-7xl font-about font-extrabold text-gray-400 ">KE</h1>
          </div>
        </div>
        <div className="text-center bg-[#Be5b25]/40 p-4">
          <p className="text-2xl ">Harmonizing Passions:</p>
          <p className="text-2xl">
            The SerahKe Story-A journey through Music, Medicine and MotherHood
          </p>
        </div>

        <div className="p-5">
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
      <AboutAddition/>
    </section>
  );
};

export default About;
