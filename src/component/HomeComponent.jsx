import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useNavigate, useParams, useLocation, Outlet } from "react-router-dom";

// IMPORT UTILS
import Cookies from '../utils/handler-cookies';

// IMPORT COMPONENT
import NavbarComponent from '../component/head/NavbarComponent';

function HomeComponent({
  isCookiesDefault,
  setIsCookiesDefault,
  isProfileUser,
  setIsProfileUser,
}) {
  const navigate = useNavigate();
  const locationPage = useLocation();
  const queryParams = new URLSearchParams(locationPage.search);

  // STATE MANAGEMENT
  const [isLoadingEntirePage, setIsLoadingEntirePage] = useState(false);

  // USE EFFECT UNTUK Checking Cookies Token
  useEffect(() => {

    setIsLoadingEntirePage(true);

    setTimeout(() => {
      setIsLoadingEntirePage(false);
    }, 1000);

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
  
  return (
    <>
      <Helmet>
        <title>Ayotaku.id - Home</title>
        <meta name="description" content="Selamat datang di Ayotaku.id! Ini adalah Website untuk Streaming Anime dan Download Anime secara gratis. Kami ingin mempermudah para Otaku ataupun wibu diluar sana yang kesulitan untuk membeli Subscription Anime Legal ataupun Website sebelah yang penuh dengan iklan! Karena di Website kami tidak akan ada Iklan yang berlebihan dan tidak mempersulit para Otaku atau pun para Wibu yang ingin menonton Anime secara Streaming ataupun Download Anime!"/>
      </Helmet>
      <NavbarComponent 
        isLoadingEntirePage={isLoadingEntirePage}
        isCookiesDefault={isCookiesDefault}
        isProfileUser={isProfileUser}
        setIsProfileUser={setIsProfileUser}
        setIsCookiesDefault={setIsCookiesDefault}
      />

      <div className="flex my-5">
        <Outlet />
      </div>
    </>
  )
}

export default HomeComponent;