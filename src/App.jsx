import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Button } from 'primereact/button';

import Cookies from './utils/handler-cookies';
import RegisterComponent from './auth/RegisterComponent';

function App() {
  const [isAuthUser, setIsAuthUser] = useState(false);

  // SET DEFAULT COOKIES FIRST TIME VISIT
  useEffect(() => {
    const valueCOokies = JSON.stringify({
      auth: false,
      token: null
    });

    if (Cookies.checkingCookiesUser('ayotaku-login').isExist === false) {
      Cookies.setCookiesUser('ayotaku-login', valueCOokies, 30)
      return;
    }
  }, []);

  // CHECKING IF COOKIES ALREADY EXIST
  useEffect(() => {
    if (Cookies.getCookiesUser('ayotaku-login')) {
      const parseCookies = JSON.parse(Cookies.getCookiesUser('ayotaku-login'));
      const token = parseCookies.auth
      return console.log(token);
    }
  }, [])

  const handlerClickButton = () => {
    const cookiesUser = Cookies.getCookiesUser('ayotaku-login');
    return console.log(JSON.parse(cookiesUser));
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route 
            path='/register'
            element={<RegisterComponent />}
          />

          <Route 
            path='/'
            element={
              <Button 
                label='Cookies' 
                size='small' 
                icon='pi pi-check'
                className='dark:text-white mx-3 my-5'
                onClick={handlerClickButton}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  )

  // return (
  //   <>
  //     <div>
  //       <Helmet>
  //         <title>Ayotaku id | Dashboard</title>
  //         <meta name="description" content="This is a dynamic description" />
  //       </Helmet>
  //       <h1>{ 
  //         isTextDashboard ?? 
  //         <>
  //           <SkeletonTheme baseColor="#e8e8e8" highlightColor="#bebfbd">
  //             <Skeleton />
  //           </SkeletonTheme>
  //         </>
  //       }</h1>
        
  //     </div>
  //   </>
  // )
}

export default App
