import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MarkerData } from "@/types/map";

interface MarkerState {
  markers: MarkerData[];
}

const initialState: MarkerState = {
  markers: [],
};

const markerSlice = createSlice({
  name: "marker",
  initialState,
  reducers: {
    addMarker: (state, action: PayloadAction<MarkerData>) => {
      const exists = state.markers.some(
        (marker) => marker.id === action.payload.id
      );
      if (!exists) {
        state.markers.push(action.payload);
      }
    },
    updateMarker: (state, action: PayloadAction<MarkerData>) => {
      const index = state.markers.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.markers[index] = action.payload;
      }
    },

    setMarkers: (state, action: PayloadAction<MarkerData[]>) => {
      state.markers = action.payload;
    },
  },
});

export const { addMarker, updateMarker, setMarkers } = markerSlice.actions;
export default markerSlice.reducer;
