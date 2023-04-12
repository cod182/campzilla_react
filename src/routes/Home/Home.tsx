import { useState } from 'react';
import { Map, SearchBox, About } from '../../components/index';
import getCoordinates from '../../utils/getCoordinates';
import { ChaoticOrbit } from '@uiball/loaders';

const Home = () => {
  const [searchRunning, setSearchRunning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [geoLocationObj, setGeoLocationObj] = useState({});
  const [locationResults, setLocationResults] = useState([]);
  const [error, setError] = useState(false);

  const handleTextSearch = () => {
    setLoading(true);

    let queryCoordsPromise = getCoordinates(searchQuery);
    queryCoordsPromise.then((value) => {
      if (!value) {
        setSearchRunning(false);
        setLoading(false);
        setSearchQuery('Invalid Search Term');
        setError(true);
      } else {
        setError(false);
        setGeoLocationObj({
          latitude: value.latitude,
          longitude: value.longitude,
        });
        setLoading(false);
      }
    });
  };

  const handleGpsSearch = (coordsObj: any) => {
    setLoading(true);
    setError(false);
    setGeoLocationObj(coordsObj);
    if (geoLocationObj) {
      setLoading(false);
    }
  };
  return (
    <>
      <SearchBox
        searchError={error}
        setSearchRunning={setSearchRunning}
        searchRunning={searchRunning}
        handleTextSearch={handleTextSearch}
        handleGpsSearch={handleGpsSearch}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      {searchRunning ? (
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
