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
      if (returnData?.statusCode === 401) {
        return {
          statusCode: 401,
          status: 'unauthorized',
          message:  'Token Expired',
        };
      }

      return {
        statusCode: 429,
        status: 'too many request',
        message: returnData?.message,
      };
    }

    return returnData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function handlerFetchingSignUp(data) {
  const headersFetchingSignup = new Headers();
  headersFetchingSignup.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    _email: data?.email,
    _username: data?.username,
    _password: data?.password,
    _type: data?.type,
  });

  const requestOptions = {
    method: 'POST',
    headers: headersFetchingSignup,
    body: raw,
    redirect: 'follow'
  };

  try {
    const responseFetchingSignup = await fetch(`${URL_API_AYOTAKU}/user/api/signup`, requestOptions);
    const returnData = await responseFetchingSignup.json();
    
    return returnData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function handlerFetchingSignIn(data) {
  const headersFetchingSignin = new Headers();
  headersFetchingSignin.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    _username: data?.username,
    _password: data?.password,
    _type: 'web',
  });

  const requestOptions = {
    method: 'POST',
    headers: headersFetchingSignin,
    body: raw,
    redirect: 'follow',
  };

  try {
    const responseFetchingSignin = await fetch(`${URL_API_AYOTAKU}/user/api/signin`, requestOptions);
    const returnData = await responseFetchingSignin.json();

    return returnData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}