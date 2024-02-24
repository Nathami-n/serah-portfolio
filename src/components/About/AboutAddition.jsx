import { HomeFooter } from "../Home";

const AboutAddition = () => {
  return (
    <section className=" font-home mt-9 ">
      <div className="h-full">
        <div className="bg-red-400 flex">
          <div className="w-[300px] h-[300px]">
            <img
              src="/awards/studio.jpg"
              alt="SerahKeImage"
              className="h-full w-full object-contain"
            />
          </div>
          <div className="flex flex-col justify-center items-center">
            <h1 className="text-7xl font-extrabold font-about">SERAH</h1>
            <h1 className="text-7xl font-about font-extrabold">KE</h1>
          </div>
        </div>
        <div className="text-center bg-pink-400 p-4">
          <p className="text-2xl ">Harmonizing Passions:</p>
          <p className="text-2xl">
            The SerahKe Story-A journey through Music, Medicine and MotherHood
          </p>
        </div>

        <div className="p-5">
          <p className="text-2xl break-words">
            She has also previously covered Ndaya by Congolese artist Mpongo
            Love and, most recently, Mario, initially done by Rhumba legend,
            Franco. Her contribution to the music scene has not gone unnoticed.
            Recently, she was awarded a prestigious honorary award at the
            Regional Business Leadership Awards Gala. As Serah KE continues her
            musical journey, her long-term vision is to not only keep people
            entertained but also to serve as a conduit for reconnecting
            individuals with the timeless beauty of African classical music.
          </p>
        </div>
      </div>
      <HomeFooter/>
    </section>
  );
};

export default AboutAddition;
