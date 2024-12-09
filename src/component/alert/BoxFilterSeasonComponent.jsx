import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";

function BoxFilterSeasonComponent({ isShowUpFilter }) {

  const [isAcitve, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(isShowUpFilter);
  }, [setIsActive, isShowUpFilter]);

  return (
    <div className={classNames(
      "absolute right-20 md:right-40 sm:right-28 z-10 mt-2 p-4 rounded-md bg-ayotaku-box py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none transform translate-y-24",
      (isAcitve) ? 'absolute' : 'hidden',
    )}>
      <div className="flex flex-col space-y-2">
        {["Winter", "Spring", "Summer", "Fall"].map((season) => (
          <label key={season} className="flex items-center">
            <input
              type="checkbox"
              value={season}
              // checked={selectedSeasons.includes(season)}
              onChange={() => {}}
              className="mr-2"
            />
              {season}
          </label>
        ))}
      </div>
    </div>
  )
}

export default BoxFilterSeasonComponent;