import { useState } from 'react';
import { Map, SearchBox, About } from '../../components/index';
import { fetchPosition } from '../../services/hereGeocodeApi';
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

    let positionData = fetchPosition(searchQuery);
    positionData.then((value) => {
      if (value.items.length < 1) {
        setSearchRunning(false);
        setLoading(false);
        setSearchQuery('');
        setError(true);
      } else {
        setError(false);
        setSearchRunning(true);
        setGeoLocationObj({
          lat: value.items[0].position.lat,
          lng: value.items[0].position.lng,
        });
        setLoading(false);
      }
    });
  };

  const handleGpsSearch = (coordsObj: any) => {
    setLoading(true);
    setError(false);
    console.log(coordsObj);
    setGeoLocationObj(coordsObj);
    if (geoLocationObj) {
      setSearchRunning(true);
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
