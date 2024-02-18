import { CiBank, CiMail, CiMusicNote1, CiPassport1} from "react-icons/ci";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div className="min-h-screen md:w-[200px]">
      <div>
        <ul className="w-full px-5 flex flex-col gap-3 mt-4">
          <li>
            <Link className="navlink" path="/">
              <CiBank className="navicon" />
              <span className="navspan">
                Home
              </span>
            </Link>
          </li>
          <li>
            <Link path="/" className="navlink">
              <CiMusicNote1 className="navicon" />
              <span className="navspan">Tracks</span>
            </Link>
          </li>
          <li>
            <Link path="/" className="navlink">
              <CiPassport1 className="navicon" />
              <span className="navspan">About</span>
            </Link>
          </li>
          <li>
            <Link path="/" className="navlink">
              <CiMail className="navicon" />
              <span className="navspan">Reach Me</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
