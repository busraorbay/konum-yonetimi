export interface MarkerData {
  id: string;
  name: string;
  lat: number;
  lng: number;
  color: string;
  distance?: number;
}

export interface LocationFormProps {
  position: [number, number];
  onSave: (name: string, color: string) => void;
  onCancel: () => void;
}

export interface MapClickHandlerProps {
  onMapClick: (lat: number, lng: number) => void;
}
