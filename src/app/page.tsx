"use client";

import { MainLayout } from "@/components/layouts/MainLayout";
import { LocationList } from "@/components/locations/LocationList";
import { useMarkers } from "@/hooks/useMarkers";

export default function HomePage() {
  const { markers } = useMarkers();

  return (
    <MainLayout>
      <LocationList locations={markers} />
    </MainLayout>
  );
}
