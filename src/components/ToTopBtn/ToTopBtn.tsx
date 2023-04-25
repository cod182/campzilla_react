import { useState } from 'react';
import { BsFillArrowUpCircleFill } from 'react-icons/bs';

const ToTopBtn = () => {
  // Holds the current scroll Y number
  const [scrollY, setScrollY] = useState(0);
  console.log(scrollY);
  window.addEventListener('scroll', () => {
    setScrollY(window.scrollY);
  });

  if (scrollY >= 1200) {
    return (
      <a
        href="#top"
        className="fixed right-0 bottom-[100px] w-[50px] h-[50px] rounded-xl bg-blue-400 text-xl flex justify-center items-center ease-in-out transition-all duration-500"
      >
        <BsFillArrowUpCircleFill />
      </a>
    );
  }
  return null;
};

export default ToTopBtn;
