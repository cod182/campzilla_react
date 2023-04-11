import { useState, useRef, useEffect } from 'react';
import { Map, SearchBox, About } from '../../components/index';

import { ChaoticOrbit } from '@uiball/loaders';

const Home = () => {
  const handleSearch = ({
    state,
    query,
  }: {
    state: boolean;
    query: string;
  }) => {
    setSearchRun(state);
    if (state) {
      // Run search look up here
      console.log(query);
    }
  };
  const [searchRun, setSearchRun] = useState(false);
  const [loading, setLoading] = useState(false);
  const [geoLocationObj, setGeoLocationObj] = useState({});
  const [locationResults, setLocationResults] = useState([
    { latitude: 52.4929061, longitude: -3.1498262, name: 'location 1' },
    { latitude: 51.4929061, longitude: -2.149826, name: 'location 2' },
    { latitude: 54.4934061, longitude: -4.1498262, name: 'location 3' },
    { latitude: 52.4924831, longitude: -2.1498262, name: 'location 4' },
  ]);

  const mapRef = useRef();

  useEffect(() => {
    var element = document.getElementById('map');
    if (searchRun) {
      element!.scrollIntoView();
    }
  }, [searchRun]);

  return (
    <>
      <SearchBox
        searchRun={searchRun}
        searchStart={handleSearch}
        setGeoLocationObj={setGeoLocationObj}
      />
      {searchRun ? (
        loading ? (
          <div className="w-full h-[200px] flex justify-center items-center">
            <ChaoticOrbit size={60} speed={1.5} color="green" />
          </div>
        ) : (
          <div id="map">
            <Map coords={geoLocationObj} searchResults={locationResults} />
          </div>
        )
      ) : null}
      <About />
    </>
  );
};

export default Home;
