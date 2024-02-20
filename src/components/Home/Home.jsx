import { HomeHeader, HomeHero } from "./";

const Home = () => {
  return (
    <main className="min-h-screen font-home text-bodyColor max-w-6xl mx-auto">
      <HomeHeader />
      <HomeHero />
    </main>
  );
};

export default Home;
