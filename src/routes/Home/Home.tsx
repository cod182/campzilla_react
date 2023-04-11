import { useState } from 'react';
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

  console.log(geoLocationObj);

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
          <Map coords={geoLocationObj} />
        )
      ) : null}
      <About />
    </>
  );
};

export default Home;
