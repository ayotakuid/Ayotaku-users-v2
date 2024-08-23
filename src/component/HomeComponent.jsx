import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useNavigate, useParams, useLocation } from "react-router-dom";

import Cookies from '../utils/handler-cookies';

function HomeComponent({
  isCookiesDefault,
  setIsCookiesDefault,
  isProfileUser,
  setIsProfileUser,
}) {
  const navigate = useNavigate();
  const locationPage = useLocation();
  const queryParams = new URLSearchParams(locationPage.search);

  // STATE MANAGEMENTE

  // USE EFFECT UNTUK Checking Cookies Token
  useEffect(() => {
    if (queryParams.get('token')) {
      Cookies.setCookiesUser('ayotaku-token', queryParams.get('token'), 30);
      Cookies.setCookiesUser('ayotaku-isLogin', queryParams.get('isLogin'), 30);
      setIsCookiesDefault({ 
        isLogin: queryParams.get('isLogin'),
        token: queryParams.get('token')
      })

      window.history.pushState({}, '', window.location.pathname);
    }
  }, [])

  const handlerClickButtonSignUp = () => {
    navigate('/register');
  }

  const handlerClickButtonLogout = () => {
    setIsCookiesDefault({ isLogin: 'false', token: 'null' })
    setIsProfileUser(null)
    Cookies.deleteCookiesUser('ayotaku-isLogin')
    Cookies.deleteCookiesUser('ayotaku-token')
    navigate('/')
  }

  return (
    <>
      <Helmet>
        <title>Ayotaku.id - Home</title>
      </Helmet>
      {
        (
          isCookiesDefault?.isLogin === 'false' 
          || isCookiesDefault?.token === 'null'
        )
        ? 
        <>
          <Button 
            label="Sign Up"
            size="small"
            icon="pi pi-user-plus"
            className="dark:text-white mx-3 my-5"
            onClick={handlerClickButtonSignUp}
          />
        </>
        : 
        <>
          <Button 
            label="Logout"
            size="small"
            icon="pi pi-sign-out"
            className="dark:text-white mx-3 my-5"
            onClick={handlerClickButtonLogout}
          />

          <div>
            
          </div>
        </>
      }
    </>
  )
}

export default HomeComponent;