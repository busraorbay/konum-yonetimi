"use client";

import { useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import L from "leaflet";
import { Box, Button } from "@chakra-ui/react";
import { MapClickHandler } from "./MapClickHandler";
import { MapMarker } from "./MapMarker";
import { MarkerData } from "@/types/map";
import "leaflet/dist/leaflet.css";

interface MapViewProps {
  markers: MarkerData[];
  userPosition?: [number, number] | null;
  showRouteButton?: boolean;
  onMarkerClick?: (marker: MarkerData) => void;
  onMapClick?: (lat: number, lng: number) => void;
  routeCoordinates?: [number, number][];
}

export const MapView: React.FC<MapViewProps> = ({
  markers,
  userPosition,
  showRouteButton = false,
  onMarkerClick,
  onMapClick,
  routeCoordinates,
}) => {
  const [showRoute, setShowRoute] = useState<boolean>(false);
  const mapCenter = userPosition || [39.92, 32.85]; // Ankara default

  return (
    <Box position="relative" w="100%" h="100vh">
      <Box
        position="absolute"
        top={4}
        right={4}
        bg="white"
        p={2}
        rounded="md"
        shadow="md"
        zIndex={1000}
        display="flex"
        flexDirection="column"
        gap={2}
      >
        <Button as="a" href="/" colorScheme="blue" mb={2}>
          Konumları Listele
        </Button>

        {showRouteButton && routeCoordinates && (
          <Button
            colorScheme={showRoute ? "red" : "green"}
            onClick={() => setShowRoute(!showRoute)}
          >
            {showRoute ? "Rotayı Gizle" : "Rotayı Göster"}
          </Button>
        )}
      </Box>

      <MapContainer
        center={mapCenter}
        zoom={userPosition ? 12 : 6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {/* Kullanıcı Konumu */}
        {userPosition && (
          <Marker
            position={userPosition}
            icon={L.divIcon({
              className: "",
              html: `<div style="background:blue; border-radius:50%; width:20px; height:20px; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
            })}
          />
        )}

        {/* Marker'lar */}
        {markers.map((marker) => (
          <MapMarker key={marker.id} marker={marker} onClick={onMarkerClick} />
        ))}

        {/* Harita üzerine tıklama yakalayıcı */}
        {onMapClick && <MapClickHandler onMapClick={onMapClick} />}

        {/* Rota çizgisi */}
        {showRoute && routeCoordinates && routeCoordinates.length > 0 && (
          <Polyline
            positions={routeCoordinates}
            color="blue"
            weight={3}
            opacity={0.7}
            dashArray="10, 10"
          />
        )}
      </MapContainer>
    </Box>
  );
};
