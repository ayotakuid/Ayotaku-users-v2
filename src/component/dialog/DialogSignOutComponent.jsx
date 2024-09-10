import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// IMPORT UTILS
import Cookies from '../../utils/handler-cookies';

function FooterDialogSignOutComponent({
  setIsDialogSignOut,
  setIsCookiesDefault,
  setIsProfileUser,
}) {
  const navigate = useNavigate();

  const [isLoadingSignOut, setIsLoadingSignOut] = useState(false);

  const handlerOnClickYes = () => {
    setIsLoadingSignOut(true);
    
    setTimeout(() => {
      setIsLoadingSignOut(false);
      setIsDialogSignOut(false);

      setIsCookiesDefault({ isLogin: 'false', token: 'null' })
      setIsProfileUser(null)
      Cookies.deleteCookiesUser('ayotaku-isLogin')
      Cookies.deleteCookiesUser('ayotaku-token')
      navigate('/')
    }, 1500);
  }
  return (
    <>
      <Button 
        label="Yes"
        className="bg-red-500 px-2 py-1 rounded-md mx-1 mt-1 dark:text-ayotaku-text-default text-sm"
        severity="none"
        size="sm"
        loading={isLoadingSignOut}
        onClick={handlerOnClickYes}
      />
      <Button
        label="Cancel" 
        className="bg-gray-400 px-2 py-1 rounded-md mx-1 mt-1 dark:text-gray-950 text-sm"
        onClick={() => setIsDialogSignOut(false)}
        severity="none"
        size="sm"
      />
    </>
  )
}

function DialogSignOutComponent({
  isDialogSignOut,
  setIsDialogSignOut,
  setIsCookiesDefault,
  setIsProfileUser,
}) {
  return (
    <>
      <Dialog 
        header="Sign Out"
        draggable={false}
        visible={isDialogSignOut}
        style={{ width: '40vw' }} 
        breakpoints={{ '960px': '75vw', '641px': '100vw' }}
        footer={
          <FooterDialogSignOutComponent 
            setIsDialogSignOut={setIsDialogSignOut}
            setIsCookiesDefault={setIsCookiesDefault}
            setIsProfileUser={setIsProfileUser}
          />}
        onHide={() => {
          setIsDialogSignOut(false);
        }}
      >
        <p className="text-sm dark:text-red-500 my-2">Are sure to Sign out?</p>
      </Dialog>
    </>
  )
}

export default  DialogSignOutComponent;