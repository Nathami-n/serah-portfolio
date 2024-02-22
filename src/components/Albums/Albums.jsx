import { Hero } from "..";
const Albums = ({ children }) => {
  return (
    <>
      <div className="flex justify-center  bg-primary overflow-y-clip max-sm:overflow-x-hidden">
        {children}
        <Hero />
      </div>
    </>
  );
};

export default Albums;
