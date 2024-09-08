import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ImageRenderComponent from "../utils/ImageRenderComponent";
import SvgRenderComponent from "../utils/SvgRenderComponent";

function ProfileImageNavbarComponent({
  isLoadingEntirePage,
  isUserMenuOpen,
  setIsUserMenuOpen,
  setIsNotifMenuOpen,
  setIsMobileMenuOpen,
  isProfileUser
}) {
  return (
    <>
    {(isLoadingEntirePage) ? (
      <div className='-mt-2'>
        <SkeletonTheme
          baseColor="#e3e3e3"
          highlightColor="#969696"
        >
          <Skeleton width={32} height={32} borderRadius={100} />
        </SkeletonTheme>
      </div>
    ) : (
      <div>
        <button
          type='button'
          className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
          id="user-menu-button"
          aria-expanded={isUserMenuOpen}
          aria-haspopup="true"
          onClick={() => {
            setIsUserMenuOpen(!isUserMenuOpen)
            setIsNotifMenuOpen(false)
            setIsMobileMenuOpen(false)
          }}  // Toggle user dropdown
        >
          <span className="absolute -inset-1.5"></span>
          <span className="sr-only">Open user menu</span>
          {
            (isProfileUser?.via_register === 'google')
            ?
            <ImageRenderComponent 
              imageUrl={isProfileUser?.from_google.picture}
              classTailwind={'h-8 w-8 rounded-full'}
              altText={isProfileUser?.from_google.email}
            />
            :
            <SvgRenderComponent 
              svgString={isProfileUser?.from_google.picture}
              classTailwind={'h-8 w-8 rounded-full'}
            />
          }
        </button>
      </div>
    )}
    </>
  )
}

export default ProfileImageNavbarComponent;