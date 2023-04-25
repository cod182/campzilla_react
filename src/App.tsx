import { useState, useEffect } from 'react';

import { Routes, Route } from 'react-router-dom';

import { Home } from './routes/index';
import {
  Header,
  SideNavBar,
  ToTopBtn,
  Footer,
  Contact,
} from './components/index';
import useWindowDimensions from './utils/useWindowDimensions';

import './App.css';

function App() {
  const [mobile, setmobile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [contactModal, setcontactModal] = useState(false);

  const { width } = useWindowDimensions();

  useEffect(() => {
    if (width <= 450) {
      setmobile(true);
    } else {
      setmobile(false);
    }
  }, [width]);

  const handleSideBar = () => {
    mobileMenu ? setMobileMenu(false) : setMobileMenu(true);
  };

  const handleContact = () => {
    contactModal ? setcontactModal(false) : setcontactModal(true);
  };

  return (
    <div className="scroll-smooth relative">
      <div
        className={`w-full bg-slate-500 bg-opacity-[0.4] fixed z-[9999] rounded-xl ease-in-out transition-all duration-1000 pointer-cursor flex flex-col justify-center items-center ${
          contactModal ? 'top-[0] h-full' : 'top-[-100vh] h-0'
        }`}
      >
        <Contact handleContact={handleContact} />
      </div>

      <ToTopBtn />
      {mobile && (
        <SideNavBar
          handleContact={handleContact}
          handleSideBar={handleSideBar}
          mobileMenu={mobileMenu}
        />
      )}
      <Header
        mobile={mobile}
        handleSideBar={handleSideBar}
        handleContact={handleContact}
      />
      <div className="bg-bg-main bg-cover bg-fixed bg-no-repeat min-h-[90vh] pb-[100px]">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
