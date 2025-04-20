import { v4 as uuidv4 } from "uuid";
import { MarkerData } from "@/types/map";
import { getFromStorage, saveToStorage } from "../utils/storage";

const STORAGE_KEY = "markers";

export const getMarkersFromStorage = (): MarkerData[] => {
  return getFromStorage<MarkerData[]>(STORAGE_KEY, []);
};

export const saveMarkerToStorage = (marker: MarkerData): void => {
  const currentMarkers = getMarkersFromStorage();
  const newMarkers = [...currentMarkers, marker];
  saveToStorage(STORAGE_KEY, newMarkers);
};

export const updateMarkerInStorage = (updatedMarker: MarkerData): void => {
  const currentMarkers = getMarkersFromStorage();
  const newMarkers = currentMarkers.map((marker) =>
    marker.id === updatedMarker.id ? updatedMarker : marker
  );
  saveToStorage(STORAGE_KEY, newMarkers);
};

export const createMarker = (
  name: string,
  lat: number,
  lng: number,
  color: string
): MarkerData => {
  return {
    id: uuidv4(),
    name,
    lat,
    lng,
    color,
  };
};

export const getMarkerById = (id: string): MarkerData | null => {
  const markers = getMarkersFromStorage();
  return markers.find((marker) => marker.id === id) || null;
};
