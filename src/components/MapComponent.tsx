"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { addMarker } from "@/store/markerSlice";
import { RootState } from "@/store";
import { useState, useEffect } from "react";
import { Box, Input, Button, VStack, Text } from "@chakra-ui/react";
import L from "leaflet";
import { v4 as uuidv4 } from "uuid";
import {
  MarkerData,
  LocationFormProps,
  MapClickHandlerProps,
} from "@/types/map";

const LocationForm: React.FC<LocationFormProps> = ({
  position,
  onSave,
  onCancel,
}) => {
  const [name, setName] = useState("");
  const [color, setColor] = useState("#ff0000");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSave(name, color);
      setName("");
      setColor("#ff0000");
    }
  };

  return (
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
      <form onSubmit={handleSubmit}>
        <Text fontWeight="bold" mb={2}>
          Seçilen Konum: {position[0].toFixed(5)}, {position[1].toFixed(5)}
        </Text>
        <VStack spacing={3}>
          <Input
            placeholder="Konum Adı"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <Input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <Button colorScheme="teal" type="submit" w="100%">
            Ekle
          </Button>
          <Button variant="outline" onClick={onCancel} w="100%">
            İptal
          </Button>
        </VStack>
      </form>
    </Box>
  );
};

const MapClickHandler: React.FC<MapClickHandlerProps> = ({ onMapClick }) => {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
};

const MapComponent: React.FC = () => {
  const dispatch = useDispatch();
  const markers = useSelector((state: RootState) => state.marker.markers);
  const [selectedPosition, setSelectedPosition] = useState<
    [number, number] | null
  >(null);

 
  useEffect(() => {
    try {
      const savedMarkers = JSON.parse(localStorage.getItem("markers") || "[]");
      savedMarkers.forEach((marker: MarkerData) => {
        dispatch(addMarker(marker));
      });
    } catch (error) {
      console.error("Error loading markers from localStorage:", error);
      localStorage.removeItem("markers"); // Reset if corrupted
    }
  }, [dispatch]);

  const handleSave = (name: string, color: string) => {
    if (!selectedPosition) return;

    const newMarker: MarkerData = {
      id: uuidv4(),
      name,
      lat: selectedPosition[0],
      lng: selectedPosition[1],
      color,
    };

    console.log("Marker Eklendi:", newMarker);

    dispatch(addMarker(newMarker));

    try {
      const currentMarkers = JSON.parse(
        localStorage.getItem("markers") || "[]"
      );
      currentMarkers.push(newMarker);
      localStorage.setItem("markers", JSON.stringify(currentMarkers));
    } catch (error) {
      console.error("Error saving marker to localStorage:", error);
    }

    setSelectedPosition(null);
  };

  const handleMapClick = (lat: number, lng: number) => {
    setSelectedPosition([lat, lng]);
  };

  const handleCancel = () => {
    setSelectedPosition(null);
  };

  return (
    <Box position="relative" w="100%" h="100vh">
      {selectedPosition && (
        <LocationForm
          position={selectedPosition}
          onSave={handleSave}
          onCancel={handleCancel}
        />
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
      >
        <Button as="a" href="/" colorScheme="blue">
          Konumları Listele
        </Button>
      </Box>
      <MapContainer
        center={[39.92, 32.85]} // Ankara merkezi
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <MapClickHandler onMapClick={handleMapClick} />
        {markers.map((marker) => (
          <Marker
            key={marker.id}
            position={[marker.lat, marker.lng]}
            icon={L.divIcon({
              className: "",
              html: `<div style="background:${marker.color}; border-radius:50%; width:16px; height:16px; border: 2px solid white; box-shadow: 0 0 3px rgba(0,0,0,0.3);"></div>`,
            })}
          />
        ))}
      </MapContainer>
    </Box>
  );
};

export default MapComponent;
