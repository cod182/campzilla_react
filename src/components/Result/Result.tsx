import { useState } from 'react';
import { getMilesFromMeters } from '../../utils/useGetMiles';
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import { AiFillCaretDown } from 'react-icons/ai';
import useFetch from 'react-fetch-hook';

const Result = ({ resultData }: { resultData: any }) => {
  const [viewMore, setViewMore] = useState(false);
  const openApiKey = process.env.REACT_APP_OPEN_WEATHER_API;
  const {
    data: weatherData,
    isLoading: weatherLoading,
    error: weatherError,
  } = useFetch<any>(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${resultData.position.lat}&lon=${resultData.position.lng}&units=metric&appid=${openApiKey}`
  );

  console.log(resultData);

  console.log(weatherData);
  
  return (
    <section
      className={`overflow-hidden w-full flex flex-col justify-start rounded-lg bg-gray-200 p-5 shadow-lg relative ease-in-out transition-all duration-300 ${
        viewMore
          ? 'max-h-[1000px] min-h-[300px]'
          : 'max-h-[200px] min-h-[200px]'
      }`}
    >
      <div className="w-full h-auto group mb-4">
        <a
          href="#"
          className=" text-[#23abff] group-hover:text-[#4ab836] sm:text-[30px] md:text-[40px] lg:text-[25px] font-semibold max-w-full ease-in-out transition-all duration-300"
        >
          {resultData.title}
        </a>
        <div className="border-b-4 border-[#23abff] group-hover:border-[#4ab836] w-[40px] group-hover:w-full transition-all ease-ine-out duration-1000"></div>
      </div>
      <div className="flex flex-row justify-start items-center rounded-lg">
        <div className="w-[70%]">
          <div className="flex flex-row jusitfy-space items-center">
            <h5>Navigate:</h5>

            <a
              href={`https://maps.google.com/?q=${resultData?.title},${resultData?.address?.city},${resultData?.address?.county},${resultData?.address?.postalCode}`}
              target="_blank"
              rel="noreffer"
              className="w-[25px] h-[25px] flex justify-center items-center mx-2"
            >
              <FcGoogle className="w-full h-full" />
            </a>
            <a
              href={`http://maps.apple.com/?q=${resultData?.title},${resultData?.address?.city},${resultData?.address?.county},${resultData?.address?.postalCode}`}
              target="_blank"
              rel="noreffer"
              className="w-[25px] h-[25px] flex justify-center items-center mx-2"
            >
              <BsApple className="w-[90%] h-[90%]" />
            </a>
          </div>
          <p className="my-1">
            Distance: <span>{getMilesFromMeters(resultData.distance)}</span>
            Miles
          </p>
          <div>
            {resultData?.contacts?.[0]?.phone ? (
              <p className="my-1">
                Phone:&nbsp;
                <a
                  className="hover:text-[#4ab836] ase-in-out transition-all duration-300"
                  href={`tel:+${resultData?.contacts?.[0]?.phone?.[0].value}`}
                >
                  {resultData?.contacts?.[0]?.phone?.[0].value}
                </a>
              </p>
            ) : null}
            {resultData?.contacts?.[0]?.www ? (
              <p className="my-1">
                Website:&nbsp;
                <a
                  className="hover:text-[#4ab836] ase-in-out transition-all duration-300"
                  href={resultData?.contacts?.[0]?.www?.[0]?.value}
                  target="_blank"
                  rel="noreferrer"
                >
                  {resultData?.contacts?.[0]?.www?.[0]?.value.slice(11, 50)}
                </a>
              </p>
            ) : null}
          </div>
        </div>
        <div className="w-[30%]">Single Weather Icon</div>
      </div>
      {/* Dropdown view more */}
      {viewMore === true && (
        <>
          <hr className="mt-6 mb-4 border-b-[2px] border-black" />
          <div className="flex flex-row justify-between items-center">
            <div className="my-2 w-[50%]">
              <h4 className="font-semibold">Address:</h4>

              <address>
                <p>{resultData?.title}</p>
                <p>{resultData?.address?.city}</p>
                <p>{resultData?.address?.county}</p>
                <p>{resultData?.address?.postalCode}</p>
              </address>
            </div>
            <div className="w-[50%] flex justify-center items-center">
              //Weather
            </div>
          </div>
        </>
      )}
      <div className="w-[40px] h-[40px] absolute right-[10px] top-[10px] cursor-pointer	hover:drop-shadow-xl">
        <AiFillCaretDown
          className={`${
            viewMore ? 'rotate-180' : 'rotate-0	'
          } transition-all ease-in-out duration-300 w-full h-full`}
          onClick={() => {
            setViewMore((prev) => (!prev ? true : false));
          }}
        />
      </div>
    </section>
  );
};

export default Result;
