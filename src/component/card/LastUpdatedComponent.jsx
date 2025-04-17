import { useEffect, useState } from "react";

import { PlayIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { handlerFetchingLastUpdateSeason } from "../../utils/handler-fetching-animes";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { formatDateLastUpdate } from "../../utils/handler-date";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import BoxFilterSeasonComponent from "../alert/BoxFilterSeasonComponent";
import { classNames } from "primereact/utils";
import { useProgressBar } from "../utils/ProgressBarProvider";

function LastUpdatedComponent() {
  const [isDataLastUpdate, setIsDataLastUpdate] = useState(null);
  const [isShowUpFilter, setIsShowUpFilter] = useState(false);
  const [isLoadMoreCount, setIsLoadMoreCount] = useState(10);
  const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);
  const [isFilterSeason, setIsFilterSeason] = useState([]);
  const [isFilterYear, setIsFilterYear] = useState([]);

  const { loadingBarState } = useProgressBar();
  const navigate = useNavigate();

  const fetchLastUpdateAnime = async ({ year = null, season = null, limit = isLoadMoreCount } = {}) => {
    try {
      const response = await handlerFetchingLastUpdateSeason({ 
        year: year,
        season: season,
        limit: limit
      });

      if (response?.data.length === 0) {
        toast.error(`Data Anime Season ${season} ${year} Kosong!`);
        return;
      }
      
      setIsDataLastUpdate(response?.data);
    } catch (err) {
      console.error();
      toast.error('Error Load data Anime!');
    }
  }

  const clickLoadMoreLastUpdate = async () => {
    const countingLoadMoreState = isLoadMoreCount + 4;
    setIsLoadingLoadMore(true);
    setIsLoadMoreCount(countingLoadMoreState);

    setTimeout(() => {
      fetchLastUpdateAnime({ limit: countingLoadMoreState, year: isFilterYear.length === 0 ? null : isFilterYear, season: isFilterSeason.length === 0 ? null : isFilterSeason });
      setIsLoadingLoadMore(false);
    }, 1000)
  }

  const checkingAiring = (airing) => {
    if (airing.indexOf('_') === -1) {
      return airing;
    } else {
      const splitAiring = airing.split('_');
      const mappingAiring = splitAiring.map((text) => {
        return text.charAt(0).toUpperCase() + text.slice(1);
      }).join(' ');

      return mappingAiring;
    }
  }

  const checkingRating = (rating) => {
    return !rating ? 'none' : rating;
  }

  useEffect(() => {
    fetchLastUpdateAnime({ limit: isLoadMoreCount, year: isFilterYear.length === 0 ? null : isFilterYear, season: isFilterSeason.length === 0 ? null : isFilterSeason });
  }, [setIsDataLastUpdate, isFilterSeason, isFilterYear]);

  return (
    <>
      <div className="grid grid-cols-12 gap-4 my-10 mx-5 sm:mx-10 md:mx-20 lg:mx-24 p-4">
        <div className="col-span-12">
          <div className="flex items-center justify-center w-full mt-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">This Season</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex items-end justify-end w-full">
            <div className="mx-1 xs:w-full">
              <form className="max-w-md mx-auto">
                <label 
                  htmlFor="search-anime" 
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search Anime
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                  </div>
                  <input type="search" className="block w-full md:w-72 ps-10 px-4 py-2 text-sm text-gray-900 border border-gray-300 rounded-lg bg-ayotaku-super-dark focus:ring-blue-500 focus:border-blue-500dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:opacity-50" placeholder="search anime this season..." />
                </div>
              </form>
              
            </div>
            <div className="mx-2">
              <Tooltip target=".filter-button" content="Filter" className="text-ayotaku-text-sm px-0 py-1"/>
              <button
                className="bg-ayotaku-super-dark text-white px-4 py-2 rounded-lg shadow duration-300 hover:bg-ayotaku-dark filter-button my-1"
                data-pr-position="top"
                onClick={() => setIsShowUpFilter(!isShowUpFilter)}
              >
                <AdjustmentsHorizontalIcon className='h-5 w-5 flex-none dark:text-white'/>
              </button>
            </div>
          </div>
            <BoxFilterSeasonComponent 
              isShowUpFilter={isShowUpFilter}
              setIsFilterSeason={setIsFilterSeason}
              setIsFilterYear={setIsFilterYear}
              setIsLoadMoreCount={setIsLoadMoreCount}
            />
        </div>

        <div className="col-span-12">
          <div className="grid grid-cols-12 gap-4">
            { isDataLastUpdate?.map((item) => (
              <div 
                key={item.id} 
                className="col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2 cursor-pointer group transition duration-500"
              >
                <div 
                  className="flex flex-col bg-ayotaku-super-dark rounded-lg shadow-sm overflow-hidden group min-h-[470px]"
                  onClick={() => loadingBarState(`/anime/${item.slug_anime}`)}
                >
                  {/* Gambar */}
                  <div className="relative w-full h-60 sm:h-64 md:h-48 lg:h-64">
                    <img
                      className="absolute top-0 left-0 w-full h-full object-cover group-hover:opacity-50 transition duration-300"
                      src={item.foto_anime}
                      alt={item.nama_anime.romanji}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />

                    <span 
                      className="absolute bottom-0 left-0 w-full text-sm sm:text-md
                      bg-black bg-opacity-50 px-2 py-1 text-white
                      opacity-100 -translate-x-0
                      sm:opacity-0 sm:-translate-x-5 sm:pointer-events-none
                      sm:group-hover:opacity-100 sm:group-hover:-translate-x-0 sm:group-hover:pointer-events-auto
                      transition-all duration-300 line-clamp-2"
                    >
                      {item.nama_anime.romanji}
                    </span>

                    <div className="flex items-center absolute top-2 right-2 w-fit bg-black bg-opacity-50 text-ayotaku-text-default px-2 py-1 rounded-md text-ayotaku-text-sm gap-1 group-hover:opacity-70 duration-500">
                      <svg className="w-4 h-4 text-yellow-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                      </svg>
                      {checkingRating(item.rating)}
                    </div>
                  </div>


                  {/* Konten */}
                  <div className="p-4 flex flex-col gap-2">

                    {/* Tambahan Konten */}
                    <div className="text-xs text-gray-400">
                      Status: <span className="text-ayotaku-primary-light font-semibold">{checkingAiring(item.status.statusAiring)}</span>
                    </div>
                    <div className="text-xs text-gray-400">
                      Terakhir diupdate: {
                        (item.detail_eps.length === 0) ? 'Tidak ada update' : formatDateLastUpdate(item.detail_eps[0]?.created_at)
                      }
                    </div>

                    <div className="flex items-center justify-center w-full mt-1">
                      <div className="flex-grow border-t border-gray-300"></div>
                      <span className="px-1 text-gray-500 text-ayotaku-text-sm">Episode</span>
                      <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    {/* Episode */}
                    {item.detail_eps.length === 0 ? (
                      <div className="text-sm text-gray-400">Episode Coming Soon</div>
                    ) : (
                      <div className="flex flex-col gap-1 text-sm text-gray-200">
                        {item.detail_eps.slice(0, 3).map((episode) => (
                          <div
                            key={episode.id}
                            className="flex justify-between items-center hover:underline cursor-pointer"
                            onClick={(e) => {
                                e.stopPropagation()
                                loadingBarState(`/anime/${item.slug_anime}/${episode.slug_eps}`)
                              }
                            }
                          >
                            <span className="truncate">{episode.episode}</span>
                            <span className="text-ayotaku-text-xs text-gray-400">{formatDateLastUpdate(episode.created_at)}</span>
                          </div>
                        ))}
                        {item.detail_eps.length > 3 && (
                          <span className="text-ayotaku-text-xs text-gray-400">
                            +{item.detail_eps.length - 3} episode lainnya
                          </span>
                        )}
                      </div>
                    )}

                  </div>
                </div>

              </div>
            )) }
          </div>
        </div>

        <div className="col-span-12 text-center">
          <Button 
            type="button" 
            className="block px-3 py-2.5 rounded-md bg-ayotaku-super-dark dark:text-ayotaku-text-sm hover:bg-ayotaku-box duration-500 pointer-events-auto outline-none"
            label="Load more..."
            size="sm"
            severity="none"
            loading={isLoadingLoadMore}
            onClick={async () => await clickLoadMoreLastUpdate()}
          />
        </div>
      </div>
    </>
  )
}

export default LastUpdatedComponent;