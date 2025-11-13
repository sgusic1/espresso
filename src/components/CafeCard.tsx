import type { Cafe } from "../types.ts/cafe";
import coffeeBg from "/coffee_bean.png";

interface cafeProp {
  cafe: Cafe;
}

function CafeCard({ cafe }: cafeProp) {
  return (
    <div className="flex flex-col bg-white rounded-t-[2vw] shadow-md overflow-hidden hover:shadow-lg transition">
      <div className="h-70 overflow-hidden">
        <img
          src={cafe.photo}
          alt="Oops, no photos available"
          className="w-full h-full object-cover"
        />
      </div>

      <div className="relative w-full min-h-[160px] rounded-b-lg overflow-hidden">
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{
            backgroundImage: `url(${coffeeBg})`,
            opacity: 0.3,
          }}
        ></div>

        {/* Foreground content */}
        <div className="relative z-10 p-4 text-center !text-[#241006]">
          <h5 className="text-lg font-semibold h-12 overflow-hidden text-shadow-lg/5">
            {cafe.name}
          </h5>

          <div className="flex justify-between gap-1 mt-1 text-[#38190a] text-[20px]">
            <div>⭐{cafe.rating}</div>
            <div className="flex items-center">
              <img src="/location.png" className="w-4 h-4" />
              {cafe.distance}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CafeCard;
