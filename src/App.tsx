import "./App.css";
import { useState, useEffect } from "react";
import useGeoApi from "./hooks/useGeoApi";
import usePlacesApi from "./hooks/usePlacesAPI";
import type { Cafe } from "./types.ts/cafe";
import CafeCard from "./components/CafeCard";
import ShinyText from "./components/ShinyText";
import { useRef } from "react";
import CoffeePattern1 from "./components/CoffeePattern1";
import CoffeePattern2 from "./components/CoffeePattern2";

const apiKey = import.meta.env.VITE_API_KEY;

function App() {
  const { coords, error: geoError } = useGeoApi(apiKey);
  const { error, cafes, fetchCafes, nextPageToken } = usePlacesApi(apiKey);
  const [savedCaffes, setSavedCaffes] = useState<Cafe[]>(() =>
    JSON.parse(localStorage.getItem("savedCafes") || "[]")
  );
  const [alert, setAlert] = useState<string | null>(null);
  const [showSavedList, setShowSavedList] = useState(false);
  const listRef = useRef<HTMLDivElement | null>(null);
  const alertRef = useRef<HTMLDivElement | null>(null);

  function scrollToList() {
    listRef.current?.scrollIntoView({ behavior: "smooth" });
  }
  useEffect(() => {
    console.log("coords changed:", coords);
    if (coords) {
      console.log("Fetching cafes for", coords);
      fetchCafes(coords.lat, coords.lng);
    }
  }, [coords]);

  function saveCafe(cafe: Cafe) {
    setAlert(null);
    setTimeout(() => {
      if (!savedCaffes.find((c) => c.place_id === cafe.place_id)) {
        const newSaved = [...savedCaffes, cafe];
        setSavedCaffes(newSaved);
        localStorage.setItem("savedCafes", JSON.stringify(newSaved));
        setAlert("Saved cafe!");
      } else {
        setAlert("Already saved!");
      }

      setTimeout(() => setAlert(null), 3000);
    }, 10);
  }

  return (
    <>
      <div className="relative h-screen w-full ">
        <div
          className="absolute inset-0
         bg-[url('https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1600&q=80')]
         bg-cover bg-center bg-fixed pb-0"
        />
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
          <button
            onClick={() => {
              setShowSavedList(false);
              coords && fetchCafes(coords.lat, coords.lng);
              scrollToList();
            }}
            className="group px-8 py-3 mb-4 !rounded-full 
              bg-white/10 border border-white/20 
              backdrop-blur-md text-white shadow-lg 
              hover:bg-white/20 active:scale-95 transition duration-300"
          >
            <ShinyText text="Find Cafes Near Me" />
          </button>

          <button
            onClick={() => {
              setShowSavedList(true);
              scrollToList();
            }}
            className="group px-8 py-3 mb-4 !rounded-full 
              bg-white/10 border border-white/20 
              backdrop-blur-md text-white shadow-lg 
              hover:bg-white/20 active:scale-95 transition duration-300"
          >
            <ShinyText text="Show Saved Cafes" />
          </button>
        </div>
      </div>

      <div
        className="min-h-screen w-full pb-1 -mt-8 pt-10
    bg-[linear-gradient(to_bottom,_#f5e6c4_0%,_#e3c79d_10%,_#c49a6c_25%,_#8b5a2b_45%,_#5a3825_60%,_#2e1a0f_90%,_#0d0603_100%)]"
      >
        {/* Alerts */}
        <div ref={listRef} className="max-w-[1480px] mx-auto px-4">
          {geoError && (
            <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded mb-3">
              {geoError}
            </div>
          )}
          {error && (
            <div className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded mb-3">
              {error}
            </div>
          )}
        </div>

        <div>
          {alert && (
            <div
              ref={alertRef}
              className="flex flex-col-reverse justify-items-center items-center gap-2 fixed top-10 right-8 max-w-[250px] text-center rounded-[2vw] 
              bg-[#c29b82] text-[#26180f] text-[23px]  px-4 py-3 mb-3 animate-fadeInOut"
            >
              {alert}
              <img src="/cofee_icon.png" className="w-18 h-18" />
            </div>
          )}
        </div>

        <div className="max-w-[1480px] mx-auto mt-8 px-4 min-h-screen">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {(showSavedList ? savedCaffes : cafes).map((cafe) => (
              <div key={cafe.place_id} className="flex flex-col">
                <div className="flex-1">
                  <CafeCard cafe={cafe} />
                </div>
                {!showSavedList && (
                  <button
                    onClick={() => saveCafe(cafe)}
                    className="relative !rounded-b-[2vw] bg-[#0a0502] text-white px-6 py-3 rounded-md overflow-hidden 
                      hover:shadow-[0_10px_10px_rgba(166,78,23,0.9)] transition-shadow
                    "
                  >
                    <CoffeePattern1 />
                    <CoffeePattern2 />
                    <span className="relative z-10 font-semibold tracking-wide">
                      Save
                    </span>
                  </button>
                )}
                {showSavedList && (
                  <button
                    onClick={() => unSaveCafe(cafe)}
                    className="relative !rounded-b-[2vw] bg-[#0a0502] text-white px-6 py-3 rounded-md overflow-hidden 
                      hover:shadow-[0_10px_10px_rgba(166,78,23,0.9)] transition-shadow
                    "
                  >
                    <CoffeePattern1 />
                    <CoffeePattern2 />
                    <span className="relative z-10 font-semibold tracking-wide">
                      Unsave
                    </span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>

        {!showSavedList && nextPageToken && (
          <div className="mt-10 mb-2 relative z-10 flex flex-col items-center justify-center h-full text-white">
            <button
              onClick={() => fetchCafes()}
              className="group px-8 py-3 mb-4 !rounded-full 
        bg-[#784b32]/50 border border-[#d7b899]/50 
        backdrop-blur-md text-white shadow-lg 
        hover:bg-[#8a563a]/40 active:scale-95 transition duration-300"
            >
              <ShinyText text="Find Cafes Near Me" />
            </button>
          </div>
        )}
        {!showSavedList && !nextPageToken && (
          <div className="flex justify-center mt-13"></div>
        )}
      </div>
    </>
  );
}

export default App;
