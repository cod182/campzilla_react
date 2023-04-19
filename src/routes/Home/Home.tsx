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
  const [radius, setRadius] = useState(16093);
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

  const getMilesFromMeters = (radius: number) => {
    const distKm = radius * 0.001; //convert meters to KM
    const dist = distKm / 1.609; //converts KM to Miles
    return dist.toFixed(1); //Returns distance in miles to 1 decimal place
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
            <div className="w-full h-[50px] flex justify-center items-center">
              <p className="mr-2">Radius:</p>
              <form className="flex justify-center items-center">
                <input
                  value={radius}
                  type="range"
                  name="radius-range"
                  id="radius-range"
                  step="8050"
                  min="8000"
                  max="80467"
                  onChange={(e) => {
                    setRadius(Number(e.target.value));
                  }}
                />
              </form>
              <p className="ml-2">{getMilesFromMeters(radius)} Miles</p>
              <p className="ml-2 font-semibold">
                Results
                <span className="ml-2 font-normal">
                  {radius}
                  <span className="text-sm">(100 Max)</span>
                </span>
              </p>
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
