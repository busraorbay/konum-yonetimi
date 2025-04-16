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
      state.markers.push(action.payload);
    },
    updateMarker: (state, action: PayloadAction<MarkerData>) => {
      const index = state.markers.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.markers[index] = action.payload;
      }
    },
  },
});

export const { addMarker, updateMarker } = markerSlice.actions;
export default markerSlice.reducer;
