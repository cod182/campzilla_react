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
      className={`w-full bg-[#a3a3a3] transition-all ease-in-out duration-500 absolute left-0 top-0 overflow-hidden ${
        mobileMenu ? 'h-0' : 'h-screen'
      }`}
    >
      <ImCross
        onClick={(e) => {
          e.preventDefault();
          handleSideBar();
        }}
      />
    </nav>
  );
};

export default SideNavBar;
