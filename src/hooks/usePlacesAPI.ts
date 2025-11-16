import type { Cafe } from "../types.ts/cafe";
import { useState } from "react";

function distanceInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function usePlacesApi(key: string) {
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [nextPageToken, setNextPageToken] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function fetchCafes(lat?: number, lng?: number) {
    const radius = 1500;
    const proxy = "http://localhost:3001/api/proxy?url=";

    let endpoint: string;
    if (nextPageToken) {
      await new Promise((r) => setTimeout(r, 2000));
      endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?pagetoken=${nextPageToken}&key=${key}`;
    } else if (lat && lng) {
      endpoint = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${lng}&radius=${radius}&type=cafe&key=${key}`;
    } else {
      return;
    }
    const url = proxy + encodeURIComponent(endpoint);

    const cachedUrl = localStorage.getItem("cachedUrl");
    const cachedCafes = localStorage.getItem("cachedCafes");
    const cachedToken = localStorage.getItem("cachedNextPageToken");
    const cachedTime = Number(localStorage.getItem("cachedTime") || "0");

    const cacheExpiry = 1000 * 60 * 60;
    const isCacheValid =
      cachedUrl === url && cachedCafes && Date.now() - cachedTime < cacheExpiry;

    if (isCacheValid) {
      setCafes(JSON.parse(cachedCafes));
      setNextPageToken(cachedToken || null);
      return;
    }

    try {
      console.log("Fetching from:", url);
      const res = await fetch(url);
      const data = await res.json();
      console.log("Places API data:", data);

      if (data) {
        const fetched_cafes = data.results
          .filter(
            (c: any) =>
              c.name &&
              c.place_id &&
              c.geometry?.location?.lat &&
              c.geometry?.location?.lng &&
              Array.isArray(c.photos) &&
              c.photos.length > 0 &&
              typeof c.photos[0].photo_reference === "string" &&
              c.photos[0].photo_reference.trim() !== "" &&
              typeof c.rating === "number"
          )
          .map((c: any) => ({
            name: c.name,
            place_id: c.place_id,
            photo: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&maxheight=300&photo_reference=${c.photos[0].photo_reference}&key=${key}`,
            rating: c.rating || "N/A",
            distance:
              lat && lng
                ? distanceInKm(
                    lat,
                    lng,
                    c.geometry.location.lat,
                    c.geometry.location.lng
                  ).toFixed(2) + " km"
                : "—",
          }));

        setCafes((prev) => {
          const merged = [...prev, ...fetched_cafes];
          const unique = merged.filter(
            (c, i, arr) => arr.findIndex((x) => x.place_id === c.place_id) === i
          );

          unique.sort(
            (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
          );

          localStorage.setItem("cachedCafes", JSON.stringify(unique));
          localStorage.setItem("cachedUrl", url);
          localStorage.setItem(
            "cachedNextPageToken",
            data.next_page_token || ""
          );
          localStorage.setItem("cachedTime", String(Date.now()));
          return unique;
        });

        setNextPageToken(data.next_page_token || null);
      } else {
        setError("Couldn't fetch data!");
      }
    } catch (err) {
      console.error("Places API fetch failed:", err);
      setError("Network problem!");
    }
  }

  return { error, cafes, fetchCafes, nextPageToken };
}

export default usePlacesApi;
