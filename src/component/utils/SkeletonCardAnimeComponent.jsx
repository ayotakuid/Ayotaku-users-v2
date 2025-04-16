import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

function SkeletonCardAnimeComponent() {
  return (
    <div 
      className='col-span-6 sm:col-span-3 md:col-span-3 lg:col-span-2 gap-1 mb-2 w-auto max-w-xs overflow-hidden group'
    >
      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <Skeleton 
          count={1}
          duration={2}
          className="w-full h-60 rounded-lg object-cover cursor-pointer duration-300 opacity-40"
        />
      </SkeletonTheme>

      <SkeletonTheme baseColor="#e0e0e0" highlightColor="#f5f5f5">
        <Skeleton 
          count={1}
          duration={2}
          className="text-md font-semibold text-ayotaku-text-default line-clamp-2 group-hover:underline duration-300 cursor-pointer opacity-40 mt-1.5"
        />
      </SkeletonTheme>
    </div>
  )
}

export default SkeletonCardAnimeComponent;