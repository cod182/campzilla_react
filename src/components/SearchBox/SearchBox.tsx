import { useState } from 'react';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { TbLocation, TbLocationFilled } from 'react-icons/tb';

import './styles.css';

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

  // Called to handle searchbox part of submitting query
  const handleSubmit = (e: any) => {
    e.preventDefault();
    setNoSearchError(false);
    if (!searchQuery) {
      handleSearchError();
      searchStart(false);
    } else {
      // Send search state and query back
      searchStart({ state: true, query: searchQuery });
    }
  };

  const handleSearchError = () => {
    setNoSearchError(true);
    const searchInput = document.getElementById('search-id');
    const searchIcon = document.getElementById('search-icon');

    searchInput?.classList.add('error');
    searchIcon?.classList.add('text-[#ff0101]');

    setTimeout(() => {
      searchInput?.classList.remove('error');
      searchIcon?.classList.remove('text-[#ff0101]');
    }, 2000);
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
            id="search-id"
            className={`border-2 rounded-3xl absolute text-center capitalize h-full w-full px-[42px] transition-all ease-in-out duration-600`}
            type="text"
            placeholder="WHERE ARE WE GOING?"
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{}}
          />
          <button
            id="search-icon"
            type="submit"
            className="absolute right-[12px] top-[11px] text-[30px] transition-all ease-in-out duration-600"
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
          className={`absolute left-[12px] text-[20px] z-[2] transition-all ease-in-out duration-600 ${
            searchRun ? 'top-[91px]' : 'top-[191px]'
          }`}
        >
          {locationHover ? <TbLocationFilled /> : <TbLocation />}
        </button>
      </div>
    </div>
  );
};

export default SearchBox;
