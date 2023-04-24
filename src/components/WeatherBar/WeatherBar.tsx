import useFetch from 'react-fetch-hook';
import { DotPulse } from '@uiball/loaders';

const WeatherBar = ({ coords }: { coords: any }) => {
  const openApiKey = process.env.REACT_APP_OPEN_WEATHER_API;
  const {
    data: weatherData,
    isLoading: weatherLoading,
    error: weatherError,
  } = useFetch<any>(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${coords.lat}&lon=${coords.lng}&units=metric&appid=${openApiKey}`
  );
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
    <div className="w-full flex flex-row justify-center items-center">
      <p className="capitalize">{weatherData?.current?.weather?.[0]?.main}</p>
      <img
        src={`https://openweathermap.org/img/w/${weatherData?.current?.weather?.[0]?.icon}.png`}
        alt={`The current weather is ${weatherData?.current?.weather?.[0]?.main}`}
      />
      <p className="capitalize">
        {weatherData?.current?.temp.toFixed(1)}
        <sup>o</sup>C
      </p>
    </div>
  );
};

export default WeatherBar;
