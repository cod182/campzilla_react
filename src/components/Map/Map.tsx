import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const Map = ({
  coords,
  searchResults,
}: {
  coords: any;
  searchResults: any;
}) => {
  const { lat, lng } = coords;
  console.log(lat, lng);

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 35],
    iconAnchor: [5, 30],
  });

  function MapView() {
    let map = useMap();
    map.setView([lat, lng], map.getZoom());
    //Sets geographical center and zoom for the view of the map
    return null;
  }

  return (
    <div className="mx-auto max-w-5xl h-[500px] mb-10">
      <MapContainer
        className="w-full h-full"
        center={[lat, lng]}
        zoom={5}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={DefaultIcon} position={[lat, lng]}>
          <Popup>You are here!</Popup>
        </Marker>
        {searchResults.map((result: any) => {
          return (
            <Marker
              key={result.name}
              icon={DefaultIcon}
              position={[result.latitude, result.longitude]}
            >
              <Popup>{result.name}</Popup>
            </Marker>
          );
        })}
        <MapView />
      </MapContainer>
    </div>
  );
};

export default Map;
