import { useState } from 'react';
import {
  Map,
  SearchBox,
  About,
  RadiusBar,
  Results,
  WeatherBar,
} from '../../components/index';
import { fetchPosition } from '../../services/hereGeocodeApi';
import { ChaoticOrbit } from '@uiball/loaders';
import useFetch from 'react-fetch-hook';

const Home = () => {
  const keyword = 'campground';
  const hereApiKey = process.env.REACT_APP_HERE_API;

  const [searchRunning, setSearchRunning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [geoLocationObj, setGeoLocationObj] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState(false);
  const [radius, setRadius] = useState(16093);
  const [mapFocusCoords, setMapFocusCoords] = useState({ lat: 0, lng: 0 });
const [mapZoom, setMapZoom] = useState(10)
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
      setMapFocusCoords({
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
      setMapFocusCoords(geoLocationObj);
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
              <Map
                coords={geoLocationObj}
                mapFocus={mapFocusCoords}
                searchResults={locationsData}
                mapZoom={mapZoom}
              />
            </div>
            <RadiusBar
              locationAmount={locationsData.items.length}
              radius={radius}
              setRadius={setRadius}
            />
            <WeatherBar coords={geoLocationObj} />
            {loadingLocations ? (
              <div className="w-full h-[200px] flex justify-center items-center">
                <ChaoticOrbit size={60} speed={1.5} color="green" />
              </div>
            ) : (
              <Results
                locations={locationsData}
                setMapFocus={setMapFocusCoords}
                setMapZoom={setMapZoom}
              />
            )}
          </>
        )
      ) : null}
      <About />
    </>
  );
};

export default Home;
