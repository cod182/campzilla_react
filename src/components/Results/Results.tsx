import { useState } from 'react';
import Fade from 'react-reveal/Fade';
import { ImCross } from 'react-icons/im';
import Result from '../Result/Result';

const Results = ({
  locations,
  setMapFocus,
  setMapZoom,
}: {
  locations: any;
  setMapFocus: any;
  setMapZoom: any;
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
      <h1 className="text-2xl font-bold py-4 rounded-tl-xl rounded-tr-xl text-center bg-[#a1a1a1a1] w-[90%] ">
        Results
      </h1>
      <hr className="border-y-[2px] border-gray-500  my-4 shadow-lg w-[95%] mt-0" />
      <div className="grid sm:grid-cols-1 md:grid-cols-2 grid-flow-rows gap-4 mb-6">
        {locationsLimited.map((location: any) => {
          return (
            <div
              key={location.id}
              className="h-auto w-full"
              style={{
                backdropFilter: 'blur(1px)',
              }}
            >
              <Fade buttom>
                <Result
                  resultData={location}
                  setMapFocus={setMapFocus}
                  setMapZoom={setMapZoom}
                />
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
