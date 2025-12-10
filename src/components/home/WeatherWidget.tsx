import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  Wind,
} from "lucide-react";

export default function WeatherWidget() {
  return (
    <div className="w-full relative z-1 rounded-xl shadow-sm overflow-hidden">
      <div className="bg-[url(/images/calendar-bg.jpg)] absolute top-0 left-0 w-full h-full bg-cover -z-1" />
      <div className="absolute top-0 left-0 w-full h-full bg-[#2ea4ffc4] dark:bg-[#004276c4] -z-1" />

      <div
        aria-label="content"
        className="flex flex-col items-center justify-center"
      >
        <div className="space-y-2 p-4 text-white flex flex-col items-center">
          <div className="flex items-center gap-8 ">
            <h4 className="text-5xl font-semibold">64°C</h4>
            <CloudSun size={60} />
          </div>

          <span className="text-center text-lg font-semibold w-full">
            Partly Sunny
          </span>

          <div className="flex items-center justify-center gap-4 text-xs">
            <span>Real Feal: 67°</span>
            <span>Chances of Rain: 49%</span>
          </div>
        </div>

        <div className="px-4 py-2 flex text-white text-[.6rem] items-center justify-center gap-2 bg-[#00dbff3b] dark:bg-[#0088ff36] w-full">
          <div className="flex flex-col items-center justify-center gap-2">
            <span className="uppercase">SUN</span>
            <Sun />
            <span>60°</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <span className="uppercase">Mon</span>
            <CloudSun />
            <span>58°</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 ">
            <span className="uppercase">Tue</span>
            <Cloud />
            <span>67</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <span className="uppercase">Wed</span>
            <CloudRain />
            <span>70</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <span className="uppercase">Thu</span>
            <CloudLightning />
            <span>73°</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <span className="uppercase">Fri</span>
            <CloudSnow />
            <span>68°</span>
          </div>

          <div className="flex flex-col items-center justify-center gap-2">
            <span className="uppercase">Sat</span>
            <Wind />
            <span>63°</span>
          </div>
        </div>

        <div className="flex items-center justify-center flex-col p-4">
          <h4 className="text-lg text-white font-semibold">
            Saturday, March 26th
          </h4>
          <span className="text-sm text-white">Karachi, Pakistan</span>
        </div>
      </div>
    </div>
  );
}
