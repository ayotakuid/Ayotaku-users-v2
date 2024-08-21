import { URL_API_AYOTAKU } from '../utils/secrets.json';

export async function handlerFetchingActivatedAccount (emailArg, codeArg) {
  const headerActivateAccount = new Headers();
  headerActivateAccount.append("Content-Type", "application/json");

  const requestOptions = {
    method: "POST",
    headers: headerActivateAccount,
    body: JSON.stringify({
      _email: emailArg,
      _code: codeArg,
    }),
    redirect: "follow",
  };

  try {
    const responseFetchingAccount = await fetch(`${URL_API_AYOTAKU}/user/api/active-email`, requestOptions);
    const returnData = await responseFetchingAccount.json();
    return returnData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function handlerFetchingProfileUser (token) {
  const headerProfileUser = new Headers();
  headerProfileUser.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'GET',
    headers: headerProfileUser,
    redirect: 'follow',
  };

  try {
    const responseFetchingProfile = await fetch(`${URL_API_AYOTAKU}/user/api/profile`, requestOptions);
    const returnData = await responseFetchingProfile.json();

    if (!returnData?.data) {
      return {
        statusCode: 401,
        status: 'unauthorized',
        message:  'Token Expired',
      };
    }

    return returnData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}