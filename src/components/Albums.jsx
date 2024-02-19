import { Hero } from "./";
const Albums = ({ children }) => {
  return (
    <>
   <div className="flex bg-primary min-h-screen">
   {children}
      <Hero/>
   </div>
    </>
  );
};

export default Albums;
