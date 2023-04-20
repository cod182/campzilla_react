import { getMilesFromMeters } from '../../utils/useGetMiles';

const Result = ({ resultData }: { resultData: any }) => {
  console.log(resultData);
  return (
    <section className="w-full min-h-[300px] h-auto flex flex-row justify-start items-center rounded-lg bg-gray-200 p-5">
      <div>
        <h2>{resultData.title}</h2>
        <p>
          Distance: <span>{getMilesFromMeters(resultData.distance)}</span> Miles
        </p>

        {resultData?.contacts
          ? resultData?.contacts.map((contact: any) =>
              contact?.phone
                ? contact?.phone.map((phone: any) => {
                    return (
                      <p>
                        Phone:{' '}
                        <a
                          className="hover:text-[#4ab836]"
                          href={`tel:+${phone.value}`}
                        >
                          {phone.value}
                        </a>
                      </p>
                    );
                  })
                : null
            )
          : null}

        {resultData?.contacts
          ? resultData?.contacts.map((contact: any) =>
              contact?.fax
                ? contact?.fax.map((fax: any) => {
                    return <p>Fax: {fax.value}</p>;
                  })
                : null
            )
          : null}
        {resultData?.contacts?.[0]?.www ? (
          <p>
            Website:{' '}
            <a
              className="hover:text-[#4ab836]"
              href={resultData?.contacts?.[0]?.www?.[0]?.value}
              target="_blank"
              rel="noreferrer"
            >
              {resultData?.contacts?.[0]?.www?.[0]?.value}
            </a>
          </p>
        ) : null}
      </div>
      <div></div>
    </section>
  );
};

export default Result;
