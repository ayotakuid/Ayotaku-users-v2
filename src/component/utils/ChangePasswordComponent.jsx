import { Button } from "primereact/button";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

// IMPORT FETCHING & UTILS
import { handlerSendLinkResetPassword, handlerValidateTicketReset } from '../../utils/handler-fetching';
import Cookies from '../../utils/handler-cookies';
import FormResetPassword from "./FormResetPassword";

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
  const tokenAyotaku = Cookies.getCookiesUser("ayotaku-token");

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

  // STATE MANAGEMENT GLOBAL
  const [isVisibleFormReset, setIsVisibleFormReset] = useState(false);

  // Validate untuk open form reset password atau tidak
  useEffect(() => {
    let isMounted = true; // Flag untuk mencegah eksekusi ganda
  
    const data = {
      emailUser: emailParams,
      codeUser: codeParams,
      expiredUser: expiredParams
    };
  
    if (emailParams && codeParams && expiredParams && isMounted) {
      const validateParams = async () => {
        const responseValidate = await handlerValidateTicketReset(tokenAyotaku, data);
        return responseValidate;
      };
  
      validateParams().then((response) => {
        if (isMounted) {
          const statusResponse = response.status;

          if (statusResponse === 'fail') {
            setIsVisibleFormReset(false);
            toast.error(response.message);

            setTimeout(() => {
              navigate('/profile/me/password');
            }, 1500);

            return;
          }

          setIsVisibleFormReset(true);
          toast.success('Silahkan ganti password');
        }
      });
    }
  
    return () => {
      isMounted = false; // Set flag ke false saat komponen di-unmount
    };
  }, [emailParams, codeParams, expiredParams, tokenAyotaku]);
  

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
    const responseSendLink = await handlerSendLinkResetPassword(Cookies.getCookiesUser('ayotaku-token'));

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
          (!isVisibleFormReset) ? (
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
              <FormResetPassword 
                codeParams={codeParams}
              />
            </>
          )
        }

      </div>
    </>
  )
}

export default ChangePasswordComponent;