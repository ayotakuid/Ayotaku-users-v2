import { Button } from "primereact/button";
import { MultiSelect } from "primereact/multiselect";
import { classNames } from "primereact/utils";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { Tailwind } from '../../utils/handler-theming-multiselect';

function BoxFilterSeasonComponent({ isShowUpFilter, setIsFilterSeason, setIsFilterYear, setIsLoadMoreCount }) {

  const [isActive, setIsActive] = useState(false);
  const [selectedSeasons, setSelectedSeasons] = useState([]);
  const [selectedYears, setSelectedYears] = useState([]);

  const clearStateFilter = () => {
    setTimeout(() => {
      setIsFilterSeason([]);
      setIsFilterYear([]);
      setSelectedSeasons([]);
      setSelectedYears([]);
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

  const yearsOptions = () => {
    const year = Array.from({ length: 16 }, (_, i) => new Date().getFullYear() - i);
    return year.map((year) => ({
      label: year.toString(),
      value: year,
    }));
  };

  return (
    <>
      <div className={classNames(
        isActive ? 'translate-y-0 opacity-100 pointer-events-auto' : 'translate-y-5 opacity-0 pointer-events-none',
        'absolute text-ayotaku-text-sm top-full right-2 mt-2 bg-ayotaku-super-dark border border-gray-700 text-white py-2 px-3 rounded-lg shadow-lg min-w-full z-50 normal-case overflow-y-auto transition-all duration-300 w-60 md:w-72'
      )}>
        <div className="flex flex-wrap justify-between my-2">
          <span className="text-start text-lg">Filter Season</span>
        </div>

        <div className="grid grid-cols-12 mt-5 mb-2">

          <div className="col-span-12">
            <span className="text-base text-ayotaku-text-default px-1">Season</span>
            <div className="card flex justify-center my-1">
              <MultiSelect 
                filter
                value={selectedSeasons}
                onChange={(e) => setSelectedSeasons(e.value)}
                options={["Winter", "Spring", "Summer", "Fall"]}
                placeholder="Select Season"
                className="w-full md:w-20rem text-ayotaku-text-sm p-1"
                display="chip"
                maxSelectedLabels={5}
                pt={Tailwind.multiselect}
              />
            </div>
          </div>

          <div className="col-span-12 my-2">
            <span className="text-base text-ayotaku-text-default px-1">Year</span>
            <div className="card flex justify-center my-1">
              <MultiSelect 
                filter
                value={selectedYears}
                onChange={(e) => setSelectedYears(e.value)}
                options={yearsOptions()}
                placeholder="Select Year"
                className="w-full md:w-20rem text-ayotaku-text-sm p-1"
                maxSelectedLabels={5}
                display="chip"
                pt={Tailwind.multiselect}
              />
            </div>
          </div>

          <div className="col-span-12 px-1">
            <button
              type="button"
              className="text-ayotaku-text-default text-ayotaku-text-sm bg-gray-900 px-3 py-1.5 rounded-sm hover:bg-gray-600 duration-300 transition-all active:scale-75"
              onClick={handlerFilter}
            >
              Apply
            </button>
            <button
              type="button"
              className="text-ayotaku-text-default text-ayotaku-text-sm px-3 py-1.5 rounded-sm hover:underline duration-300 transition-all active:scale-75"
              onClick={clearStateFilter}
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      
    </>
  );
}

export default BoxFilterSeasonComponent;