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
  const [loading, setLoading] = useState(true);

  return (
    <>
      <SearchBox searchRun={searchRun} searchStart={handleSearch} />
      {searchRun ? (
        loading ? (
          <div className="w-full h-auto flex justify-center items-center">
            <ChaoticOrbit size={60} speed={1.5} color="green" />
          </div>
        ) : (
          <Map />
        )
      ) : null}
      <About />
    </>
  );
};

export default Home;
