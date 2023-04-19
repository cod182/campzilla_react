import { ImCross } from 'react-icons/im';

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
    <div className="max-w-5xl h-auto mx-auto">
      <h1>Results</h1>
      {locations.items.map((location: any) => {
        return (
          <div className="w-full h-200px mx-auto flex flex-col justify-center items-center bg-slate-600 text-white">
            {location.title}
          </div>
        );
      })}
    </div>
  );
};

export default Results;
