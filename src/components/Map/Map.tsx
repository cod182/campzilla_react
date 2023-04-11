import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const Map = ({ coords }: { coords: any }) => {
  const { latitude, longitude } = coords;

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
  });

  function MapView() {
    let map = useMap();
    map.setView([latitude, longitude], map.getZoom());
    //Sets geographical center and zoom for the view of the map
    return null;
  }

  return (
    <div id="map" className="mx-auto max-w-5xl h-[500px] mb-10">
      <MapContainer
        className="w-full h-full"
        center={[longitude, latitude]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker icon={DefaultIcon} position={[latitude, longitude]}>
          <Popup>You are here!</Popup>
        </Marker>
        <MapView />
      </MapContainer>
    </div>
  );
};

export default Map;
