import { useState, useEffect } from "react";

function useGeoApi(key: string) {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cached = JSON.parse(localStorage.getItem("cachedLocation") || "null");
    const now = Date.now();

    if (cached && now - cached.timestamp < 60 * 60 * 1000) {
      setCoords({ lat: cached.lat, lng: cached.lng });
      return;
    }

    async function fetchLocation() {
      try {
        const res = await fetch(
          `https://www.googleapis.com/geolocation/v1/geolocate?key=${key}`,
          {
            method: "POST",
          }
        );

        if (!res.ok) {
          setError(`Geolocation API error: ${res.status}`);
          return;
        }

        const data = await res.json();
        console.log("Geo API response:", data);

        if (data?.location) {
          const lat = data.location.lat;
          const lng = data.location.lng;

          localStorage.setItem(
            "cachedLocation",
            JSON.stringify({ lat, lng, timestamp: now })
          );

          setCoords({ lat, lng });
        } else {
          setError("No location data returned from Google API");
        }
      } catch {
        setError("Network error contacting Google Geolocation API");
      }
    }

    fetchLocation();
  }, [key]);

  return { coords, error };
}

export default useGeoApi;
