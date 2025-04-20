"use client";
import { Marker } from "react-leaflet";
import L from "leaflet";
import { MarkerData } from "@/types/map";

interface MapMarkerProps {
  marker: MarkerData;
  onClick?: (marker: MarkerData) => void;
}

export const MapMarker: React.FC<MapMarkerProps> = ({ marker, onClick }) => {
  const icon = L.divIcon({
    className: "clickable-marker-icon",
    html: `
      <div style="
        background:${marker.color};
        width: 16px;
        height: 16px;
        border-radius: 50%;
        border: 2px solid white;
        box-shadow: 0 0 3px rgba(0,0,0,0.3);
        pointer-events: auto;
        cursor: pointer;
      "></div>
    `,
    iconSize: [20, 20],
    iconAnchor: [8, 8],
  });

  const handleClick = () => {
    console.log("Marker tıklandı:", marker);
    onClick?.(marker);
  };

  return (
    <Marker
      position={[marker.lat, marker.lng]}
      icon={icon}
      eventHandlers={{ click: handleClick }}
    />
  );
};
