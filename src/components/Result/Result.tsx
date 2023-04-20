import { useState } from 'react';
import { getMilesFromMeters } from '../../utils/useGetMiles';
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';
import { AiFillDownCircle } from 'react-icons/ai';

const Result = ({ resultData }: { resultData: any }) => {
  const [viewMore, setViewMore] = useState(false);

  console.log(resultData);
  return (
    <section
      className={`w-full min-h-[300px] flex flex-col justify-start rounded-lg bg-gray-200 p-5 relative ${
        viewMore ? 'max-h-[1000px]' : 'max-h-[500px]'
      }`}
    >
      <div className="w-full h-auto group mb-4">
        <a
          href="#"
          className=" text-[#23abff] group-hover:text-[#4ab836] sm:text-[30px] md:text-[50px] lg:text-[45px] font-semibold max-w-full ease-in-out transition-all duration-300"
        >
          {resultData.title}
        </a>
        <div className="border-b-4 border-[#23abff] group-hover:border-[#4ab836] w-[40px] group-hover:w-full transition-all ease-ine-out duration-1000"></div>
      </div>
      <div className="flex flex-row justify-start items-center rounded-lg">
        <div className="w-[50%]">
          <p>
            Distance: <span>{getMilesFromMeters(resultData.distance)}</span>
            Miles
          </p>

          <div>
            <p>
              Phone:&nbsp;
              <a
                className="hover:text-[#4ab836] ase-in-out transition-all duration-300"
                href={`tel:+${resultData?.contacts?.[0]?.phone?.[0].value}`}
              >
                {resultData?.contacts?.[0]?.phone?.[0].value}
              </a>
            </p>
            {resultData?.contacts?.[0]?.www ? (
              <p>
                Website:&nbsp;
                <a
                  className="hover:text-[#4ab836] ase-in-out transition-all duration-300"
                  href={resultData?.contacts?.[0]?.www?.[0]?.value}
                  target="_blank"
                  rel="noreferrer"
                >
                  {resultData?.contacts?.[0]?.www?.[0]?.value}
                </a>
              </p>
            ) : null}
          </div>

          <div className="my-2">
            <h4 className="font-semibold">Address:</h4>

            <address>
              <p>{resultData?.title}</p>
              <p>{resultData?.address?.city}</p>
              <p>{resultData?.address?.county}</p>
              <p>{resultData?.address?.postalCode}</p>
            </address>
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
          </div>
        </div>
        <div>//Weather</div>
      </div>
      {viewMore === true && <div>HALLOO!</div>}
      <div className="w-[40px] h-[40px] absolute right-[10px] bottom-[10px]">
        <AiFillDownCircle
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
