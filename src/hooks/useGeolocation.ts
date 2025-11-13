import { useEffect, useState } from "react";

export function useGeolocation() {
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(
    null
  );

  useEffect(() => {
    const cached = JSON.parse(localStorage.getItem("cachedLocation") || "null");
    const now = Date.now();

    if (cached && now - cached.timestamp < 10 * 60 * 1000) {
      setCoords({ lat: cached.lat, lng: cached.lng });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        localStorage.setItem(
          "cachedLocation",
          JSON.stringify({ lat, lng, timestamp: now })
        );
        setCoords({ lat, lng });
      },
      (err) => {
        console.error("Geolocation error:", err);
        if (err.code === 1) alert("Location access denied.");
        else if (err.code === 2) alert("Position unavailable.");
        else if (err.code === 3) alert("Request timed out.");
        else alert("Unknown geolocation error.");
      },
      { timeout: 20000, maximumAge: 5 * 60 * 1000 }
    );
  }, []);

  return coords;
}

export default useGeolocation;
