import Logo from '../../assets/images/logo.png';
import BgImg from '../../assets/images/header-banner.png';
const Header = (mobile: boolean) => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto w-full h-[150px] bg-slate-500 py-10 transition-all ease-in-out duration-300 bg-head-img">
      <div className="max-w-6xl flex flex-row">
        {!mobile && (
          <div className="flex flex-col justify-center items-center mr-8">
            <a
              href="#"
              className="text-xl p-2 bg-white rounded-full min-w-[100px] text-center hover:bg-[#63e31e] transition-all ease-in-out duration-300"
            >
              About
            </a>
          </div>
        )}
        <a href="/">
          <img
            src={Logo}
            alt="CampZilla"
            className="max-h-[120px] w-auto hover:drop-shadow-xl	hover:hue-rotate-30	"
          />
        </a>

        {!mobile && (
          <div className="flex flex-col justify-center items-center ml-8">
            <a
              href="#"
              className="text-xl p-2 bg-white rounded-full min-w-[100px] text-center hover:bg-[#63e31e] transition-all ease-in-out duration-300"
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
