import { Button } from "primereact/button";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "sonner";

function ChangePasswordComponent({ isProfileUser }) {

  // VARIABLE FROM REACT ROUTER DOM
  const navigate = useNavigate();
  const locationPage = useLocation();
  const queryParams = new URLSearchParams(locationPage.search);
  const emailParams = queryParams.get('email'),
        codeParams = queryParams.get('code'),
        expiredParams = queryParams.get('exp');

  useEffect(() => {
    if (isProfileUser?.via_register === 'google') {
      navigate('/profile/me');
    }
  })

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

              <div className="block">
                <Button 
                  label="Send Link"
                  className="dark:bg-ayotaku-button dark:text-gray-900 text-ayotaku-text-sm px-2 py-1.5 mt-2 hover:dark:bg-ayotaku-normal-dark duration-500 focus:outline-none focus:shadow-none"
                  size="sm"
                  severity="none"
                  onClick={() => {
                    toast.success('Berhasil dikirim!')
                  }}
                />
              </div>
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