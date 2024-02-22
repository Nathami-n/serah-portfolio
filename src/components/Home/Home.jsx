import { HomeHeader, HomeHero, HomeAbout, HomeFooter, HomeInterlude } from "./";

const Home = () => {
  return (
    <main className="min-h-screen font-home text-bodyColor max-w-[1675px] mx-auto bg-white">
      <HomeHeader />
      <HomeHero />
      <HomeAbout />
      <HomeInterlude/>
      <HomeFooter/>

    </main>
  );
};

export default Home;
