import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { classNames } from 'primereact/utils';
import { Button } from 'primereact/button';

// IMPORT UTILS
import { BellIcon, UserPlusIcon, UserIcon } from '@heroicons/react/24/outline';
import AyotakuLogo from '../../image/icon-circle.svg';

// IMPORT COMPONENT
import ProfileMenuDropdown from './ProfileMenuDropdown';
import MenuNotifikasiComponent from './MenuNotifikasiComponent';
import ProfileImageNavbarComponent from './ProfileImageNavbarComponent';
import { useProgressBar } from '../utils/ProgressBarProvider';

const navigation = [
  { name: 'Home', href: '/', current: false },
  { name: 'Anime', href: '/anime', current: false },
  { name: 'Genres', href: '/#', current: false },
];

function NavbarComponent({
  isLoadingEntirePage,
  isCookiesDefault,
  isProfileUser,
  setIsProfileUser,
  setIsCookiesDefault,
}) {
  const navigate = useNavigate();
  const { loadingBarState } = useProgressBar();

  // STATE MANAGEMENT
  const [isNavigation, setIsNavigation] = useState(navigation);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);  // State untuk dropdown user
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);  // State untuk mobile menu
  const [isNotifMenuOpen, setIsNotifMenuOpen] = useState(false);
  const [isNotAuthMenuOpen, setIsNotAuthMenuOpen] = useState(false);

  const handlerClickNavigation = (name, href) => {
    const updatedNavigation = isNavigation.map((item) =>
      item.name === name ? { ...item, current: true } : { ...item, current: false }
    );
  
    loadingBarState(href);
    setIsNavigation(updatedNavigation);
  };

  return (
    <>
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-center">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded={isMobileMenuOpen}
                onClick={() => {
                  setIsMobileMenuOpen(!isMobileMenuOpen)
                  setIsUserMenuOpen(false)
                  setIsNotifMenuOpen(false)
                  setIsNotAuthMenuOpen(false)
                }}  // Toggle mobile menu
              >
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>

                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>

                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center cursor-pointer" onClick={() => navigate('/')}>
                <img className='h-10 w-auto' src={AyotakuLogo} alt='Ayotaku.id'/>
              </div>

              <div className='hidden sm:ml-6 sm:block'>
                <div className='flex space-x-4'>
                  {
                    isNavigation.map((item) => (
                      <button
                        key={item.name}
                        aria-current={item.current ? 'page' : undefined}
                        className={classNames(
                          item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                          'rounded-md px-3 py-2 mt-1 text-sm font-medium',
                        )}
                        onClick={() => handlerClickNavigation(item.name, item.href)}
                      >
                        {item.name}
                      </button>
                    ))
                  }
                </div>
              </div>
            </div>

            {
              (isCookiesDefault?.isLogin === 'false' || isCookiesDefault?.token === 'null') ? (
                <>
                  <button 
                    className='hidden items-center justify-center gap-x-1.5 p-2 font-semibold leading-5 dark:text-gray-700 dark:bg-ayotaku-light hover:dark:bg-ayotaku-bit-dark rounded-lg text-ayotaku-text-sm sm:flex'
                    onClick={() => navigate('/register')}
                  >
                    <UserPlusIcon className='h-5 w-5 flex-none dark:text-gray-700'/>
                    Sign Up
                  </button>

                  <button 
                    className='hidden items-center justify-center gap-x-1.5 p-2 font-semibold leading-5 dark:text-ayotaku-text-default dark:bg-ayotaku-dark hover:dark:bg-ayotaku-super-dark mx-3 my-5 rounded-lg text-ayotaku-text-sm sm:flex'
                    onClick={() => navigate('/login')}
                  >
                    <UserIcon className='h-5 w-5 flex-none dark:text-ayotaku-text-default'/>
                    Sign In
                  </button>

                  {/* BUTTON UNTUK MOBILE SEMBUNYIKAN BUTTON SIGN IN DAN SIGN UP */}
                  <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                    <button 
                      className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none p-1 focus:ring-2 focus:ring-white focus:ring-offset-4 focus:ring-offset-gray-800 sm:hidden"
                      id="notAuth-menu-button"
                      aria-expanded={isNotAuthMenuOpen}
                      aria-haspopup="true"
                      onClick={() => {
                        setIsNotAuthMenuOpen(!isNotAuthMenuOpen)
                        setIsMobileMenuOpen(false)
                      }}
                    >
                      <UserIcon className='h-5 w-5 flex-none dark:text-gray-50'/>
                    </button>
                  </div>

                  {/* END BUTTON UNTUK MOBILE */}
                  {isNotAuthMenuOpen && (
                    <div className='absolute inset-y-24 right-2 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                      {/* MENU BUTTON MOBILE SIGN UP & SIGN IN  */}
                      <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-ayotaku-button py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby='notAuth-menu-button' tabIndex="-1">
                        <a 
                          className="px-4 py-2 text-sm text-gray-700 font-semibold flex items-center cursor-pointer hover:bg-ayotaku-light" 
                          role="menuitem" 
                          tabIndex="-1" 
                          id="user-menu-item-0"
                          onClick={() => navigate('/register')}
                        >
                          <UserPlusIcon className='h-5 w-5 flex-none dark:text-gray-700 mr-2' />
                          Sign up
                        </a>

                        <a
                          className="px-4 py-2 text-sm text-gray-700 font-semibold flex items-center cursor-pointer hover:bg-ayotaku-light" 
                          role="menuitem"
                          tabIndex="-1"
                          id="user-menu-item-1"
                          onClick={() => navigate('/login')}
                        >
                          <UserIcon className='h-5 w-5 flex-none dark:text-gray-700 mr-2'/>
                          Sign in
                        </a>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className='absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0'>
                  <button
                    type='button'
                    className='relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                    onClick={() => {
                      setIsNotifMenuOpen(!isNotifMenuOpen)
                      setIsMobileMenuOpen(false)
                      setIsUserMenuOpen(false)
                    }}  // Toggle user dropdown
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                    <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1 -translate-y-2">
                      1
                    </span>
                  </button>

                  <div className='relative ml-3'>
                    {/* Profile Image di Navbar */}
                    <ProfileImageNavbarComponent 
                      isLoadingEntirePage={isLoadingEntirePage}
                      isUserMenuOpen={isUserMenuOpen}
                      setIsUserMenuOpen={setIsUserMenuOpen}
                      setIsNotifMenuOpen={setIsNotifMenuOpen}
                      setIsMobileMenuOpen={setIsMobileMenuOpen}
                      isProfileUser={isProfileUser}
                    />

                    {/* Menu dropdown */}
                    {isUserMenuOpen && (
                      <ProfileMenuDropdown 
                        setIsCookiesDefault={setIsCookiesDefault}
                        setIsProfileUser={setIsProfileUser}
                      />
                    )}

                    {/* MENU NOTIFIKASI */}
                    {isNotifMenuOpen && (
                      <MenuNotifikasiComponent isLoadingEntirePage={isLoadingEntirePage} />
                    )}
                  </div>
                </div>
              )
            }

          </div>
        </div>

        {/* Mobile menu dropdown */}
        {isMobileMenuOpen && (
          <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {
                isNavigation.map((item) => (
                  <button
                    key={item.name}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 mt-1 text-sm font-medium',
                    )}
                    onClick={() => handlerClickNavigation(item.name, item.href)}
                  >
                    {item.name}
                  </button>
                ))
              }
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

export default NavbarComponent;
