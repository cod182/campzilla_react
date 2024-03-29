import Logo from '../../assets/images/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';

const Header = ({
  mobile,
  handleSideBar,
  handleContact,
}: {
  mobile: boolean;
  handleSideBar: any;
  handleContact: any;
}) => {
  return (
    <header
      className={`flex flex-col justify-center mx-auto w-full h-[150px] bg-slate-500 py-10 transition-all ease-in-out duration-300 bg-head-img ${
        !mobile && 'items-center'
      }`}
    >
      <div
        className={`max-w-6xl flex flex-row ${
          mobile
            ? 'justify-between items-center px-6'
            : 'justify-center items-center'
        }`}
      >
        {!mobile && (
          <div className="flex flex-col justify-center items-center mr-8">
            <button
              onClick={() => {
                document!
                  .getElementById('about')!
                  .scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-xl p-2 bg-white rounded-full min-w-[100px] text-center hover:bg-[#63e31e] transition-all ease-in-out duration-300"
            >
              About
            </button>
          </div>
        )}
        {mobile && (
          <div>
            <button
              onClick={(e) => {
                e.preventDefault();
                handleSideBar();
              }}
              className="text-[50px] hover:text-[#49e940] transition-all ease-in-out duration-300"
            >
              <GiHamburgerMenu />
            </button>
          </div>
        )}
        <div>
          <a href="/">
            <img
              src={Logo}
              alt="CampZilla"
              className="max-h-[120px] w-auto hover:drop-shadow-xl	hover:hue-rotate-30	"
            />
          </a>
        </div>

        {!mobile && (
          <div className="flex flex-col justify-center items-center ml-8">
            <button
              onClick={() => handleContact()}
              className="text-xl p-2 bg-white rounded-full min-w-[100px] text-center hover:bg-[#63e31e] transition-all ease-in-out duration-300"
            >
              Contact
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
