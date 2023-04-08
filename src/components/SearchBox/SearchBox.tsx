import { useState } from 'react';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { TbLocation, TbLocationFilled } from 'react-icons/tb';

const SearchBox = ({
  searchRun,
  searchStart,
}: {
  searchRun: boolean;
  searchStart: any;
}) => {
  const [locationHover, setLocationHover] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [noSearchError, setNoSearchError] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!searchQuery) {
      setNoSearchError(true);
    } else {
      searchStart();
      console.log(searchQuery);
    }
  };

  return (
    <div
      className={`w-screen bg-white flex flex-row items-center justify-center ${
        searchRun ? 'h-[200px]' : 'h-[400px]'
      }`}
    >
      <div className="w-[50%] h-full flex justify-center items-center relative">
        <form
          className="relative w-full h-[50px] mx-auto"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className={`border-2 rounded-3xl absolute text-center capitalize h-full w-full px-[42px] ${
              noSearchError ? 'border-[#f00]' : 'border-black'
            }`}
            type="text"
            placeholder="WHERE ARE WE GOING?"
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-[12px] top-[11px] text-[30px]"
          >
            <RxMagnifyingGlass />
          </button>
        </form>
        <button
          onMouseEnter={() => setLocationHover(true)}
          onMouseLeave={() => setLocationHover(false)}
          onClick={(e) => {
            e.preventDefault();
          }}
          type="submit"
          className="absolute left-[12px] top-[17px] text-[20px] z-[2] transition-all ease-in-out duration-600"
        >
          {locationHover ? <TbLocationFilled /> : <TbLocation />}
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
