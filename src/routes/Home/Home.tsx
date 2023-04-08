import { useState } from 'react';
import { Map, SearchBox } from '../../components/index';

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
  return (
    <>
      <SearchBox searchRun={searchRun} searchStart={handleSearch} />
      <Map />
    </>
  );
};

export default Home;
