import { useState, useEffect } from "react";

export const useUserLocation = (
  defaultLocation: [number, number] = [39.92, 32.85]
) => {
  const [userPosition, setUserPosition] = useState<[number, number] | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      setLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserPosition([latitude, longitude]);
          setLoading(false);
        },
        (err) => {
          console.error("Geolocation error:", err);
          setError("Konum bilgisi alınamadı.");
          setLoading(false);
          setUserPosition(defaultLocation);
        }
      );
    } else {
      setError("Tarayıcınız konum hizmetini desteklemiyor.");
      setUserPosition(defaultLocation);
    }
  }, [defaultLocation]);

  return { userPosition, loading, error };
};
