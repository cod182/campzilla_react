import {
  About,
  Map,
  RadiusBar,
  Results,
  SearchBox,
  WeatherBar,
} from '../../components/index';
import { useEffect, useState } from 'react';

import { ChaoticOrbit } from '@uiball/loaders';
import { fetchPosition } from '../../services/hereGeocodeApi';
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
  const [mapZoom, setMapZoom] = useState(10);
  const {
    data: locationsData,
    isLoading: loadingLocations,
    error: locationsError,
  } = useFetch<any>(
    `https://discover.search.hereapi.com/v1/discover?q=${keyword}&in=circle:${geoLocationObj.lat},${geoLocationObj.lng};r=${radius}&limit=100&apiKey=${hereApiKey}`
  );

  useEffect(() => {
    setMapZoom(10);
  }, [radius]);

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
      setMapZoom(10);
      setRadius(16093);
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
      setMapZoom(10);
      setMapFocusCoords(coordsObj);
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
        ) : locationsData ? (<div className='flex flex-col items-center justify-center w-full h-full my-6 grow'><p>Unfortunately, due to HereMaps new policies, free api access is no longer available.</p></div>) : (
          <>
            <div id="map" className="z-[2]">
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
            ) : locationsError ? (
              'Failed to load locations, please re-run the search'
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
