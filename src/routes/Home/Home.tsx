import { useState } from 'react';
import { Map, SearchBox } from '../../components/index';

const Home = () => {
  const handleSearch = () => {
    setSearchRun(true);
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
