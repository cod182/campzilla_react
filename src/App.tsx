import { useState, useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { Home } from './routes/index';
import { Header, SideNavBar, ToTopBtn, Footer } from './components/index';
import useWindowDimensions from './utils/useWindowDimensions';

import './App.css';

function App() {
  const [mobile, setmobile] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

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

  return (
    <div className="scroll-smooth">
      <ToTopBtn />
      {mobile && (
        <SideNavBar handleSideBar={handleSideBar} mobileMenu={mobileMenu} />
      )}
      <Header mobile={mobile} handleSideBar={handleSideBar} />
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
