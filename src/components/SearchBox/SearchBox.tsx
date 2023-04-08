import { RxMagnifyingGlass } from 'react-icons/rx';

const SearchBox = ({
  searchRun,
  searchStart,
}: {
  searchRun: boolean;
  searchStart: any;
}) => {
  console.log(searchRun);
  return (
    <div
      className={`w-screen h-full bg-white flex flex-row items-center justify-center ${
        searchRun ? 'h-[200px]' : 'min-h-[400px]'
      }`}
    >
      <form
        className="relative w-full h-full mx-auto"
        onSubmit={(e) => {
          e.preventDefault();
          searchStart();
        }}
      >
        <input
          className="border-2 border-black rounded-3xl absolute text-center capitalize h-[50px] min-w-[50%] my-12"
          type="text"
          placeholder="WHERE ARE WE GOING?"
        />
        <button type="submit" className="absolute">
          <RxMagnifyingGlass />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
