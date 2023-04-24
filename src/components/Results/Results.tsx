import { useState } from 'react';
import Fade from 'react-reveal/Fade';
import { ImCross } from 'react-icons/im';
import Result from '../Result/Result';

const Results = ({
  locations,
  setMapFocus,
}: {
  locations: any;
  setMapFocus: any;
}) => {
  const [maxResults, setMaxResults] = useState(10);

  let locationsLimited = locations.items.slice(0, maxResults);

  if (locations.items.length === 0) {
    return (
      <div className="w-full h-[200px] mx-auto flex flex-col justify-center items-center text-xl">
        <p className="text-red-600 text-[50px]">
          <ImCross />
        </p>
        <p>No Results Found</p>
      </div>
    );
  }
  return (
    <div className="max-w-5xl h-auto min-h-[300px] pb-10 mx-auto mt-6 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Results</h1>
      <hr className="border-b border-[1px] border-gray-400 w-full my-4" />
      <div className="grid md:grid-cols-1 lg:grid-cols-2 grid-flow-rows gap-4 mb-6s">
        {locationsLimited.map((location: any) => {
          return (
            <div key={location.id} className="h-auto w-full">
              <Fade buttom>
                <Result resultData={location} setMapFocus={setMapFocus} />
              </Fade>
            </div>
          );
        })}
      </div>
      <button
        type="button"
        className={`w-full px-6 py-4 my-6 bg-blue-500 hover:bg-blue-400 text-white rounded-lg ${
          maxResults >= locations.items.length && 'hidden'
        }`}
        onClick={() => {
          setMaxResults((prev: number) => {
            return prev + 10;
          });
        }}
      >
        Load More
      </button>
    </div>
  );
};

export default Results;
