import { ImCross } from 'react-icons/im';
import Result from '../Result/Result';

const Results = ({ locations }: { locations: any }) => {
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
    <div className="max-w-5xl h-auto min-h-[300px] mx-auto mt-6 flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Results</h1>
      <hr className="border-b border-[1px] border-gray-400 w-full my-4" />
      <div className="grid md:grid-cols-1 lg:grid-cols-2 grid-flow-rows gap-4">
        {locations.items.map((location: any) => {
          return (
            <div key={location.id} className="h-auto">
              <Result resultData={location} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Results;
