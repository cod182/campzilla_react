import Logo from '../../assets/images/logo.png';
const Header = () => {
  return (
    <div className="flex flex-col justify-center items-center mx-auto w-full h-[150px] bg-slate-500 py-10 transition-all ease-in-out duration-300">
      <div className="max-w-6xl flex flex-row">
        <a className="text-xl p-2 bg-white rounded-full min-w-[100px] text-center hover:bg-[#63e31e] transition-all ease-in-out duration-300">
          About
        </a>
        <img src={Logo} alt="CampZilla" className="" />
        <a className="text-xl p-2 bg-white rounded-full min-w-[100px] text-center hover:bg-[#63e31e] transition-all ease-in-out duration-300">
          Contact
        </a>
      </div>
    </div>
  );
};

export default Header;
