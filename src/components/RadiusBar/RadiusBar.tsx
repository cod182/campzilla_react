import React from 'react';
import { getMilesFromMeters } from '../../utils/useGetMiles';

const RadiusBar = ({
  locationAmount,
  radius,
  setRadius,
}: {
  locationAmount: any;
  radius: number;
  setRadius: any;
}) => {
  return (
    <div
      className="mx-auto max-w-4xl w-full md:w-[80%] min-h-[40px] h-auto flex flex-row flex-wrap justify-center items-center bg-[#a1a1a1a1] rounded-bl-lg rounded-br-lg shadow-inner"
      style={{
        backdropFilter: 'blur(1px)',
        boxShadow: 'inset gray 0px 9px 12px',
      }}
    >
      <p className="mr-2">Radius:</p>
      <form className="flex justify-center items-center">
        <input
          value={radius}
          type="range"
          name="radius-range"
          id="radius-range"
          step="8050"
          min="8000"
          max="80467"
          onChange={(e) => {
            setRadius(Number(e.target.value));
          }}
        />
      </form>
      <p className="ml-2">{getMilesFromMeters(radius)} Miles</p>
      <p className="ml-2 font-semibold">
        Results:
        <span className="ml-1 ">{locationAmount}</span>
        <span className="ml-1 font-normal text-sm">(100 Max)</span>
      </p>
    </div>
  );
};

export default RadiusBar;
