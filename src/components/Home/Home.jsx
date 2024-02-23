import { HomeHeader, HomeHero, HomeAbout, HomeFooter, HomeInterlude } from "./";

const Home = () => {
  return (
    <main className="min-h-screen font-home text-bodyColor mx-auto bg-white relative ">
      <HomeHeader />
      <HomeHero />
      <HomeAbout />
      <HomeInterlude/>
      <HomeFooter/>

    </main>
  );
};

export default Home;
