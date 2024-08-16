import { useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { handlerFetchingActivatedAccount } from '../../utils/handler-fetching';
import Cookies from '../../utils/handler-cookies';

function ActivatedAccountComponent() {
  const navigate = useNavigate();
  const locationPage = useLocation();
  const queryParams = new URLSearchParams(locationPage.search);
  const emailUser = queryParams.get('email'),
        codeActivate = queryParams.get('code');

  // STATE MANAGEMENT
  const toastShowRef = useRef(false);

  useEffect(() => {
    const promise = () => new Promise((resolve) => setTimeout(resolve, 1000));
    if (!emailUser && !codeActivate) {
      navigate('/');
      return 
    }

    const responseActivatedAccount = async () => {
      const response = await handlerFetchingActivatedAccount(emailUser, codeActivate);
      return response;
    }

    responseActivatedAccount().then((response) => {
      if (!toastShowRef.current) {
        toast.success(response?.message, { duration: 1000 });
        toastShowRef.current = true;
  
        setTimeout(() => {
          navigate(`/?token=${response.data.tokenWeb}&isLogin=${response.data._isLogin}`)
        }, 1500)
      }
    }).catch((err) => {
      console.error(err);
      toast.err
    })

  }, []);

  useEffect(() => {
    setInterval(() => {
      if (Cookies.getCookiesUser('ayotaku-isLogin') === 'true') {
        navigate('/')
        location.reload();
        clearInterval()
      }
    }, 1000);
  }, []);

  return (
    <>
      <Helmet>
        <title>Ayotaku id - Activate Account</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center dark:text-ayotaku-text-default">
        <div className="md:max-w-4xl max-h-fit bg-ayotaku-box rounded-lg shadow-md p-3">
          <div className="container mx-auto justify-center items-center">
            <div className="grid items-center justify-center">
              <span className="grid grid-cols-1 items-center justify-center text-sm text-teal-200 text-opacity-70 w-96 text-center mt-3 mb-3">
              <i className="pi pi-check-circle text-2xl mb-3"></i>
                Account sudah active! Silahkan tunggu beberapa detik...
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ActivatedAccountComponent;