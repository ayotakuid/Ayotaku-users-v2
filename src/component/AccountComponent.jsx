import { useEffect, useState } from "react";
import { classNames } from "primereact/utils";

// IMPORT COMPONENT
import SvgRenderComponent from "./utils/SvgRenderComponent";

// IMPORT UTILS
import { formatDateToString } from '../utils/handler-date';
import { handlerFetchingDisplayUsername } from '../utils/handler-fetching';
import Cookies from '../utils/handler-cookies';
import { toast } from "sonner";
import { Button } from "primereact/button";
import ImageRenderComponent from "./utils/ImageRenderComponent";

const validateInput = (text) => {
  const regex = /^[a-zA-Z0-9 _-]+$/;
  return regex.test(text);
}

function BadgeViaRegisterComponent({ isViaRegister }) {
  const conditionalVia = (via) => {
    if (via === 'form') {
      return {
        badgeColors: 'bg-gray-800',
        badgeText: 'Form Ayotaku',
      }
    }

    return {
        badgeColors: 'bg-gray-950',
        badgeText: 'Google Services',
    }
  }
  return (
    <span className={classNames(
      conditionalVia(isViaRegister).badgeColors,
      "inline-flex items-center rounded-md px-2 py-1 text-xs font-medium text-ayotaku-text-default ring-1 ring-inset ring-gray-500/10 mx-0.5 sm:mx-2"
    )}>
      {conditionalVia(isViaRegister).badgeText}
    </span>
  )
}

function AccountComponent({ isProfileUser, setIsProfileUser }) {

  // STATE MANAGEMENT LOADING
  const [isLoadingConfirm, setIsLoadingConfirm] = useState(false);

  // STATE MANAGEMENT GLOBAL DI ACCOUNT COMPONENT
  const [isErrorValidate, setIsErrorValidate] = useState({ status: false, text: '' });
  const [isValueInputDisplayUsername, setIsValueInputDisplayUsername] = useState({
    displayUsername: '',
  })

  const onChangeDisplayUsername = (e) => {
    const { name, value } = e.target;

    if (value.length > 15) {
      setIsErrorValidate({
        status: true,
        text: "Limit 15 character!"
      });
      return;
    }

    if (value.length === 0) {
      setIsErrorValidate({
        status: true,
        text: "Display Username tidak boleh kosong!"
      });
      setIsValueInputDisplayUsername({
        ...isValueInputDisplayUsername,
        [name]: value
      });
      return
    }

    if (!validateInput(value)) {
      setIsErrorValidate({
        status: true,
        text: "Hanya boleh memakai simbol - dan _"
      });
      setIsValueInputDisplayUsername({
        ...isValueInputDisplayUsername,
        [name]: value
      });
      return
    }

    setIsErrorValidate({ status: false, text: '' });
    setIsValueInputDisplayUsername({
      ...isValueInputDisplayUsername,
      [name]: value
    });
  };

  const onClickConfirmButton = async () => {
    setIsLoadingConfirm(true);
    if (!isValueInputDisplayUsername.displayUsername) {
      setIsLoadingConfirm(false);
      setIsErrorValidate({ status: true, text: 'Display Username tidak boleh kosong!' })
      return;
    }
    
    const responseFetcing = await handlerFetchingDisplayUsername(isValueInputDisplayUsername, Cookies.getCookiesUser("ayotaku-token"));

    if (responseFetcing.status === 'fail') {
      toast.error(responseFetcing.message);
      return;
    }

    setTimeout(() => {
      setIsLoadingConfirm(false);
      setIsProfileUser({
        ...isProfileUser,
        displayUsername: isValueInputDisplayUsername.displayUsername,
      });
      toast.success(responseFetcing.message);
    }, 1000)
    return;
  }

  return (
    <>
      <div className="bg-ayotaku-dark px-2 py-3 sm:px-5 text-ayotaku-text-default rounded-lg">
        <div className="px-4 sm:px-0">
          <h3 className="text-xl font-semibold leading-7">Profile Information</h3>
          <p className="mb-5 max-w-2xl leading-6 text-ayotaku-text-xs">Email, Username, Display Username & Photo</p>
        </div>
        
        <div className="grid grid-cols-1 justify-items-center">
          {
            (isProfileUser?.via_register === 'form') ? (
              <SvgRenderComponent 
                svgString={isProfileUser?.from_google.picture}
                size={70}
              />
            ) : (
              <>
                <ImageRenderComponent 
                  imageUrl={isProfileUser?.from_google.picture}
                  classTailwind={'rounded-full w-20'}
                  altText={isProfileUser?.email}
                />
                <div 
                  className="text-ayotaku-text-sm w-28 px-2 py-1 my-2 rounded-md text-center text-ayotaku-text-default bg-ayotaku-box cursor-pointer hover:bg-ayotaku-super-dark hover:duration-300"
                  onClick={() => {
                    toast.warning("Coming Soon", { duration: 1000 })
                  }}
                >
                  Generate Photo
                </div>          
              </>
            )
          }
        </div>

        <div className="mt-6 border-t border-gray-100">
          <dl className="divide-y divide-gray-100">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Email</dt>
              <dd className="mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0">
                {isProfileUser?.from_google.email}
                <BadgeViaRegisterComponent 
                  isViaRegister={isProfileUser?.via_register}
                />
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Username</dt>
              <dd 
                className={classNames(
                  (!isProfileUser?.username) ? 'text-gray-400 opacity-50' : '',
                  "mt-1 text-sm leading-6 sm:col-span-2 sm:mt-0"
                )}
              >
                {(!isProfileUser?.username) ? 'unknown.' : isProfileUser?.username}
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Display Username</dt>
              <dd className="mt-1 text-sm leading-6 text-ayotaku-text-default sm:col-span-2 sm:mt-0">
                {
                  (!isProfileUser?.displayUsername) ? (
                    <>
                      <input 
                        type="text"
                        placeholder="Display Username kamu..."
                        name="displayUsername"
                        value={isValueInputDisplayUsername.displayUsername}
                        className="block w-52 sm:w-72 rounded-md bg-ayotaku-super-dark outline-none px-2 py-0.5 text-ayotaku-text-default placeholder:opacity-30 placeholder:text-xs"
                        onChange={onChangeDisplayUsername}
                      />
                      {(!isErrorValidate.status) ? (
                        <Button 
                          type="button" 
                          className="block mx-0.5 mt-2 px-3 py-0.5 rounded-md bg-ayotaku-box dark:text-ayotaku-text-default dark:text-ayotaku-text-sm hover:bg-ayotaku-super-dark hover:text-gray-400 hover:duration-500"
                          onClick={async () => await onClickConfirmButton()}
                          label="Confirm"
                          loading={isLoadingConfirm}
                          size="sm"
                          severity="none"
                        />
                      ) : (
                        <p className="mx-0.5 text-ayotaku-text-xs text-red-400">{isErrorValidate.text}</p>
                      )}
                      <p className="mx-0.5">{(!isValueInputDisplayUsername.displayUsername) ? '' : isValueInputDisplayUsername.displayUsername}</p>
                    </>
                  ) : (
                    isProfileUser?.displayUsername
                  )
                }
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm font-medium leading-6">Account Created</dt>
              <dd className="mt-1 text-sm leading-6 text-ayotaku-text-default sm:col-span-2 sm:mt-0">
                {formatDateToString(isProfileUser?.created_at)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </>
  )
}

export default AccountComponent;