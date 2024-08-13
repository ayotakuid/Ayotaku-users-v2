import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Helmet } from "react-helmet-async";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";


// IMPORT IMAGE
import IconCirleAyotaku from '../image/icon-circle.svg';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function RegisterComponent() {
  const navigate = useNavigate();

  const [isLoadingPage, setIsLoadingPage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsLoadingPage(true)
    }, 1500)
  }, [setIsLoadingPage]);

  const handlerClickHere = () => {
    navigate('/');
  }

  return (
    <>
      <Helmet>
        <title>Ayotaku id - Register</title>
        <meta name="description" content="Selamat datang di Ayotaku.id! Ini adalah Website untuk Streaming Anime dan Downloadn Anime secara gratis. Kami ingin mempermudah para Otaku ataupun wibu diluar sana yang kesulitan untuk membeli Subscription Anime Legal ataupun Website sebelah yang penuh dengan iklan!"/>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center dark:text-ayotaku-text-default">
        <div className="md:max-w-5xl bg-ayotaku-box rounded-lg shadow-md p-3">
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
                : <img src={IconCirleAyotaku} alt="Icon Circle Ayotaku" className="w-16" />
              }
            </div>
            <h1 className="text-3xl grid items-center justify-center text-ayotaku-text-default mt-5">Sign Up</h1>
            <div className="grid items-center justify-center">
              <span className="grid items-center justify-center text-sm text-teal-400 text-opacity-70 w-96 text-center mt-3">
                Enter your email, username and password below to create account OR you can register Via Google.
                </span>
            </div>
          </div>

          <div className="container mx-auto p-4 rounded-lg">

            <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
              <div className="p-4 flex bg-ayotaku-box rounded-lg justify-center items-center">
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
                        <Skeleton width={70} height={10} />
                        <Skeleton width={270} height={40} />
                        <Skeleton width={70} height={10} className="mt-5"/>
                        <Skeleton width={270} height={40} />
                        <Skeleton width={70} height={10} className="mt-5"/>
                        <Skeleton width={270} height={40} />
                      </SkeletonTheme>
                    </div>
                  </>
                  :
                  <>
                    <div className="grid grid-cols-1">
                      <label htmlFor="Email Form" className="mb-3">Email: </label>
                      <div className="flex items-center border border-gray-300 rounded-md p-2 w-full">
                        <input 
                          type="text" 
                          placeholder="Email..." 
                          className="flex-1 outline-none bg-transparent w-96"
                        />
                      </div>

                      <label htmlFor="Username Form" className="mb-3 mt-3">Username: </label>
                      <div className="flex items-center border border-gray-300 rounded-md p-2 w-full">
                        <input 
                          type="text" 
                          placeholder="Username..." 
                          className="flex-1 outline-none bg-transparent w-96"
                        />
                      </div>

                      <label htmlFor="Password Form" className="mb-3 mt-3">Password: </label>
                      <div className="flex items-center border border-gray-300 rounded-md p-2 w-full">
                        <input 
                          type="text" 
                          placeholder="Password..." 
                          className="flex-1 outline-none bg-transparent w-96"
                        />
                      </div>

                      <Button 
                        label="Sign up"
                        // icon="pi pi-user-plus"
                        size="small"
                        className="mt-5 w-full"
                        style={{
                          fontSize: '16px',
                          textAlign: 'center'
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

              <Divider layout="vertical" className="hidden md:flex text-white">
                <span>OR</span>
              </Divider>
              <Divider layout="horizontal" className="flex md:hidden">
                <span>OR</span>
              </Divider>

              <div className="p-4 flex bg-ayotaku-box rounded-lg justify-center items-center">
                <div className="grid grid-cols-1">
                  Login Google
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