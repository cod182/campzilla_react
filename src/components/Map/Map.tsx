import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { FcGoogle } from 'react-icons/fc';
import { BsApple } from 'react-icons/bs';

const Map = ({
  coords,
  searchResults,
  mapFocus,
  mapZoom,
}: {
  coords: any;
  searchResults: any;
  mapFocus: any;
  mapZoom: number;
}) => {
  const { lat, lng } = coords;

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });

  function MapView() {
    let map = useMap();
    map.setView([mapFocus.lat, mapFocus.lng], mapZoom);
    //Sets geographical center and zoom for the view of the map
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl h-[500px] mb-10 rounded-xl overflow-hidden">
      <MapContainer
        className="w-full h-full"
        center={[lat, lng]}
        zoom={mapZoom}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={DefaultIcon} position={[lat, lng]}>
          <Popup>You are here!</Popup>
        </Marker>
        {searchResults.items.map((result: any) => {
          console.log(result);
          return (
            <Marker
              key={result.id}
              icon={DefaultIcon}
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
                      href={`https://maps.google.com/?q=${result?.title}?.address?.city},${result?.address?.county},${result?.address?.postalCode}`}
                      target="_blank"
                      rel="noreffer"
                      className="w-[20px] h-[20px] flex justify-center items-center mx-2"
                    >
                      <FcGoogle className="w-full h-full" />
                    </a>
                    <a
                      href={`http://maps.apple.com/?q=${result?.title},${result?.address?.city},${result?.address?.county},${result?.address?.postalCode}`}
                      target="_blank"
                      rel="noreffer"
                      className="w-[20px] h-[20px] flex justify-center items-center mx-2"
                    >
                      <BsApple className="w-[90%] h-[90%]" />
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
        <MapView />
      </MapContainer>
    </div>
  );
};

export default Map;
