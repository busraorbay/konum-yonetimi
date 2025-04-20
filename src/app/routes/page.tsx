"use client";

import { useEffect, useState } from "react";
import { Box, Text, VStack, CloseButton } from "@chakra-ui/react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { MapView } from "@/components/map/MapView";
import { useMarkers } from "@/hooks/useMarkers";
import { useUserLocation } from "@/hooks/useUserLocation";
import { calculateDistance } from "@/lib/utils/distance";
import {
  sortMarkersByDistance,
  createRouteCoordinates,
} from "@/lib/services/routeService";
import { MarkerData } from "@/types/map";

export default function RoutesPage() {
  const { markers } = useMarkers();
  const { userPosition } = useUserLocation();
  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [sortedMarkers, setSortedMarkers] = useState<MarkerData[]>([]);

  useEffect(() => {
    if (userPosition && markers.length > 0) {
      const sorted = sortMarkersByDistance(
        markers,
        userPosition[0],
        userPosition[1]
      );
      setSortedMarkers(sorted);
    }
  }, [userPosition, markers]);

  const handleMarkerClick = (marker: MarkerData) => {
    console.log("Marker tıklandı (RoutesPage):", marker);
    setSelectedMarker(marker);
  };

  const handleCloseInfo = () => {
    setSelectedMarker(null);
  };

  const routeCoordinates = userPosition
    ? createRouteCoordinates(userPosition, sortedMarkers)
    : undefined;

  return (
    <MainLayout>
      <Box position="relative" w="100%" h="100vh">
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
            <CloseButton
              position="absolute"
              top={2}
              right={2}
              onClick={handleCloseInfo}
            />
            <VStack spacing={3} align="start">
              <Text fontSize="sm" fontWeight="bold" color="gray.600">
                📍 Seçilen Konum: {selectedMarker.name}
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
          </Box>
        )}

        <MapView
          markers={markers}
          userPosition={userPosition}
          showRouteButton={true}
          routeCoordinates={routeCoordinates}
          onMarkerClick={handleMarkerClick}
        />
      </Box>
    </MainLayout>
  );
}
