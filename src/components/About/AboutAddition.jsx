import { HomeFooter } from "../Home";

const AboutAddition = () => {
  return (
    <section className=" font-home bg-gray-400/10 mt-[200px] min-h-screen max-w-[1800px]">
      <div className="h-full border-gray-400 border shadow-md shadow-slate-300 rounded-sm">
        <div className="flex max-md:justify-center max-lg:justify-center lg:justify-around p-[20px]">
          <div className="w-[300px] h-[300px] bg-red-300/20">
            <img
              src="/awards/studio.jpg"
              alt="SerahKeImage"
              className="h-full w-full object-fill"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-5xl md:text-7xl font-extrabold font-about text-gray-400">
              SERAH
            </h1>
            <h1 className="text-5xl md:text-7xl font-extrabold font-about text-gray-400">
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
      </div>
      <div className="p-5 pt-8 min-h-[70vh] ">
        <p className="text-2xl break-words">
          She has also previously covered Ndaya by Congolese artist Mpongo Love
          and, most recently, Mario, initially done by Rhumba legend, Franco.
          Her contribution to the music scene has not gone unnoticed. Recently,
          she was awarded a prestigious honorary award at the Regional Business
          Leadership Awards Gala. As Serah KE continues her musical journey, her
          long-term vision is to not only keep people entertained but also to
          serve as a conduit for reconnecting individuals with the timeless
          beauty of African classical music.
        </p>
      </div>
      <HomeFooter />
    </section>
  );
};

export default AboutAddition;
