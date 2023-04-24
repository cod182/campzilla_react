import useFetch from 'react-fetch-hook';
import { DotPulse } from '@uiball/loaders';
import { useState } from 'react';
import cloudImg from '../../assets/images/clouds.png';
import windAni from '../../assets/images/wind-turbine.gif';
import { BsFillSunriseFill, BsFillSunsetFill } from 'react-icons/bs';
import { useConvertUnixTimeToHour } from '../../utils/useConvertUnix';

import { AiOutlineArrowUp } from 'react-icons/ai';

const WeatherBar = ({ coords }: { coords: any }) => {
  const openApiKey = process.env.REACT_APP_OPEN_WEATHER_API;
  const {
    data: weatherData,
    isLoading: weatherLoading,
    error: weatherError,
  } = useFetch<any>(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&units=metric&appid=${openApiKey}`
  );

  const [forcastHourly, setForcastHourly] = useState(true);
  const sunrise = useConvertUnixTimeToHour(weatherData?.current?.sunrise);
  const sunset = useConvertUnixTimeToHour(weatherData?.current?.sunset);

  console.log(weatherData);

  if (weatherLoading) {
    return (
      <div className="w-full flex flex-row justify-center items-center">
        <DotPulse size={40} speed={1.3} color="black" />
      </div>
    );
  }
  if (weatherError) {
    return null;
  }
  return (
    <div className="w-full h-auto flex flex-col justify-center items-center mt-4 sm:mt-1 max-w-5xl mx-auto">
      <div className="h-[70px] my-4 ml-6 flex flex-row justify-center items-center  select-none">
        {/* Weather & Temperature */}
        <div
          className="relative w-auto h-full flex justify-center items-center bg-[#0e8fff9a] shadow rounded-xl px-2 mx-2 font-semibold"
          style={{
            backdropFilter: 'blur(1px)',
          }}
        >
          <div className="flex flex-col justify-center items-center p-2 text-sm mr-2">
            <img
              className="h-[40px] w-[40px]"
              src={`https://openweathermap.org/img/w/${weatherData?.current?.weather?.[0]?.icon}.png`}
              alt={`The current weather is ${weatherData?.current?.weather?.[0]?.main}`}
            />
            <p className="capitalize">
              {weatherData?.current?.weather?.[0]?.main}
            </p>
          </div>

          <div className="flex flex-col items-end justify-center text-sm h-full">
            <p className="capitalize">
              Temp:&nbsp;
              {weatherData?.current?.temp.toFixed(1)}
              <sup>o</sup>C
            </p>
            <p className="capitalize">
              Feels Like:&nbsp;
              {weatherData?.current?.feels_like.toFixed(1)}
              <sup>o</sup>C
            </p>
          </div>
        </div>
        {/* Cloud Cover */}
        <div
          className="flex flex-row items-end justify-between text-sm h-full select-none"
          style={{
            backdropFilter: 'blur(1px)',
          }}
        >
          <div
            className={`relative overflow-hidden w-[90px] h-full flex flex-col justify-center items-center rounded-xl px-2 mx-2 bg-cover`}
            style={{
              backgroundImage: `-webkit-linear-gradient(44deg, transparent ${weatherData?.current?.clouds}%, rgb(127 187 255) ${weatherData?.current?.clouds}%), url(${cloudImg})`,
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-full bg-[#9e9e9e75] text-black text-semibold flex flex-col justify-center items-center font-semibold"
              style={{
                backdropFilter: 'blur(1px)',
              }}
            >
              <p className="z-[2] text-center text-sm">Cloud Cover</p>
              <p className="capitalize z-[2]">
                {weatherData?.current?.clouds}%
              </p>
            </div>
          </div>
          {/* Wind Speed */}
          <div
            className={`relative overflow-hidden w-[100px] h-full flex flex-col justify-center items-center rounded-xl px-2 mx-2 bg-[#fff0] bg-no-repeat	bg-left-bottom	`}
            style={{
              backgroundImage: `url(${windAni})`,

              backdropFilter: 'blur(1px)',
            }}
          >
            <div
              className="absolute top-0 left-0 w-full h-full bg-[#0e8fff9a] text-black text-semibold flex flex-col justify-center items-end font-semibold px-2 leading-10"
              style={{
                backdropFilter: 'blur(1px)',
              }}
            >
              <p className="text-sm">Wind Speed</p>
              <p className="capitalize">
                {weatherData?.current?.wind_speed.toFixed(0)} mph
              </p>
              <p className="text-[5px] absolute bottom-[-17px]">
                <a
                  target="_blank"
                  href="https://icons8.com/icon/Q83OPXa8MS8N/wind-turbine"
                >
                  Wind Turbine
                </a>
                icon by
                <a target="_blank" href="https://icons8.com">
                  Icons8
                </a>
              </p>
            </div>
          </div>
          {/* Wind Direction */}
          <div className="h-full w-[70px] relative bg-[#0e8fff9a] rounded-xl font-semibold">
            <div className="absolute top-[18px] left-[18px] h-[50%] w-[50%] border border-black rounded-full"></div>
            <p className="absolute top-[0px] left-[30px]">N</p>
            <p className="absolute right-[6px] top-[26px]">E</p>
            <p className="absolute bottom-[0px] left-[30px]">S</p>
            <p className="absolute left-[4px] top-[26px]">W</p>
            <AiOutlineArrowUp
              className="text-2xl absolute top-[26px] left-[24px]"
              style={{
                transform: `rotate(${weatherData?.current?.wind_deg}deg)`,
              }}
            />
          </div>
          {/* Sunrise/Sunset */}
          <div
            className="relative w-auto h-full flex justify-center items-center bg-[#0e8fff9a] shadow rounded-xl px-2 mx-2 font-semibold"
            style={{
              backdropFilter: 'blur(1px)',
            }}
          >
            <div className="flex flex-col justify-center items-center mx-1">
              <p>Sunrise</p>
              <BsFillSunriseFill className="text-2xl" />
              <p>{sunrise}</p>
            </div>
            <div className="flex flex-col justify-center items-center mx-1">
              <p>Sunset</p>
              <BsFillSunsetFill className="text-2xl" />
              <p>{sunset}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="ml-6 flex flex-row justify-center items-center select-none">
        <p className="text-white font-semibold">Forcast: </p>
        <div className="w-[150px] h-auto flex justify-between items-center cursor-pointer bg-[#d7d7d7a1] rounded-xl py-2 px-1 mx-2 relative ">
          <p
            onClick={() => {
              setForcastHourly((prev) => {
                return prev ? false : true;
              });
            }}
            className={`mx-2 z-[1] text-center w-[75px] ease-in-out transition-all duration-200 ${
              forcastHourly ? 'text-white font-semibold' : 'text-black'
            }`}
          >
            Hourly
          </p>
          <p
            onClick={() => {
              setForcastHourly((prev) => {
                return prev ? false : true;
              });
            }}
            className={`mx-2 z-[1] text-center w-[75px] ease-in-out transition-all duration-200 ${
              forcastHourly ? 'text-black' : 'text-white font-semibold'
            }`}
          >
            Daily
          </p>
          <span
            className={`absolute cursor-pointer ease-in-out transition-all duration-200 bg-[#00ccffcf] w-[60px] h-[30px] opacity-[0.6] rounded-xl borer-black z-[0] ${
              forcastHourly ? 'left-[9px]' : 'left-[80px]'
            }`}
          ></span>
        </div>
        {forcastHourly ? <div>Hourly Weather</div> : <div>Weekly Weather</div>}
      </div>
    </div>
  );
};

export default WeatherBar;
