"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { Box } from "@chakra-ui/react";
import { MapView } from "@/components/map/MapView";
import { addMarker } from "@/store/markerSlice";
import {
  createMarker,
  saveMarkerToStorage,
} from "@/lib/services/locationService";
import { LocationForm } from "@/components/locations/LocationForm";
import { MainLayout } from "@/components/layouts/MainLayout";
import { useMarkers } from "@/hooks/useMarkers";

export default function AddLocationPage() {
  const [selectedPosition, setSelectedPosition] = useState<
    [number, number] | null
  >(null);
  const { markers } = useMarkers();
  const dispatch = useDispatch();
  const router = useRouter();

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedPosition([lat, lng]);
  };
  const handleCloseForm = () => {
    setSelectedPosition(null);
  };

  const handleAddLocation = (name: string, color: string) => {
    if (!selectedPosition) return;

    const newMarker = createMarker(
      name,
      selectedPosition[0],
      selectedPosition[1],
      color
    );

    dispatch(addMarker(newMarker));
    saveMarkerToStorage(newMarker);

    router.push("/");
  };

  return (
    <MainLayout>
      <Box position="relative" w="100%" h="100vh">
        {selectedPosition ? (
          <Box
            position="absolute"
            top={4}
            left={4}
            bg="white"
            p={4}
            rounded="md"
            shadow="md"
            zIndex={1000}
            w="300px"
          >
            <LocationForm
              title="Yeni Konum"
              submitButtonText="Ekle"
              onSubmit={handleAddLocation}
              onClose={handleCloseForm}
            />
          </Box>
        ) : null}

        <MapView markers={markers} onMapClick={handleMapClick} />
      </Box>
    </MainLayout>
  );
}
