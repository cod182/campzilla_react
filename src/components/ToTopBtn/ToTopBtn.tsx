import { useState } from 'react';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

const ToTopBtn = () => {
  // Holds the current scroll Y number
  const [scrollY, setScrollY] = useState(0);
  window.addEventListener('scroll', () => {
    setScrollY(window.scrollY);
  });

  if (scrollY >= 1200) {
    return (
      <button
        type="button"
        onClick={() => {
          window.scrollTo({
            top: 0,
            behavior: 'smooth',
          });
        }}
        className="scroll-smooth z-[999] fixed right-0 bottom-[100px] w-[50px] h-[50px] rounded-xl opacity-[0.8] bg-blue-400 hover:bg-blue-500 hover:text-white text-xl flex justify-center items-center ease-in-out transition-all duration-500"
        style={{
          backdropFilter: 'blur(1px)',
          boxShadow: 'inset gray 0px -7px 12px',
        }}
      >
        <BsFillArrowUpCircleFill />
      </button>
    );
  }
  return null;
};

export default ToTopBtn;
