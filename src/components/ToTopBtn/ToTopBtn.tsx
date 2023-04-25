import React, { useState } from 'react';

const ToTopBtn = () => {
  // sets location as the current path
  const location = window.location.pathname;
  // Holds the current scroll Y number
  const [scrollY, setScrollY] = useState(0);
  console.log(scrollY);
  window.addEventListener('scroll', () => {
    setScrollY(window.scrollY);
  });

  if (scrollY >= 1200) {
    return (
      <button
        type="button"
        className="fixed right-0 bottom-[100px] w-[50px] h-[50px] rounded-xl bg-blue-400"
      >
        To TOP
      </button>
    );
  }
  return null;
};

export default ToTopBtn;
