import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { Button } from 'primereact/button';

import Cookies from './utils/handler-cookies';

function App() {
  useEffect(() => {
    const valueCOokies = JSON.stringify({
      auth: false,
      token: null
    });

    if (Cookies.checkingCookiesUser('ayotaku-login').isExist === false) {
      Cookies.setCookiesUser('ayotaku-login', valueCOokies, 14)
      return;
    }
  });

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
          />

          <Route 
            path='/'
            element={<Button label='Cookies' onClick={handlerClickButton}/>}
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
