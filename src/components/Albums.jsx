import { Hero } from "./";
const Albums = ({ children }) => {
  return (
    <>
   <div className="flex justify-center  bg-primary overflow-y-clip">
   {children}
      <Hero/>
   </div>
    </>
  );
};

export default Albums;
