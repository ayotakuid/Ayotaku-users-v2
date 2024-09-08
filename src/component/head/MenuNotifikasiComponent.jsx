import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function MenuNotifikasiComponent({ isLoadingEntirePage }) {
  return (
    <div 
      className='absolute right-12 z-10 mt-2 w-72 sm:w-96 origin-top-right rounded-md bg-ayotaku-normal-light py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none' 
      role='menu' 
      aria-orientation='vertical' 
      aria-labelledby='notif-menu-button' 
      tabIndex='-1'
    >

      <div className="group relative flex items-center gap-x-3 rounded-lg p-2 text-sm leading-6 hover:bg-ayotaku-light">

        {(!isLoadingEntirePage) ? (
          <div className="flex h-auto w-12 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
            <img src="https://cdn.myanimelist.net/images/anime/1825/142258.jpg" className='rounded-lg' alt="" />
          </div> 
        ) : (
          <SkeletonTheme
            baseColor='#e3e3e3'
            highlightColor='#969696'
          >
            <Skeleton className='flex h-auto w-12 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white' width={48} height={67}/>
          </SkeletonTheme> 
        )}

          <div className="flex-auto">
            <a href="#" className="block font-semibold text-gray-900 text-ayotaku-text-sm sm:text-sm">
              Tokidoki Bosotto Russia-go de Dereru Tonari ...
            </a>
            <p className="mt-3 text-gray-600 text-ayotaku-text-xs sm:text-ayotaku-text-sm">Episode 05 Updated!</p>
          </div>
      </div>

      <div className="grid grid-cols-1 divide-x divide-gray-900/5 bg-ayotaku-light">
        <a href="#" className="flex items-center justify-center p-1 text-ayotaku-text-sm text-sm font-semibold text-gray-900 hover:underline hover:underline-offset-2">
          Show more...
        </a>
      </div>

    </div>
  )
}

export default MenuNotifikasiComponent;