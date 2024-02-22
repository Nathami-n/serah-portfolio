const HomeInterlude = () => {
  return (
    <section className="min-h-screen w-full mt-5">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-black flex flex-col items-center">
          Awards{" "}
          <div className="w-40 bg-neutral-950 h-[0.9px] hover:bg-neutral-200"></div>
        </h1>
      </div>
      <div className="w-full flex  flex-col items-center justify-center md:justify-around md:flex-row md:items-center mt-20">
        <div>
          <h1 className="font-extrabold text-2xl text-black font-mono text-nowrap mb-9">
            Recent Award
          </h1>
        </div>
        <div className="border h-[200px] w-[200px] rounded-lg hover:shadow-gray-500 shadow-md shadow-gray-200 hover:scale-105 transtion-all">
          <a href="3" target="_blank">
            {" "}
            <img src="" alt="Serah and Kalonzo" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HomeInterlude;
