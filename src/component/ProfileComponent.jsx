import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Divider } from "primereact/divider";

// IMPORT COMPONENT
import SvgRenderComponent from "./utils/SvgRenderComponent";
import { classNames } from "primereact/utils";
import { Helmet } from "react-helmet-async";

function ProfileComponent({ isProfileUser }) {
  const navigate = useNavigate();
  
  return (
    <>
      <Helmet>
        <title>Ayotaku.id - Profile</title>
      </Helmet>
      <div className="flex flex-col mx-auto px-7 py-5 w-full max-w-screen-xl">
        <div className="text-2xl sm:text-3xl font-bold">Profile Settings</div>
        <div className="mt-2 text-ayotaku-text-xs sm:text-ayotaku-text-sm">{`Setting Account mu [ Information Account, Bookmarks Title, Change Password ]`}</div>
        <Divider />
        
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-2">

            <div className="col-span-1 md:col-span-3 p-1">
              <div className="grid grid-cols-2 sm:grid-cols-1 gap-2 text-start text-lg">
                <div 
                  className={classNames(
                    location.pathname !== '/profile/me' ? "bg-ayotaku-dark hover:bg-ayotaku-super-dark" : "bg-ayotaku-super-dark",
                    "col-span-1 hover:duration-500 px-3 py-1 rounded-md cursor-pointer text-base"
                  )}
                  onClick={() => navigate('/profile/me')}
                >
                  Account
                </div>
                <div 
                  className={classNames(
                    location.pathname !== '/profile/bookmarks' ? "bg-ayotaku-dark hover:bg-ayotaku-super-dark" : "bg-ayotaku-super-dark",
                    "col-span-1 hover:duration-500 px-3 py-1 rounded-md cursor-pointer text-base"
                  )}
                  onClick={() => navigate('/profile/bookmarks')}
                >
                  Bookmarks
                </div>
                {
                  (isProfileUser?.via_register === 'form') ? (
                    <div 
                      className={classNames(
                        location.pathname !== '/profile/me/password' ? "bg-ayotaku-dark hover:bg-ayotaku-super-dark" : "bg-ayotaku-super-dark",
                        "col-span-full hover:duration-500 px-3 py-1 rounded-md cursor-pointer text-base"
                      )}
                      onClick={() => navigate('/profile/me/password')}
                    >
                      Change Password
                    </div>
                  ) : ''
                }
              </div>
            </div>

            {/* ISI SEMUA CONTENT AKAN DI RENDER DISINI UNTUK PROFILE SETTINGS */}
            <div className="col-span-1 md:col-span-9 p-1 px-3 w-full rounded-md">
              <Outlet />
            </div>
          </div>
        </div>


      </div>
    </>
  )
}

export default ProfileComponent;