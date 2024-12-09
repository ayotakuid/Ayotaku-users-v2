import { useEffect, useState } from "react";

import { PlayIcon, AdjustmentsHorizontalIcon } from '@heroicons/react/24/solid';
import { handlerFetchingLastUpdateSeason } from "../../utils/handler-fetching-animes";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";
import { formatDateLastUpdate } from "../../utils/handler-date";
import { Button } from "primereact/button";
import { Tooltip } from "primereact/tooltip";
import BoxFilterSeasonComponent from "../alert/BoxFilterSeasonComponent";

function LastUpdatedComponent() {
  const [isDataLastUpdate, setIsDataLastUpdate] = useState(null);
  const [isShowUpFilter, setIsShowUpFilter] = useState(false);
  const [isLoadMoreCount, setIsLoadMoreCount] = useState(10);
  const [isLoadingLoadMore, setIsLoadingLoadMore] = useState(false);

  const navigate = useNavigate();

  const fetchLastUpdateAnime = async ({ year = null, season = null, limit = isLoadMoreCount } = {}) => {
    try {
      const response = await handlerFetchingLastUpdateSeason({ 
        year: year,
        season: season,
        limit: limit
      });
      
      setIsDataLastUpdate(response?.data);
    } catch (err) {
      console.error();
      toast.error('Error Load data Anime!');
    }
  }

  const clickLoadMoreLastUpdate = async () => {
    const countingLoadMoreState = isLoadMoreCount + 10;
    setIsLoadingLoadMore(true);
    setIsLoadMoreCount(countingLoadMoreState);
    
    setTimeout(() => {
      fetchLastUpdateAnime({ limit: countingLoadMoreState });
      setIsLoadingLoadMore(false);
    }, 1000)
  }

  useEffect(() => {
    fetchLastUpdateAnime({ limit: isLoadMoreCount });
  }, [setIsDataLastUpdate])
  return (
    <>
      <div className="grid grid-cols-12 gap-4 my-10 mx-5 sm:mx-10 md:mx-20 lg:mx-24">
        <div className="col-span-12">
          <div className="flex items-center justify-center w-full mt-4">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="px-3 text-gray-500">This Season</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="flex items-end justify-end w-full">
            <Tooltip target=".filter-button" content="Filter Season" className="text-ayotaku-text-sm px-0 py-1"/>
            <button
              className="bg-ayotaku-super-dark text-white px-4 py-2 rounded-lg shadow duration-300 hover:bg-ayotaku-dark filter-button"
              data-pr-position="top"
              onClick={() => setIsShowUpFilter(!isShowUpFilter)}
            >
              <AdjustmentsHorizontalIcon className='h-5 w-5 flex-none dark:text-white'/>
            </button>

            <BoxFilterSeasonComponent isShowUpFilter={isShowUpFilter} />
          </div>
        </div>

        {
          isDataLastUpdate?.map((item) => (
            <div 
              key={item.id} 
              className='col-span-12 md:col-span-4 sm:col-span-6 gap-1 bg-ayotaku-super-dark text-ayotaku-text-default rounded-lg mb-2'
            >
              <div className='grid grid-cols-12 h-full'>
                <div 
                  className='col-span-4'
                >
                  <img 
                      src={item.foto_anime} 
                      alt={item.nama_anime.romanji} 
                      className='w-auto md:w-44 h-full object-cover rounded-md hover:opacity-50 duration-500 hover:cursor-pointer'
                      referrerPolicy='no-referrer'
                      onClick={(e) => {
                        e.stopPropagation(); 
                        navigate(`/anime/${item.slug_anime}`)
                      }}
                    />
                </div>

                <div className='col-span-8 flex flex-col mx-2'>
                  <Link 
                    to={`/anime/${item.slug_anime}`} 
                    className="font-bold mb-2 px-1 pt-2 text-sm md:text-base line-clamp-2 hover:underline"
                  >
                    {item.nama_anime.romanji}
                  </Link>
                  <div className="w-full h-px bg-gray-600"></div>
                  <div className='grid grid-cols-1 text-ayotaku-text-sm md:text-sm m-2 gap-1'>

                    {
                      item.detail_eps.length === 0 ? (
                        <div className="text-center text-gray-400 font-semibold mt-2">
                          Episode Coming Soon
                        </div>
                      ) : (
                        item.detail_eps.map((episode) => (
                          <div 
                            className="col-span-1 flex justify-between items-center"
                            key={episode.id}
                          >
                            <div 
                              className="flex items-center hover:underline hover:cursor-pointer"
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/anime/${item.slug_anime}/${episode.slug_eps}`);
                              }}
                            >
                              <PlayIcon className="w-4 mr-1" />
                              <span>{episode.episode}</span>
                            </div>
                            <span className="text-opacity-40 text-ayotaku-text-default">{formatDateLastUpdate(episode.created_at)}</span>
                          </div>
                        ))
                      )
                    }

                  </div>
                </div>
              </div>
            </div>
          ))
        }

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