import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Helmet } from "react-helmet-async";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import { toast } from "sonner";

// IMPORT UTILS
import { URL_API_AYOTAKU } from '../utils/secrets.json';
import Cookies from '../utils/handler-cookies';

// IMPORT IMAGE
import IconCirleAyotaku from '../image/icon-circle.svg';
import { handlerFetchingSignUp } from "../utils/handler-fetching";

const validationFormSignUp = (isFormSignUp) => {
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(String(email).toLowerCase());
  }

  if (!isFormSignUp.email) {
    return {
      status: 'error',
      message: 'Email required!',
    };
  }

  if (!validateEmail(isFormSignUp.email)) {
    return {
      status: 'error',
      message: 'Email is not Valid!',
    }
  }

  if (!isFormSignUp.username) {
    return {
      status: 'error',
      message: 'Username required!',
    };
  }

  if (!isFormSignUp.password) {
    return {
      status: 'error',
      message: 'Password required!'
    }
  }

  return {
    status: 'success',
  };
}

function RegisterComponent() {
  const navigate = useNavigate();
  const locationPage = useLocation();
  const queryParams = new URLSearchParams(locationPage.search);
  const accountParams = queryParams.get('account')

  // STATE MANAGEMENT
  const [isLoadingPage, setIsLoadingPage] = useState(false);
  const [isFormSignUp, setIsFormSignUp] = useState({
    email: '',
    username: '',
    password: '',
    type: 'web',
  });
  const toastShowRef = useRef(false);
  
  // STATE MANAGEMENT LOADING
  const [isLoadingButtonGoogle, setIsLoadingButtonGoogle] = useState(false);
  const [isLoadingButtonSignUp, setIsLoadingButtonSignUp] = useState(false);

  // USE EFFECT JIKA SUDAH LOGIN TIDAK BISA KE SINI
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

  // USE EFFECT PARAMS ACCOUNT NOT ACTIVE
  useEffect(() => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));
    if (accountParams === 'not_active' && !toastShowRef.current) {
      console.log('test');
      toast.promise(promise, {
        loading: 'Loading...',
        success: 'Silahkan cek Email untuk Activation Account!',
        error: 'Error!',
        position: 'bottom-right',
        duration: 5000
      });

      toastShowRef.current = true;
      return;
    }
  }, [queryParams])

  useEffect(() => {
    window.addEventListener('message', (event) => {
      if (event.origin === 'http://localhost:9001' && event.data.status === 'done') {
        window.location.href = event.data.url
      }
    })

    return () => window.removeEventListener('message', () => {});
  })

  const handlerClickHere = () => {
    navigate('/login');
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

  const handlerSignUpForm = () => {
    setIsLoadingButtonSignUp(true);

    const validateFunc = validationFormSignUp(isFormSignUp);

    if (validateFunc.status !== 'success') {
      setIsLoadingButtonSignUp(false);
      toast.warning(validateFunc.message)
      return;
    }

    const responseSignUp = async () => {
      const response = await handlerFetchingSignUp(isFormSignUp);
      return response;
    }

    responseSignUp().then((response) => {

      if (response.status === 'fail') {
        setTimeout(() => {
          setIsFormSignUp({
            email: '',
            username: '',
            password: '',
            type: 'web',
          });
          setIsLoadingButtonSignUp(false)
          toast.warning(response.message);
        }, 500)

        return;
      }

      setTimeout(() => {
        setIsFormSignUp({
          email: '',
          username: '',
          password: '',
          type: 'web',
        });
        setIsLoadingButtonSignUp(false)
        toast.success(response.message);
      }, 1500)

      return;
    }).catch((err) => {
      console.error(err);
    })
  };

  const onChangeFormSignUp = (e) => {
    const { name, value } = e.target;

    setIsFormSignUp({
      ...isFormSignUp,
      [name]: value,
    });
  };

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
                  <Skeleton circle={true} width={40} height={40} />
                </SkeletonTheme>
                : <img src={IconCirleAyotaku} alt="Icon Circle Ayotaku" className="w-12" />
              }
            </div>
            <h1 className="text-2xl grid items-center justify-center text-ayotaku-text-default mt-5">Sign Up</h1>
            <div className="grid items-center justify-center">
              <span className="grid grid-cols-1 items-center justify-center text-xs text-teal-400 text-opacity-70 w-96 text-center mt-3">
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
                        <Skeleton width={270} height={35} />
                        <Skeleton width={50} height={10} className="mt-5"/>
                        <Skeleton width={270} height={35} />
                        <Skeleton width={50} height={10} className="mt-5"/>
                        <Skeleton width={270} height={35} />
                        <Skeleton width={270} height={35} className="mt-5"/>
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
                          type="email" 
                          name="email"
                          placeholder="Email..."
                          value={isFormSignUp.email}
                          className="flex-1 outline-none bg-transparent w-full"
                          onChange={onChangeFormSignUp}
                        />
                      </div>

                      <label htmlFor="Username Form" className="mb-1 text-sm mt-2">Username: </label>
                      <div className="flex items-center border border-gray-300 rounded-md p-2 w-full h-8 text-sm">
                        <input 
                          type="text" 
                          name="username"
                          placeholder="Username..."
                          value={isFormSignUp.username}
                          className="flex-1 outline-none bg-transparent w-full"
                          onChange={onChangeFormSignUp}
                        />
                      </div>

                      <label htmlFor="Password Form" className="mb-1 text-sm mt-2">Password: </label>
                      <div className="flex items-center border border-gray-300 rounded-md p-2 w-full h-8 text-sm">
                        <input 
                          type="password" 
                          name="password"
                          placeholder="Password..."
                          value={isFormSignUp.password}
                          className="flex-1 outline-none bg-transparent w-96"
                          onChange={onChangeFormSignUp}
                        />
                      </div>

                      <Button 
                        label="Sign up"
                        className="mt-4 w-full dark:text-white dark:bg-ayotaku-button dark:hover:bg-slate-400 outline-none"
                        style={{
                          fontSize: '15px',
                          textAlign: 'center',
                          height: '30px'
                        }}
                        loading={isLoadingButtonSignUp}
                        onClick={handlerSignUpForm}
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

                  {
                    (!isLoadingPage)
                    ?
                    <>
                      <SkeletonTheme
                        baseColor="#c0c0c0"
                        highlightColor="#e0e0e0"
                        duration={2}
                      >
                        <Skeleton width={195} height={50} />
                      </SkeletonTheme>
                    </>
                    :
                    <>
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
                        Sign up with Google
                      </Button>
                    </>
                  }

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