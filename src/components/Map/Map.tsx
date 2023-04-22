import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import MapMarker from '../MapMarker/MapMarker';

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
          return <MapMarker result={result} key={result.id} />;
        })}
        <MapView />
      </MapContainer>
    </div>
  );
};

export default Map;
