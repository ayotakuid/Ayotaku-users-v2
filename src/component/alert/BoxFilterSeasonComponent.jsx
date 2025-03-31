import { Button } from "primereact/button";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

function BoxFilterSeasonComponent({ isShowUpFilter, setIsFilterSeason, setIsFilterYear, setIsLoadMoreCount }) {

  const [isActive, setIsActive] = useState(false);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);

  const clearStateFilter = () => {
    setTimeout(() => {
      setIsFilterSeason([]);
      setIsFilterYear([]);
    }, 1000);
  }

  useEffect(() => {
    setIsActive(isShowUpFilter);
  }, [setIsActive, isShowUpFilter]);

  const handlerFilter = () => {
    if (selectedSeasons.length === 0 || selectedYears.length === 0) {
      toast.error('Please select season and year!');
      clearStateFilter();
      return;
    }

    setIsFilterSeason(selectedSeasons);
    setIsFilterYear(selectedYears);
    setIsLoadMoreCount(8);
  }

  return (
    <div className={classNames(
      isActive ? "block" : "hidden",
      "grid grid-cols-1 gap-4 p-4 rounded-md bg-ayotaku-super-dark shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none text-xs",
    )}>
      <div className="font-bold text-base">Filter Season</div>
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-2 group">
        {["Winter", "Spring", "Summer", "Fall"].map((season) => (
          <label key={season} className="flex items-center">
            <input
              type="checkbox"
              checked={selectedSeasons.includes(season)}
              onChange={() => {
                setSelectedSeasons((prev) =>
                  prev.includes(season)
                    ? prev.filter((s) => s !== season)
                    : [...prev, season]
                );
              }}
              className="mr-2 w-4 h-4 accent-ayotaku-accent-checkbox group-hover:cursor-pointer border-gray-300 focus:ring-ayotaku-ring cursor-pointer"
            />
            <span className="group-hover:cursor-pointer">{season}</span>
          </label>
        ))}
      </div>

      <div className="font-bold text-base">Filter Year</div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="grid grid-cols-4 sm:grid-cols-6 gap-1 group">
          {Array.from({ length: 16 }, (_, i) => new Date().getFullYear() - i).map(
            (year) => (
              <label key={year} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedYears.includes(year)}
                  onChange={() => {
                    setSelectedYears((prev) =>
                      prev.includes(year)
                        ? prev.filter((s) => s !== year)
                        : [...prev, year]
                    );
                  }}
                  className="mr-2 w-4 h-4 accent-ayotaku-accent-checkbox group-hover:cursor-pointer border-gray-300 focus:ring-ayotaku-ring cursor-pointer"
                />
                <span className="group-hover:cursor-pointer">{year}</span>
              </label>
            )
          )}
        </div>
      </div>

      <div className="">
        <Button 
          type="button" 
          className="block px-3 py-2.5 rounded-md bg-ayotaku-box dark:text-ayotaku-text-sm duration-500 pointer-events-auto outline-none"
          label="Submit"
          size="sm"
          severity="none"
          onClick={handlerFilter}
        />
      </div>
    </div>
  );
}

export default BoxFilterSeasonComponent;