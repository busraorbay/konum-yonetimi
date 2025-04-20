"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useToast } from "@chakra-ui/react";
import { MainLayout } from "@/components/layouts/MainLayout";
import { LocationForm } from "@/components/locations/LocationForm";
import { updateMarker } from "@/store/markerSlice";
import {
  getMarkerById,
  updateMarkerInStorage,
} from "@/lib/services/locationService";
import { MarkerData } from "@/types/map";

export default function UpdateLocationPage() {
  const params = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useToast();
  const locationId = params?.id as string;

  const [location, setLocation] = useState<MarkerData | null>(null);

  useEffect(() => {
    try {
      const foundLocation = getMarkerById(locationId);

      if (foundLocation) {
        setLocation(foundLocation);
      } else {
        toast({
          title: "Konum bulunamadı",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setTimeout(() => router.push("/"), 1000);
      }
    } catch (error) {
      console.error("Konum yüklenirken hata:", error);
      toast({
        title: "Konum yüklenirken hata oluştu",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
    }
  }, [locationId, router, toast]);
  const handleCloseForm = () => {
    router.back();
  };

  const handleUpdateLocation = (name: string, color: string) => {
    if (!location) return;

    try {
      const updatedLocation = {
        ...location,
        name,
        color,
      };

      dispatch(updateMarker(updatedLocation));
      updateMarkerInStorage(updatedLocation);

      router.push("/");
    } catch (error) {
      console.error("Konum güncellenirken hata:", error);
      toast({
        title: "Konum güncellenirken hata oluştu",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <MainLayout>
      {location ? (
        <LocationForm
          title="Konum Güncelle"
          onClose={handleCloseForm}
          submitButtonText="Güncelle"
          initialData={location}
          onSubmit={handleUpdateLocation}
        />
      ) : null}
    </MainLayout>
  );
}
