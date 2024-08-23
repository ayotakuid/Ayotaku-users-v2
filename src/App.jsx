import { useEffect, useMemo, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Button } from 'primereact/button';
import { PrimeIcons } from 'primereact/api';

import Cookies from './utils/handler-cookies';
import RegisterComponent from './auth/RegisterComponent';
import HomeComponent from './component/HomeComponent';
import ActivatedAccountComponent from './component/alert/ActivatedAccountComponent';


// HANDLER FETCHING
import { handlerFetchingProfileUser } from './utils/handler-fetching';
import { toast } from 'sonner';


function App() {
  // STATE MANAGEMENT
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [isCookiesDefault, setIsCookiesDefault] = useState({ isLogin: 'false', token: 'null' });
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
    if (!Cookies.checkingCookiesUser('ayotaku-isLogin').isExist || !Cookies.checkingCookiesUser('ayotaku-token').isExist) {
      setIsCookiesDefault({ isLogin: 'false', token: 'null' })
      setIsProfileUser(null);
      Cookies.setCookiesUser('ayotaku-isLogin', 'false', 30)
      Cookies.setCookiesUser('ayotaku-token', 'null', 30)
      return;
    }

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
  }, [setIsCookiesDefault, setIsProfileUser]);


  return (
    <>
      <BrowserRouter>
        <Routes>
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
            path='/'
            element={
              <HomeComponent 
                isCookiesDefault={isCookiesDefault}
                setIsCookiesDefault={setIsCookiesDefault}
                isProfileUser={isProfileUser}
                setIsProfileUser={setIsProfileUser}
              />
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
