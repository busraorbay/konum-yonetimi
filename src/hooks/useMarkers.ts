import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { addMarker } from "@/store/markerSlice";
import { MarkerData } from "@/types/map";
import { getMarkersFromStorage } from "@/lib/services/locationService";

export const useMarkers = () => {
  const dispatch = useDispatch();
  const markers = useSelector((state: RootState) => state.marker.markers);

  useEffect(() => {
    const loadMarkers = () => {
      try {
        const savedMarkers = getMarkersFromStorage();
        savedMarkers.forEach((marker: MarkerData) => {
          dispatch(addMarker(marker));
        });
      } catch (error) {
        console.error("Konumlar yüklenirken hata oluştu:", error);
      }
    };

    if (typeof window !== "undefined") {
      loadMarkers();
    }
  }, [dispatch]);

  return { markers };
};
