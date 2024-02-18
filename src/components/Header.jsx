import { CiBank, CiMail, CiMusicNote1, CiPassport1, CiUser} from "react-icons/ci";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="min-h-screen md:w-[200px] md:flex flex-col justify-between p-2 items-center hidden">
      <div>
        <ul className="w-full px-5 flex flex-col gap-3 mt-4">
          <li>
            <Link className="navlink" to="/">
              <CiBank className="navicon" />
              <span className="navspan">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link to="/Albums" className="navlink">
              <CiMusicNote1 className="navicon" />
              <span className="navspan">Tracks</span>
            </Link>
          </li>
          <li>
            <Link to="/" className="navlink">
              <CiPassport1 className="navicon" />
              <span className="navspan">About</span>
            </Link>
          </li>
          <li>
            <Link path="/" className="navlink">
              <CiMail className="navicon" />
              <span className="navspan">Contact</span>
            </Link>
          </li>
        </ul>
      </div>

      <div className="">
        <Link><CiUser className="navicon"/></Link>
      </div>
    </div>
  );
};

export default Header;
