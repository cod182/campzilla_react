import useFetch from 'react-fetch-hook';
import { DotPulse } from '@uiball/loaders';
import { useState } from 'react';
import cloudImg from '../../assets/images/clouds.png';

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

  console.log(weatherData?.current?.clouds / 100);

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
    <div className="w-full h-autoflex flex-col justify-center items-center mt-4 sm:mt-1">
      <div className="h-[70px] my-4 ml-6 flex flex-row justify-center items-center  select-none">
        <p>Current Weather:&nbsp;</p>
        <div className="w-auto h-full flex justify-center items-center bg-[#00caffa1] rounded-xl px-2 mx-2">
          <p className="capitalize">
            {weatherData?.current?.weather?.[0]?.main}
          </p>
          <img
            src={`https://openweathermap.org/img/w/${weatherData?.current?.weather?.[0]?.icon}.png`}
            alt={`The current weather is ${weatherData?.current?.weather?.[0]?.main}`}
          />

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

        <div className="flex flex-row items-end justify-between text-sm h-full select-none">
          <div
            className={`relative overflow-hidden w-[70px] h-full flex flex-col justify-center items-center rounded-xl px-2 mx-2 bg-cover`}
            style={{
              backgroundImage: `-webkit-linear-gradient(44deg, transparent ${weatherData?.current?.clouds}%, rgb(135 230 255) ${weatherData?.current?.clouds}%), url(${cloudImg})`,
            }}
          >
            <div className="absolute top-0 left-0 w-full h-full bg-[#9e9e9e75] text-black text-semibold flex flex-col justify-center items-center">
              <p className="z-[2] text-center text-sm">Cloud Cover</p>
              <p className="capitalize z-[2]">
                {weatherData?.current?.clouds}%
              </p>
            </div>
          </div>
          <div className="w-auto h-full flex justify-center items-center bg-[#00caffa1] rounded-xl px-2 mx-2">
            <p>Wind Speed:&nbsp;</p>
            <p className="capitalize">
              {weatherData?.current?.wind_speed.toFixed(0)} mph
            </p>
          </div>
        </div>
      </div>
      <div className="ml-6 flex flex-row justify-center items-center select-none">
        <p>Forcast: </p>
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
