"use client";

import { MapContainer, TileLayer, Marker, Polyline } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { addMarker } from "@/store/markerSlice";
import { RootState } from "@/store";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  VStack,
  Text,
  CloseButton,
  Spinner,
} from "@chakra-ui/react";
import L from "leaflet";
import { MarkerData } from "@/types/map";

const RotaGoster: React.FC = () => {
  const dispatch = useDispatch();
  const markers = useSelector((state: RootState) => state.marker.markers);
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );
  const [sortedMarkers, setSortedMarkers] = useState<MarkerData[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [showRoute, setShowRoute] = useState<boolean>(false);

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          setLoading(false);
        },
        (error) => {
          console.error("Geolocation error:", error);
          setLoading(false);
          setUserPosition([39.92, 32.85]);
        }
      );
    }
  }, []);

  // Kuş bakışı mesafe hesaplama haversine formül
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371; // Dünya yarıçapı (km)
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Kilometre cinsinden mesafe
  };

  useEffect(() => {
    if (userPosition && markers.length > 0) {
      const markersWithDistance = [...markers].map((marker) => ({
        ...marker,
        distance: calculateDistance(
          userPosition[0],
          userPosition[1],
          marker.lat,
          marker.lng
        ),
      }));

      const sorted = markersWithDistance.sort(
        (a, b) => (a.distance || Infinity) - (b.distance || Infinity)
      );

      setSortedMarkers(sorted);
    }
  }, [userPosition, markers]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const savedMarkers = JSON.parse(
          localStorage.getItem("markers") || "[]"
        );
        savedMarkers.forEach((marker: MarkerData) => {
          dispatch(addMarker(marker));
        });
      } catch (error) {
        console.error("Error loading markers from localStorage:", error);
        localStorage.removeItem("markers");
      }
    }
  }, [dispatch]);

  const handleMarkerClick = (marker: MarkerData) => {
    setSelectedMarker(marker);
  };

  const handleCancel = () => {
    setSelectedMarker(null);
  };

  const routeCoordinates = (): [number, number][] => {
    if (!userPosition) return [];

    return [
      userPosition,
      ...sortedMarkers.map(
        (marker) => [marker.lat, marker.lng] as [number, number]
      ),
    ];
  };

  return (
    <Box position="relative" w="100%" h="100vh">
      {loading && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          zIndex={1000}
          bg="white"
          p={4}
          rounded="md"
          shadow="md"
          textAlign="center"
        >
          <Spinner size="lg" mb={2} />
          <Text>Konum alınıyor...</Text>
        </Box>
      )}

      {selectedMarker && (
        <Box
          position="absolute"
          top={4}
          left={10}
          bg="white"
          p={4}
          rounded="md"
          shadow="md"
          zIndex={1000}
          w="300px"
        >
          <Box position="absolute" top={2} right={2}>
            <CloseButton onClick={handleCancel} />
          </Box>
          <div>
            <VStack spacing={3}>
              <Text fontSize="sm" fontWeight="bold" color="gray.600">
                📍 Seçilen Konum:
                <br />
                <strong>Enlem:</strong> {selectedMarker.lat.toFixed(5)} <br />
                <strong>Boylam:</strong> {selectedMarker.lng.toFixed(5)}
              </Text>
              {userPosition && (
                <Text fontSize="sm" color="gray.600">
                  <strong>Mesafe:</strong>{" "}
                  {calculateDistance(
                    userPosition[0],
                    userPosition[1],
                    selectedMarker.lat,
                    selectedMarker.lng
                  ).toFixed(2)}{" "}
                  km
                </Text>
              )}
            </VStack>
          </div>
        </Box>
      )}

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
        <Button
          colorScheme={showRoute ? "red" : "green"}
          onClick={() => setShowRoute(!showRoute)}
        >
          {showRoute ? "Rotayı Gizle" : "Rotayı Göster"}
        </Button>
      </Box>

      <MapContainer
        center={userPosition || [39.92, 32.85]}
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
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={L.divIcon({
              className: "",
              html: `<div style="background:${marker.color}; border-radius:50%; width:16px; height:16px; border: 2px solid white; box-shadow: 0 0 3px rgba(0,0,0,0.3);"></div>`,
            })}
            eventHandlers={{
              click: () => handleMarkerClick(marker),
            }}
          />
        ))}

        {/* Rota çizgisi */}
        {showRoute && userPosition && sortedMarkers.length > 0 && (
          <Polyline
            positions={routeCoordinates()}
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

export default RotaGoster;
