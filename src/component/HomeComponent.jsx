import { useEffect, useRef, useState } from "react";
import { Button } from "primereact/button";
import { Helmet } from "react-helmet-async";
import { toast } from "sonner";
import { useNavigate, useParams, useLocation } from "react-router-dom";

// IMPORT UTILS
import Cookies from '../utils/handler-cookies';

// IMPORT COMPONENT
import NavbarComponent from '../component/head/NavbarComponent';

const RenderSvg = ({ isProfileUser }) => {
  const svgString = isProfileUser?.from_google.picture;

  return (
    <>
      <svg 
        xmlns="http://www.w3.org/2000/svg"
        dangerouslySetInnerHTML={{ __html: svgString }}
      />
    </>
  )
}

function ImageRenderer({ imageUrl }) {
  return (
    <img src={imageUrl} alt="Profile" />
  );
}

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

  const handlerClickButtonSignUp = () => {
    navigate('/register');
  }

  const handlerClickButtonSignIn = () => {
    navigate('/login');
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
        <meta name="description" content="Selamat datang di Ayotaku.id! Ini adalah Website untuk Streaming Anime dan Downloadn Anime secara gratis. Kami ingin mempermudah para Otaku ataupun wibu diluar sana yang kesulitan untuk membeli Subscription Anime Legal ataupun Website sebelah yang penuh dengan iklan!"/>
      </Helmet>
      <NavbarComponent 
        isLoadingEntirePage={isLoadingEntirePage}
        isCookiesDefault={isCookiesDefault}
        isProfileUser={isProfileUser}
      />
      {
        (
          isCookiesDefault?.isLogin === 'false' 
          || isCookiesDefault?.token === 'null'
        )
        ? 
        <>
          <Button 
            label="Sign up"
            size="small"
            icon="pi pi-user-plus"
            className="dark:text-white mx-3 my-5"
            onClick={handlerClickButtonSignUp}
          />
          
          <Button 
            label="Sign in"
            size="small"
            icon="pi pi-user-plus"
            className="dark:text-white mx-3 my-5"
            onClick={handlerClickButtonSignIn}
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
            {isProfileUser?.username}
          </div>
          <div>
            {isProfileUser?.from_google.email}
          </div>
          {
            (isProfileUser?.via_register === 'google') 
              ? 
              <>
                <ImageRenderer imageUrl={isProfileUser.from_google.picture} />
              </>
              : 
              <>
                <RenderSvg isProfileUser={isProfileUser} 
                  className="h-8 w-8 rounded-full"
                />
              </>
          }
        </>
      }
    </>
  )
}

export default HomeComponent;