import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async';
import { BrowserRouter, Route, Navigate, Routes } from 'react-router-dom';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';

function App() {
  const [isTextDashboard, setIsTextDashboard] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setIsTextDashboard('Ini adalah text!')
    }, 2000)
  }, [setIsTextDashboard]);

  return (
    <>
      <BrowserRouter>
        <Routes>
          
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
