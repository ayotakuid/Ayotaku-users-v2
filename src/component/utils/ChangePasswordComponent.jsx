import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// IMPORT FETCHING & UTILS
import { handlerSendLinkResetPasswor } from '../../utils/handler-fetching';
import Cookies from '../../utils/handler-cookies';

const checkButtonResetVisible = () => {
  const savedTime = Cookies.getCookiesUser('ayotaku-reset');

  if (savedTime) {
    const currentTime = new Date().getTime();
    const elapseTime = currentTime - savedTime;

    const fiveMinutes = 5 * 60 * 1000;

    // JIKA MASIH BELOM LEBIH DARI 5 MENIT MAKA SEMBUNYIKAN BUTTON
    if (elapseTime < fiveMinutes) {
      return true;
    }

    return false;
  }
}

function ChangePasswordComponent({ isProfileUser }) {

  // VARIABLE FROM REACT ROUTER DOM
  const navigate = useNavigate();
  const locationPage = useLocation();
  const queryParams = new URLSearchParams(locationPage.search);
  const emailParams = queryParams.get('email'),
        codeParams = queryParams.get('code'),
        expiredParams = queryParams.get('exp');

  // STATE MANAGEMENT BUTTON
  const [isLoadingButtonReset, setIsLoadingButtonReset] = useState(false);
  const [isVisibleButtonReset, setIsVisibleButtonReset] = useState(false);

  useEffect(() => {
    const isButtonResetHidden = checkButtonResetVisible();
    setIsVisibleButtonReset(!isButtonResetHidden);
  }, [])

  useEffect(() => {
    if (isProfileUser?.via_register === 'google') {
      navigate('/profile/me');
    }
  }, [isProfileUser, navigate]);

  const handlerOnClickSendLink = async () => {
    setIsLoadingButtonReset(true)
    const responseSendLink = await handlerSendLinkResetPasswor(Cookies.getCookiesUser('ayotaku-token'));

    if (responseSendLink.status === 'fail') {
      setIsLoadingButtonReset(false);
      toast.error(responseSendLink.message);
      return;
    }

    // Simpan waktu penekanan tombol di Cookies (waktu sekarang dalam milidetik)
    const now = new Date().getTime();
    Cookies.setCookiesMenit('ayotaku-reset', now, 5); // Simpan selama 5 menit

    // Set timeout untuk menyembunyikan tombol selama 5 menit
    setTimeout(() => {
      setIsVisibleButtonReset(false);
      setIsLoadingButtonReset(false);
      toast.success(responseSendLink.message);
    }, 1500);

    setTimeout(() => {
      setIsVisibleButtonReset(true); // Tampilkan kembali tombol setelah 5 menit
    }, 5 * 60 * 1000);
  };

  return (
    <>
      <div className="bg-ayotaku-dark px-7 py-5 rounded-lg">
        {
          (!emailParams && !codeParams && !expiredParams) ? (
            <>
              <h2 className="text-lg">Change Password</h2>
              <div className="block text-ayotaku-text-xs w-full sm:w-8/12 opacity-50 my-1">
                NOTE: Change password adalah fitur untuk melakukan Perubahan Password User, Kalian hanya perlu menekan button untuk dibawah ini. Dan Ayotaku akan mengirim kan sebuah Email yang berisi kan URL untuk melakukan reset/ganti Password untuk kalian 😊.
              </div>

              {
                isVisibleButtonReset ? (
                  <div className="block">
                    <Button 
                      label="Send Link"
                      className="dark:bg-ayotaku-button dark:text-gray-900 text-ayotaku-text-sm px-2 py-1.5 mt-2 hover:dark:bg-ayotaku-normal-dark duration-500 focus:outline-none focus:shadow-none"
                      size="sm"
                      severity="none"
                      loading={isLoadingButtonReset}
                      onClick={handlerOnClickSendLink}
                    />
                  </div>
                ) : 'Tunggu 5 menit untuk reset password lagi.'
              }
            </>
          ) : (
            <>
              <div className="grid grid-cols-1 text-lg">
                Form Change Password
              </div>

              <div className="grid grid-cols-1">
                <label htmlFor="New Password" className="text-ayotaku-text-sm mt-4 mb-1">New Password</label>
                <input 
                  type="password"
                  placeholder="New Password..."
                  name="displayUsername"
                  className="block w-52 sm:w-72 rounded-md bg-ayotaku-super-dark outline-none px-2 py-0.5 text-ayotaku-text-default placeholder:opacity-30 placeholder:text-xs"
                />
              </div>

              <div className="grid grid-cols-1">
                <label htmlFor="Confirm Password" className="text-ayotaku-text-sm mt-4 mb-1">Confirm Password</label>
                <input 
                  type="password"
                  placeholder="Confirm Password..."
                  name="displayUsername"
                  className="block w-52 sm:w-72 rounded-md bg-ayotaku-super-dark outline-none px-2 py-0.5 text-ayotaku-text-default placeholder:opacity-30 placeholder:text-xs"
                />
              </div>

              <div className="grid grid-cols-1">
                <Button 
                  label="Confirm"
                  className="dark:bg-ayotaku-button w-16 dark:text-gray-900 text-ayotaku-text-sm px-2 py-1.5 mt-2 hover:dark:bg-ayotaku-normal-dark duration-500 focus:outline-none focus:shadow-none"
                  size="sm"
                  severity="none"
                  onClick={() => {
                    toast.success('Berhasil dikirim!')
                  }}
                />
              </div>
            </>
          )
        }

      </div>
    </>
  )
}

export default ChangePasswordComponent;