import { useState, useEffect } from 'react';

import { Routes, Route, Navigate } from 'react-router-dom';

import { Home } from './routes/index';
import { Header, SideNavBar } from './components/index';
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
    <body className="bg-bg-main bg-cover bg-fixed bg-no-repeat">
      {mobile && (
        <SideNavBar handleSideBar={handleSideBar} mobileMenu={mobileMenu} />
      )}
      <Header mobile={mobile} handleSideBar={handleSideBar} />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </body>
  );
}

export default App;
