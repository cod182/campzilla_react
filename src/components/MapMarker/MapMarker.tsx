import { Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

import campingIcon from '../../assets/icons/camping-marker.png';

import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';

const MapMarker = ({ result }: any) => {
  let CampingIcon = L.icon({
    iconUrl: campingIcon,
    shadowUrl: campingIcon,
    iconSize: [25, 24],
    iconAnchor: [12, 0],
  });

  return (
    <Marker
      icon={CampingIcon}
      position={[result.position.lat, result.position.lng]}
    >
      <Popup>
        <div>
          <p>{result.title}</p>

          <a
            className="hover:text-[#4ab836] ease-in-out transition-all duration-300 block"
            href={`tel:+${result?.contacts?.[0]?.phone?.[0]?.value}`}
          >
            {result?.contacts?.[0]?.phone?.[0]?.value}
          </a>

          <a
            className="hover:text-[#4ab836] ease-in-out transition-all duration-300 block"
            href={result?.contacts?.[0]?.email?.[0]?.value}
            target="_blank"
            rel="noreferrer"
          >
            {result?.contacts?.[0]?.email?.[0]?.value}
          </a>

          <a
            className="hover:text-[#4ab836] ease-in-out transition-all duration-300 block"
            href={result?.contacts?.[0]?.[0]?.www?.[0]?.value}
            target="_blank"
            rel="noreferrer"
          >
            {result?.contacts?.[0]?.www?.[0]?.value.slice(11, 50)}
          </a>
          <div className="flex flex-row jusitfy-space items-center mt-2">
            <h5>Navigate:</h5>
            <a
              href={`https://maps.google.com/?q=${result?.position?.lat},%20${result?.position?.lng}`}
              target="_blank"
              rel="noreferrer"
              className="w-[20px] h-[20px] flex justify-center items-center mx-2"
            >
              <FcGoogle className="w-full h-full" />
            </a>
            <a
              href={`http://maps.apple.com/?q=${result?.title},%20${result?.address?.city},%20${result?.address?.county},%20${result?.address?.postalCode}`}
              target="_blank"
              rel="noreferrer"
              className="w-[20px] h-[20px] flex justify-center items-center mx-2"
            >
              <BsApple className="w-[90%] h-[90%]" />
            </a>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default MapMarker;
