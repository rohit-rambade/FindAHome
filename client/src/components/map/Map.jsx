import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "../pin/Pin";

function Map({ listings }) {
  console.log(listings);
  return (
    <MapContainer
      center={[16.28551111, 73.68446111]}
      zoom={10}
      scrollWheelZoom={true}
      className="h-96"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      Test Kankavli
      <Pin listings={listings} />
    </MapContainer>
  );
}

export default Map;
