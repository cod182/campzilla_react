import { useEffect, useState } from 'react';
import { Map, SearchBox, About } from '../../components/index';
import { fetchPosition } from '../../services/hereGeocodeApi';
import { ChaoticOrbit } from '@uiball/loaders';
import Results from '../../components/Results/Results';
import useFetch from 'react-fetch-hook';
import RadiusBar from '../../components/RadiusBar/RadiusBar';

const Home = () => {
  const keyword = 'campground';
  const hereApiKey = process.env.REACT_APP_HERE_API;

  const [searchRunning, setSearchRunning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [geoLocationObj, setGeoLocationObj] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState(false);
  const [radius, setRadius] = useState(16093);
  const {
    data: locationsData,
    isLoading: loadingLocations,
    error: locaationsError,
  } = useFetch<any>(
    `https://discover.search.hereapi.com/v1/discover?q=${keyword}&in=circle:${geoLocationObj.lat},${geoLocationObj.lng};r=${radius}&limit=100&apiKey=${hereApiKey}`
  );

  const handleTextSearch = async (query: string) => {
    setLoading(true);
    setSearchQuery(query);
    let positionData = await fetchPosition(query);

    if (positionData.items.length < 1) {
      setSearchRunning(false);
      setLoading(false);
      setSearchQuery('');
      setError(true);
    } else {
      setError(false);
      setSearchRunning(true);
      setGeoLocationObj({
        lat: positionData.items[0].position.lat,
        lng: positionData.items[0].position.lng,
      });
      setLoading(false);
    }
  };

  const handleGpsSearch = (coordsObj: any) => {
    setLoading(true);
    setError(false);
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
          <div className="w-full h-[200px] flex flex-col justify-center items-center">
            <ChaoticOrbit size={60} speed={1.5} color="green" />
          </div>
        ) : (
          <>
            <div id="map">
              <Map coords={geoLocationObj} searchResults={[]} />
            </div>
            <RadiusBar
              locationAmount={locationsData.items.length}
              radius={radius}
              setRadius={setRadius}
            />
            {loadingLocations ? (
              <div className="w-full h-[200px] flex justify-center items-center">
                <ChaoticOrbit size={60} speed={1.5} color="green" />
              </div>
            ) : (
              <Results locations={locationsData} />
            )}
          </>
        )
      ) : null}
      <About />
    </>
  );
};

export default Home;
