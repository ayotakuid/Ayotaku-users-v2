import { useRef, useState } from "react";
import { Button } from "primereact/button";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";

// IMPORT UTILS
import { RECAPTCHA_SITE_KEY } from '../../utils/secrets.json';
import { handlerChangePassword } from '../../utils/handler-fetching';
import Cookies from '../../utils/handler-cookies';
import { useNavigate } from "react-router-dom";

function FormResetPassword({ codeParams }) {
  const tokenAyotaku = Cookies.getCookiesUser('ayotaku-token');
  const recaptcha = useRef();
  const navigate = useNavigate();

  // STATE MANAGEMENT
  const [isErrorValidate, setIsErrorValidate] = useState({
    status: false,
    text: '',
  });
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);
  const [isFormPassword, setIsFormPassword] = useState({
    password: '',
    'new-password': ''
  });

  // onChange dan ada validate input password di dalam nya!
  const onChangeFormLogin = (e) => {
    const { name, value } = e.target;
  
    // Update form password state
    setIsFormPassword({
      ...isFormPassword,
      [name]: value
    });
  
    // Cek jika ada field yang kosong
    if (!isFormPassword.password || !isFormPassword["new-password"]) {
      setIsErrorValidate({
        status: true,
        text: 'Field password tidak boleh kosong!',
      });
      return;
    }
  
    // Cek panjang karakter password
    if (value.length < 8) {
      setIsErrorValidate({
        status: true,
        text: 'Password tidak boleh kurang dari 8 karakter',
      });
      return;
    }
  
    // Validasi kecocokan password hanya jika kedua field sudah diisi
    if (name === "new-password" && isFormPassword.password) {
      if (value !== isFormPassword.password) {
        setIsErrorValidate({
          status: true,
          text: 'Password & Confirm Password tidak sama!',
        });
      } else {
        // Reset error jika sudah sama
        setIsErrorValidate({ status: false, text: '' });
      }
    }
  
    if (name === "password" && isFormPassword["new-password"]) {
      if (value !== isFormPassword["new-password"]) {
        setIsErrorValidate({
          status: true,
          text: 'Password & Confirm Password tidak sama!',
        });
      } else {
        // Reset error jika sudah sama
        setIsErrorValidate({ status: false, text: '' });
      }
    }
  };

  // CLICK BUTTON CONFIRM UNTUK UPDATE PASSWORD
  const handlerButtonConfirm = async (e) => {
    e.preventDefault(); // Mencegah reload halaman
    setIsLoadingConfirm(true);

    if (!isFormPassword.password && !isFormPassword["new-password"]) {
      toast.warning('Field tidak boleh kosong!');
      setIsLoadingConfirm(false);
      return;
    }

    const captchaValue = recaptcha.current.getValue(); // Mengambil nilai ReCAPTCHA
    
    if (!captchaValue) {
      toast.error("Harap verifikasi captcha terlebih dahulu.");
      setIsLoadingConfirm(false);
      return;
    }

    const data = {
      newPassword: isFormPassword["new-password"],
      codeCaptcha: captchaValue,
      codeTicket: codeParams,
    };
    const responseChangePassword = await handlerChangePassword(tokenAyotaku, data);

    setTimeout(() => {
      setIsLoadingConfirm(false);
      setIsErrorValidate({ status: false, text: '' });
      setIsFormPassword({
        password: '',
        'new-password': ''
      });
      recaptcha.current.reset();
      navigate('/profile/me');
      toast.success(responseChangePassword.message);
    }, 1500)
    return;
  }

  return (
    <>
      <div className="grid grid-cols-1 text-lg">
        Form Change Password
      </div>
      <form onSubmit={handlerButtonConfirm}>
        <div className="grid grid-cols-1">
          <label htmlFor="username" className="sr-only">Username</label>
          <input 
            type="text"
            placeholder="Username"
            name="username"
            id="username"
            className="hidden"  // Ini membuat input tersembunyi
            autoComplete="username"
          />
        </div>

        <div className="grid grid-cols-1">
          <label htmlFor="New Password" className="text-ayotaku-text-sm mt-4 mb-1">New Password</label>
          <input 
            type="password"
            placeholder="New Password..."
            name="password"
            value={isFormPassword.password}
            className="block w-52 sm:w-72 rounded-md bg-ayotaku-super-dark outline-none px-2 py-1 text-ayotaku-text-default placeholder:opacity-30 placeholder:text-xs"
            autoComplete="new-password"
            onChange={onChangeFormLogin}
          />
        </div>

        <div className="grid grid-cols-1">
          <label htmlFor="Confirm Password" className="text-ayotaku-text-sm mt-4 mb-1">Confirm Password</label>
          <input 
            type="password"
            placeholder="Confirm Password..."
            name="new-password"
            value={isFormPassword["new-password"]}
            className="block w-52 sm:w-72 rounded-md bg-ayotaku-super-dark outline-none px-2 py-1 text-ayotaku-text-default placeholder:opacity-30 placeholder:text-xs"
            autoComplete="new-password"
            onChange={onChangeFormLogin}
          />
        </div>

        {
          (isErrorValidate.status) ? (
            <div className="grid grid-cols-1 mt-2">
              <p className="text-ayotaku-text-sm text-red-500">
                {isErrorValidate.text}
              </p>
            </div>
          ) : ""
        }

        {
          (!isErrorValidate.status) ? (
            <div className="grid grid-cols-1">
              <Button 
                label="Confirm"
                type="submit"
                className="block mt-2 px-3 w-28 py-2 rounded-md bg-ayotaku-box dark:text-ayotaku-text-default dark:text-ayotaku-text-sm hover:bg-ayotaku-super-dark hover:text-gray-400 duration-500 shadow-none"
                size="sm"
                severity="none"
                loading={isLoadingConfirm}
              />

              <ReCAPTCHA 
                sitekey={RECAPTCHA_SITE_KEY} 
                ref={recaptcha}
                className="mt-2"
                size="normal"
                badge="bottomright"
                
              />
            </div>
          ) : ""
        }
      </form>
    </>
  )
}

export default FormResetPassword;
