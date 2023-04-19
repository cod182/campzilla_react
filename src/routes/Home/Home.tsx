import { useEffect, useState } from 'react';
import { Map, SearchBox, About } from '../../components/index';
import { fetchPosition } from '../../services/hereGeocodeApi';
import { ChaoticOrbit } from '@uiball/loaders';
import { getResultsInArea } from '../../services/hereAroundMeApi';
import Results from '../../components/Results/Results';
import useFetch from 'react-fetch-hook';

const Home = () => {
  const keyword = 'campground';
  const hereApiKey = process.env.REACT_APP_HERE_API;

  const [searchRunning, setSearchRunning] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [geoLocationObj, setGeoLocationObj] = useState({ lat: 0, lng: 0 });
  const [locationResults, setLocationResults] = useState<any[]>([]);
  const [error, setError] = useState(false);
  const [radius, setRadius] = useState(10000);
  const {
    data: locationsData,
    isLoading: loadingLocations,
    error: locaationsError,
  } = useFetch(
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
      // handleAroundMeLookUp();
    }
  };

  const handleGpsSearch = (coordsObj: any) => {
    setLoading(true);
    setError(false);
    setGeoLocationObj(coordsObj);
    if (geoLocationObj) {
      setSearchRunning(true);
      setLoading(false);
      // handleAroundMeLookUp();
    }
  };

  const handleAroundMeLookUp = async () => {
    // setLoadingLocations(true);
    let locationLookupResults = await getResultsInArea({
      lat: geoLocationObj.lat,
      lng: geoLocationObj.lng,
      radius,
    });
    console.log(await locationLookupResults);

    if ((await locationLookupResults.items.length) >= 1) {
      // setLoadingLocations(false);
      console.log('locationLookupResults >=1', locationLookupResults);
      setLocationResults(() => {
        return locationLookupResults.items;
      });
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
          <>
            <div id="map">
              <Map coords={geoLocationObj} searchResults={[]} />
            </div>
          </>
        )
      ) : null}
      {searchRunning ? (
        loadingLocations ? (
          <div className="w-full h-[200px] flex justify-center items-center">
            <ChaoticOrbit size={60} speed={1.5} color="green" />
          </div>
        ) : (
          <Results locations={locationsData} />
        )
      ) : null}
      <About />
    </>
  );
};

export default Home;
