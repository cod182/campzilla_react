import Logo from '../../assets/images/logo.png';

import { ImCross } from 'react-icons/im';

const SideNavBar = ({
  mobileMenu,
  handleSideBar,
}: {
  mobileMenu: any;
  handleSideBar: any;
}) => {
  return (
    <nav
      className={`w-full bg-[#a3a3a3] transition-all ease-in-out duration-500 absolute left-0 top-0 overflow-hidden z-[999] ${
        mobileMenu ? 'h-screen' : 'h-0'
      }`}
    >
      <div className="h-auto p-6 w-full flex ">
        <a
          href="#about"
          className="text-[50px] hover:text-[#49e940] transition-all ease-in-out duration-300"
          onClick={(e) => {
            e.preventDefault();
            handleSideBar();
          }}
        >
          <ImCross />
        </a>
      </div>
      <div className="flex flex-col justify-between items-center px-5">
        <a
          href="/"
          className="text-[50px] py-5 hover:text-[#49e940] transition-all ease-in-out duration-300 hover:bg-slate-600 w-full text-center rounded-full"
          onClick={(e) => {
            handleSideBar();
          }}
        >
          HOME
        </a>
        <a
          href="/#about"
          className="text-[50px] py-5 hover:text-[#49e940] transition-all ease-in-out duration-300 hover:bg-slate-600 w-full text-center rounded-full"
          onClick={(e) => {
            handleSideBar();
          }}
        >
          ABOUT
        </a>
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            handleSideBar();
          }}
          className="text-[50px] py-5 hover:text-[#49e940] transition-all ease-in-out duration-300 hover:bg-slate-600 w-full text-center rounded-full"
        >
          CONTACT
        </a>
        <a
          href="/"
          className="text-[50px] py-5 hover:text-[#49e940] transition-all ease-in-out duration-300 hover:bg-slate-600 w-full text-center rounded-full"
          onClick={(e) => {
            handleSideBar();
          }}
        >
          RESET SEARCH
        </a>
      </div>
      <div className="flex items-center mx-auto">
        <img
          src={Logo}
          alt="CampZilla"
          className="max-h-[120px] w-auto mx-auto"
        />
      </div>
    </nav>
  );
};

export default SideNavBar;
