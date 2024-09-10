import { useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';
import { toast } from 'sonner';

// IMPORT COMPONENT
import RegisterComponent from './auth/RegisterComponent';
import HomeComponent from './component/HomeComponent';
import ActivatedAccountComponent from './component/alert/ActivatedAccountComponent';
import LoginComponent from './auth/LoginComponent';
import ProfileComponent from './component/ProfileComponent';
import AccountComponent from './component/AccountComponent';
import BookmarksComponent from './component/BookmarksComponent';


// HANDLER FETCHING
import Cookies from './utils/handler-cookies';
import { handlerFetchingProfileUser } from './utils/handler-fetching';
import ChangePasswordComponent from './component/utils/ChangePasswordComponent';

// FUNCTION INI SANGAT PENTING!
// INI UNTUK VALIDASI DULUAN SEBELUM COMPONENT DI RENDER UNTUK MEMERIKSA APAKAH COOKIES SUDAH BENAR ATAU TIDAK!
const getDefaultCookies = () => {
  if (!Cookies.checkingCookiesUser('ayotaku-isLogin').isExist || !Cookies.checkingCookiesUser('ayotaku-token').isExist) {
    Cookies.setCookiesUser('ayotaku-isLogin', 'false', 30);
    Cookies.setCookiesUser('ayotaku-token', 'null', 30);
    return { isLogin: 'false', token: 'null' };
  }
  
  return {
    isLogin: Cookies.getCookiesUser('ayotaku-isLogin'),
    token: Cookies.getCookiesUser('ayotaku-token'),
  };
};

function App() {
  // STATE MANAGEMENT
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [isCookiesDefault, setIsCookiesDefault] = useState(getDefaultCookies());
  const [isProfileUser, setIsProfileUser] = useState(null);
  
  // REF MANAGEMENT
  const toastShowRef = useRef(false);

  const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));

  const toastMemorized = useMemo(() => {
    return (response) => {
      toast.promise(promise, {
        loading: 'Loading...',
        success: response?.message,
        error: 'Error!',
        duration: 1000,
      })
    }
  }, []);

  // SET DEFAULT COOKIES FIRST TIME VISIT
  useEffect(() => {
    if (Cookies.getCookiesUser('ayotaku-isLogin') === 'true' && Cookies.checkingCookiesUser('ayotaku-token').isExist) {
      const tokenAyotaku = Cookies.getCookiesUser('ayotaku-token');

      setIsCookiesDefault({
        isLogin: Cookies.getCookiesUser('ayotaku-isLogin'),
        token: Cookies.getCookiesUser('ayotaku-token'),
      });

      const responseProfileUser = async () => {
        const response = await handlerFetchingProfileUser(tokenAyotaku);
        return response;
      }

      responseProfileUser().then((response) => {
        
        if (response?.statusCode === 401 && !toastShowRef.current) {
          Cookies.setCookiesUser('ayotaku-isLogin', 'false', 30)
          Cookies.setCookiesUser('ayotaku-token', 'null', 30)

          toastShowRef.current = true;
          toastMemorized(response);
          setIsProfileUser(null);
          setIsCookiesDefault({ isLogin: 'false', token: 'null' })
          
          return;
        }

        if (response?.statusCode === 429 && !toastShowRef.current) {
          toastShowRef.current = true;

          toast.warning(response?.message, { duration: 1500 });
          return
        }
        setIsProfileUser(response.data);
      })
    }
    
    if (!Cookies.checkingCookiesUser('ayotaku-isLogin').isExist || !Cookies.checkingCookiesUser('ayotaku-token').isExist) {
      setIsCookiesDefault({ isLogin: 'false', token: 'null' })
      setIsProfileUser(null);
      Cookies.setCookiesUser('ayotaku-isLogin', 'false', 30)
      Cookies.setCookiesUser('ayotaku-token', 'null', 30)
      return;
    }

  }, [setIsCookiesDefault, setIsProfileUser]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* ROUTE DENGAN MAIN LAYOUT DI HomeComponent */}
          <Route
            path='/'
            element={
              <HomeComponent
                isCookiesDefault={isCookiesDefault}
                setIsCookiesDefault={setIsCookiesDefault}
                isProfileUser={isProfileUser}
                setIsProfileUser={setIsProfileUser}
              />
            }
          >

            {/* Route yang masih ada di dalam profile */}
            <Route 
              path='profile'
              element={
                (isCookiesDefault?.isLogin === 'false' 
                  && isCookiesDefault?.token === 'null') 
                  ? <Navigate to="/" />
                  : <ProfileComponent 
                      isProfileUser={isProfileUser}
                    />
              }
            >
              <Route 
                path='me'
                element={
                  <AccountComponent 
                    isProfileUser={isProfileUser}
                    setIsProfileUser={setIsProfileUser}
                  />
                }
              />

              <Route 
                path='bookmarks'
                element={<BookmarksComponent />}
              />
              
              <Route 
                path='me/password'
                element={
                  <ChangePasswordComponent 
                    isProfileUser={isProfileUser}
                  />
                }
              />
            </Route>
          </Route>
          {/* END ROUTE MAIN LAYOUT */}

          <Route 
            path='/register'
            element={
              (isCookiesDefault?.isLogin === 'false' 
                && isCookiesDefault?.token === 'null') 
                ? <RegisterComponent /> 
                : <Navigate to="/" />
            }
          />

          <Route 
            path='/login'
            element={
              (isCookiesDefault?.isLogin === 'false'
                && isCookiesDefault?.token === 'null')
                ? <LoginComponent />
                : <Navigate to="/" />
            }
          />

          <Route 
            path='/activate'
            element={
              (isCookiesDefault?.isLogin === 'false' || isCookiesDefault?.token === 'null')
                ? <ActivatedAccountComponent />
                : <Navigate to="/" />
            }
          />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
