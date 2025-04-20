import { MarkerData } from "@/types/map";
import { calculateDistance } from "../utils/distance";

export const sortMarkersByDistance = (
  markers: MarkerData[],
  userLat: number,
  userLng: number
): MarkerData[] => {
  return [...markers]
    .map((marker) => ({
      ...marker,
      distance: calculateDistance(userLat, userLng, marker.lat, marker.lng),
    }))
    .sort((a, b) => (a.distance || Infinity) - (b.distance || Infinity));
};

export const createRouteCoordinates = (
  userPosition: [number, number],
  markers: MarkerData[]
): [number, number][] => {
  return [
    userPosition,
    ...markers.map((marker) => [marker.lat, marker.lng] as [number, number]),
  ];
};
