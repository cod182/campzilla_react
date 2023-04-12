import { useEffect, useState } from 'react';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { TbLocation, TbLocationFilled, TbLocationOff } from 'react-icons/tb';

import { useGeolocated } from 'react-geolocated';

import './styles.css';

const SearchBox = ({
  searchError,
  setSearchRunning,
  searchRunning,
  handleTextSearch,
  handleGpsSearch,
  searchQuery,
  setSearchQuery,
}: {
  searchError: boolean;
  setSearchRunning: any;
  searchQuery: string;
  setSearchQuery: any;
  searchRunning: boolean;
  handleTextSearch: any;
  handleGpsSearch: any;
}) => {
  const [locationHover, setLocationHover] = useState(false);
  const [geoLocation, setGeoLocation] = useState(false);
  const [geoLoading, setGeoLoading] = useState(false);

  // Called to handle searchbox part of submitting query
  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!searchQuery) {
      handleSearchError();
      setSearchRunning(false);
    } else {
      // set the search state to start
      setSearchRunning(true);
      handleTextSearch();
    }
  };
  useEffect(() => {
    if (searchError) {
      handleSearchError();
    }
  }, [searchError]);

  const handleGeoLocateSearch = () => {
    if (coords) {
      setSearchRunning(true);
      handleGpsSearch({
        longitude: coords.longitude,
        latitude: coords.latitude,
      });
    }
  };

  const handleSearchError = () => {
    const searchInput = document.getElementById('search-id');
    const searchIcon = document.getElementById('search-icon');

    searchInput?.classList.add('error');
    searchIcon?.classList.add('text-[#ff0101]');

    setTimeout(() => {
      searchInput?.classList.remove('error');
      searchIcon?.classList.remove('text-[#ff0101]');
    }, 2000);
  };

  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: true,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (isGeolocationEnabled && isGeolocationAvailable) {
      setGeoLoading(true);
      setGeoLocation(false);
      if (coords) {
        setGeoLocation(false);
        setGeoLocation(true);
      }
    } else {
      setGeoLocation(false);
      setGeoLocation(false);
    }
  }, [coords]);

  return (
    <div
      className={`w-screen bg-white flex flex-row items-center justify-center ${
        searchRunning ? 'h-[200px]' : 'h-[400px]'
      }`}
    >
      <div className="mx-auto w-[48rem] h-full flex justify-center items-center relative">
        <form
          className="relative w-full h-[50px] mx-auto"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            id="search-id"
            className={`border-2 rounded-3xl absolute text-center capitalize h-full w-full px-[42px] transition-all ease-in-out duration-600 bg-search-bg bg-left-bottom bg-contain	bg-repeat-x`}
            type="text"
            placeholder={`${searchQuery ? searchQuery : 'WHERE ARE WE GOING?'}`}
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
        {geoLocation ? (
          //Geo Location Button  Enabled
          <button
            onMouseEnter={() => setLocationHover(true)}
            onMouseLeave={() => setLocationHover(false)}
            onClick={(e) => {
              e.preventDefault();
              handleGeoLocateSearch();
            }}
            type="button"
            className={`absolute left-[12px] text-[20px] z-[2] transition-all ease-in-out duration-600 ${
              searchRunning ? 'top-[91px]' : 'top-[191px]'
            }`}
          >
            {locationHover ? <TbLocationFilled /> : <TbLocation />}
          </button>
        ) : (
          //Geo Location Button disabled
          <button
            type="button"
            disabled
            className={`absolute left-[12px] text-[20px] z-[2] transition-all ease-in-out duration-600 ${
              searchRunning ? 'top-[91px]' : 'top-[191px]'
            } ${isGeolocationEnabled && 'loading-geo'}`}
          >
            {isGeolocationEnabled ? <TbLocation /> : <TbLocationOff />}
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBox;
