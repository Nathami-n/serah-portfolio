import {
  CiHeadphones,
  CiHome,
  CiMail,
  CiMusicNote1,
  CiShoppingCart,
  CiUser,
} from "react-icons/ci";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className="md:hidden fixed top-0 bg-primary w-full p-3 z-[99]">
        {" "}
        <CiHeadphones className="navicon" />
        <span className="text-white font-mono font-extrabold ml-5">
          My Tunes
        </span>
      </div>
      <div className=" md:hidden fixed bottom-0 z-[99] w-full p-3  bg-primary rounded-lg max-sm:px-6">
        <div>
          <ul className="flex items-center  justify-evenly gap-5">
            <li>
              <Link className="navlink" to="/">
                <CiHome className="navicon" />
              </Link>
            </li>
            <li>
              <Link to="/albums" className="navlink">
                <CiMusicNote1 className="navicon" />
              </Link>
            </li>
            <li>
              <Link to="/shop" className="navlink">
                <CiShoppingCart className="navicon" />
              </Link>
            </li>
            <li>
              <Link to="/contact" className="navlink">
                <CiMail className="navicon" />
              </Link>
            </li>
            <li>
              <Link to="/about" className="navlink">
                <CiUser className="navicon" />
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="min-h-screen sticky top-0 bottom-0 md:w-[150px] md:flex flex-col justify-between p-2 items-center hidden bg-primary">
        <div>
          <ul className="w-full px-5 flex flex-col gap-3 mt-4">
            <div className=" shadow-md shadow-slate-600 rounded-lg border border-[#5f1803] w-[80px] p-5 bg-[#0e0401] flex flex-col gap-4 mb-8">
              <li>
                <Link className="navlink" to="/">
                  <CiHome className="navicon" />
                </Link>
              </li>
              <li>
                <Link to="/Albums" className="navlink">
                  <CiMusicNote1 className="navicon" />
                </Link>
              </li>
            </div>
            <div className=" shadow-md shadow-slate-600 rounded-lg border border-[#5f1803] w-[80px] p-5 bg-[#0e0401] flex flex-col gap-[40px] mb-8 h-[300px]">
              <li>
                <Link to="/shop" className="navlink">
                  <CiShoppingCart className="navicon" />
                </Link>
              </li>
              <li>
                <Link path="/contacts" className="navlink">
                  <CiMail className="navicon" />
                </Link>
              </li>
            </div>
          </ul>
        </div>
        <div className="">
          <Link to="/about">
            <CiUser className="navicon" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default Header;
