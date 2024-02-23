import { HomeHeader, HomeHero, HomeAbout, HomeFooter, HomeInterlude } from "./";

const Home = () => {
  return (
    <main className="min-h-screen w-full font-home text-bodyColor relative overflow-clip">
      <HomeHeader />
      <HomeHero />
      <HomeAbout />
      <HomeInterlude/>
      <HomeFooter/>

    </main>
  );
};

export default Home;
