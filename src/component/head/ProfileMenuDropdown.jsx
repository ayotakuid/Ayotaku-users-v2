import { useState } from "react";
import { useNavigate } from "react-router-dom";

// IMPORT COMPONENT
import { useProgressBar } from "../utils/ProgressBarProvider";
import DialogSignOutComponent from "../dialog/DialogSignOutComponent";

// IMPORT UTILS
import Cookies from '../../utils/handler-cookies';

function ProfileMenuDropdown({
  setIsCookiesDefault,
  setIsProfileUser
}) {
  const navigate = useNavigate();
  const { loadingBarState } = useProgressBar();

  // STATE MANAGEMENT VISIBLE DIALOG
  const [isDialogSignOut, setIsDialogSignOut] = useState(false);

  const handlerClickButtonLogout = () => {
    setIsDialogSignOut(true);
  }

  return (
    <>
      <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button" tabIndex="-1">
        <a 
          className="block px-4 py-1.5 text-sm text-gray-700 cursor-pointer" 
          role="menuitem" 
          tabIndex="-1"
          onClick={() => loadingBarState('/profile/me')}
        >
          Your Profile
        </a>
        <a 
          className="block px-4 py-1.5 text-sm text-gray-700 cursor-pointer" 
          role="menuitem" 
          tabIndex="-1"
          onClick={handlerClickButtonLogout}
        >
          Sign out
        </a>
      </div>

      <DialogSignOutComponent 
        isDialogSignOut={isDialogSignOut}
        setIsDialogSignOut={setIsDialogSignOut}
        setIsCookiesDefault={setIsCookiesDefault}
        setIsProfileUser={setIsProfileUser}
      />
    </>

  )
}

export default ProfileMenuDropdown;