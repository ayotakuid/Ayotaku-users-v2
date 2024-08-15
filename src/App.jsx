import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Navigate, Routes, useNavigate } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Button } from 'primereact/button';

import Cookies from './utils/handler-cookies';
import RegisterComponent from './auth/RegisterComponent';
import HomeComponent from './component/HomeComponent';
import AlertSuccessComponent from './component/alert/AlertSuccessComponent';

function App() {
  // STATE MANAGEMENT
  const [isAuthUser, setIsAuthUser] = useState(false);
  const [isCookiesDefault, setIsCookiesDefault] = useState({ isLogin: 'false', token: 'null' });

  // SET DEFAULT COOKIES FIRST TIME VISIT
  useEffect(() => {
    if (!Cookies.checkingCookiesUser('ayotaku-isLogin').isExist || !Cookies.checkingCookiesUser('ayotaku-token').isExist) {
      Cookies.setCookiesUser('ayotaku-isLogin', 'false', 30)
      Cookies.setCookiesUser('ayotaku-token', 'null', 30)
      return;
    }

    if (Cookies.getCookiesUser('ayotaku-isLogin') || !Cookies.checkingCookiesUser('ayotaku-token').isExist) {
      setIsCookiesDefault({
        isLogin: Cookies.getCookiesUser('ayotaku-isLogin'),
        token: Cookies.getCookiesUser('ayotaku-token'),
      });
    }
  }, [setIsCookiesDefault]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/register'
            element={
              (isCookiesDefault?.isLogin === 'false' || isCookiesDefault?.token === 'null') 
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
                isAuthUser={isAuthUser}
              />
            }
          />

          <Route 
            path='/register/success'
            element={<AlertSuccessComponent />}
          />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
