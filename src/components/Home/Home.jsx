import { HomeHeader, HomeHero, HomeAbout } from "./";

const Home = () => {
  return (
    <main className="min-h-screen font-home text-bodyColor max-w-[1675px] mx-auto">
      <HomeHeader />
      <HomeHero />
      <HomeAbout/>
    </main>
  );
};

export default Home;
