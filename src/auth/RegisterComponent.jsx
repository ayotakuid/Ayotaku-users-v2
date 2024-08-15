import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Helmet } from "react-helmet-async";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// IMPORT UTILS
import { URL_API_AYOTAKU } from '../utils/secrets.json';
import Cookies from '../utils/handler-cookies';

// IMPORT IMAGE
import IconCirleAyotaku from '../image/icon-circle.svg';

function RegisterComponent() {
  const navigate = useNavigate();

  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isLoadingButtonGoogle, setIsLoadingButtonGoogle] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingPage(true)
    }, 1500)

    setInterval(() => {
      if (Cookies.getCookiesUser('ayotaku-isLogin') == 'true') {
        navigate('/')
        location.reload();
        clearInterval()
      }
    }, 2000)
  }, [setIsLoadingPage]);

  const handlerClickHere = () => {
    navigate('/');
  }

  const handlerSignUpGoogle = () => {
    if (Cookies.getCookiesUser('ayotaku-isLogin') == 'true') {
      return
    }
    setIsLoadingButtonGoogle(true)

    setTimeout(() => {
      const url = `${URL_API_AYOTAKU}/user/auth/google`;
      const windowName = 'Ayotaku id - Sign up with Google'
      const windowSize = 'width=500,height=500,left=100,top=100';
  
      window.open(url, windowName, windowSize);
      setIsLoadingButtonGoogle(false)
    }, 1000)
  }

  return (
    <>
      <Helmet>
        <title>Ayotaku.id - Sign up</title>
        <meta name="description" content="Selamat datang di Ayotaku.id! Ini adalah Website untuk Streaming Anime dan Downloadn Anime secara gratis. Kami ingin mempermudah para Otaku ataupun wibu diluar sana yang kesulitan untuk membeli Subscription Anime Legal ataupun Website sebelah yang penuh dengan iklan!"/>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center dark:text-ayotaku-text-default">
        <div className="md:max-w-4xl max-h-fit bg-ayotaku-box rounded-lg shadow-md p-3">
          <div className="container mx-auto justify-center items-center my-10">
            <div className="grid items-center justify-center">
              {
                (!isLoadingPage) 
                ? 
                <SkeletonTheme 
                  baseColor="#c0c0c0" 
                  highlightColor="#e0e0e0" 
                  duration={2}
                >
                  <Skeleton circle={true} width={64} height={64} />
                </SkeletonTheme>
                : <img src={IconCirleAyotaku} alt="Icon Circle Ayotaku" className="w-10" />
              }
            </div>
            <h1 className="text-2xl grid items-center justify-center text-ayotaku-text-default mt-5">Sign Up</h1>
            <div className="grid items-center justify-center">
              <span className="grid items-center justify-center text-xs text-teal-400 text-opacity-70 w-96 text-center mt-3">
                Enter your email, username and password below to create account or you can register via Google.
                </span>
            </div>
          </div>

          <div className="container mx-auto p-4 rounded-lg">

            <div className="grid grid-cols-1 md:grid-cols-12 gap-1 justify-center items-center">
              <div className="p-4 flex col-span-12 sm:col-span-5 bg-ayotaku-box rounded-lg justify-center items-center">
                {
                  (!isLoadingPage) 
                  ?
                  <>
                    <div className="grid grid-cols-1">
                      <SkeletonTheme 
                        baseColor="#c0c0c0"
                        highlightColor="#e0e0e0"
                        duration={2}
                      >
                        <Skeleton width={50} height={10} />
                        <Skeleton width={270} height={30} />
                        <Skeleton width={50} height={10} className="mt-5"/>
                        <Skeleton width={270} height={30} />
                        <Skeleton width={50} height={10} className="mt-5"/>
                        <Skeleton width={270} height={30} />
                        <Skeleton width={270} height={30} className="mt-5"/>
                        <Skeleton width={100} height={10} className="mt-5 text-center" />
                      </SkeletonTheme>
                    </div>
                  </>
                  :
                  <>
                    <div className="grid grid-cols-1">
                      <label htmlFor="Email Form" className="mb-1 text-sm">Email: </label>
                      <div className="flex items-center border border-gray-300 rounded-md p-2 w-full h-8 text-sm">
                        <input 
                          type="text" 
                          placeholder="Email..." 
                          className="flex-1 outline-none bg-transparent w-full"
                        />
                      </div>

                      <label htmlFor="Username Form" className="mb-1 text-sm mt-2">Username: </label>
                      <div className="flex items-center border border-gray-300 rounded-md p-2 w-full h-8 text-sm">
                        <input 
                          type="text" 
                          placeholder="Username..." 
                          className="flex-1 outline-none bg-transparent w-full"
                        />
                      </div>

                      <label htmlFor="Password Form" className="mb-1 text-sm mt-2">Password: </label>
                      <div className="flex items-center border border-gray-300 rounded-md p-2 w-full h-8 text-sm">
                        <input 
                          type="password" 
                          placeholder="Password..." 
                          className="flex-1 outline-none bg-transparent w-96"
                        />
                      </div>

                      <Button 
                        label="Sign up"
                        // icon="pi pi-user-plus"
                        className="mt-4 w-full dark:text-white dark:bg-ayotaku-button dark:hover:bg-slate-400 outline-none"
                        style={{
                          fontSize: '15px',
                          textAlign: 'center',
                          height: '30px'
                        }}
                      />

                      <div className="flex justify-center items-center mt-5 text-sm">
                        <div>
                          already have account?&nbsp;
                          <span 
                            className="no-underline hover:underline cursor-pointer hover:text-gray-50"
                            onClick={handlerClickHere}
                          >
                            Click here.
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                }
              </div>

              <Divider layout="vertical" className="hidden md:flex text-white col-span-12 md:col-span-2 sm:col-span-2">
                <span>OR</span>
              </Divider>
              <Divider layout="horizontal" className="flex md:hidden col-span-12 md:col-span-2 sm:col-span-2">
                <span>OR</span>
              </Divider>

              <div className="p-4 flex bg-ayotaku-box rounded-lg justify-center items-center col-span-12 md:col-span-5 sm:col-span-5">
                <div className="grid grid-cols-1">

                <Button 
                  className="flex items-center justify-center w-full px-4 py-2 dark:bg-white border border-gray-400 shadow-sm dark:text-black dark:hover:bg-gray-100 text-sm rounded-full"
                  onClick={handlerSignUpGoogle}
                  loading={isLoadingButtonGoogle}
                >
                  {/* ICON SVG Google */}
                  <svg className="w-6 h-6 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                    <path fill="#EA4335" d="M24 9.5c3.5 0 6.4 1.2 8.8 3.5l6.5-6.5C34.4 2.5 29.5 0 24 0 14.6 0 6.7 5.8 3 14.1l7.7 6.3C12.3 13.3 17.7 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.9 24.6c0-1.7-.1-2.9-.3-4.3H24v8.1h13c-.5 2.4-1.7 4.4-3.5 5.8l7.7 6c4.4-4.1 6.7-10.1 6.7-15.6z"></path>
                    <path fill="#FBBC05" d="M10.9 28.7c-1.2-2.4-1.9-5-1.9-7.7s.7-5.3 1.9-7.7l-7.7-6.3C2.3 11.3 0 17.4 0 24s2.3 12.7 6.3 17.3l7.6-6.3z"></path>
                    <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.8-5.7l-7.7-6.1c-2.1 1.5-4.9 2.5-8 2.5-6.3 0-11.6-4.2-13.4-10.1l-7.7 6C6.8 42.1 14.7 48 24 48z"></path>
                    <path fill="none" d="M0 0h48v48H0z"></path>
                  </svg>
                  Sign Up with Google
                </Button>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default RegisterComponent;