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
          message: 'Token Expired',
        };
      }

      if (returnData?.status === 'fail') {
        return {
          statusCode: 401,
          status: 'token not match',
          message: returnData?.message,
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

export async function handlerFetchingDisplayUsername(data, token) {
  const headersUsername = new Headers();
  headersUsername.append("Content-Type", "application/json");
  headersUsername.append("Authorization", `Bearer ${token}`);

  const dataRaw = JSON.stringify({
    _displayUsername: data?.displayUsername,
  });

  const requestOptions = {
    method: 'PUT',
    headers: headersUsername,
    body: dataRaw,
    redirect: 'follow'
  };

  try {
    const responseFetchingUsername = await fetch(`${URL_API_AYOTAKU}/user/api/profile`, requestOptions);
    const returnData = await responseFetchingUsername.json();

    return returnData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function handlerSendLinkResetPassword(token) {
  const headerSendLink = new Headers();
  headerSendLink.append("Content-Type", "application/json");
  headerSendLink.append("Authorization", `Bearer ${token}`);

  const requestOptions = {
    method: 'POST',
    headers: headerSendLink,
    redirect: 'follow',
  };

  try {
    const responseFetchingReset = await fetch(`${URL_API_AYOTAKU}/user/api/ticket/reset`, requestOptions);
    const returnData = await responseFetchingReset.json();

    return returnData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function handlerValidateTicketReset(token, data) {
  const headerValidateTicket = new Headers();
  headerValidateTicket.append("Content-Type", "application/json");
  headerValidateTicket.append("Authorization", `Bearer ${token}`);

  const rawData = JSON.stringify(data)

  const requestOptions = {
    method: 'POST',
    headers: headerValidateTicket,
    body: rawData,
    redirect: 'follow'
  }

  try {
    const responseFetching = await fetch(`${URL_API_AYOTAKU}/user/api/ticket`, requestOptions);
    const returnData = await responseFetching.json();

    return returnData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}

export async function handlerChangePassword(token, data) {
  const headerChangePassword = new Headers();
  headerChangePassword.append("Content-Type", "application/json");
  headerChangePassword.append("Authorization", `Bearer ${token}`);

  const rawData = JSON.stringify(data);

  const requestOptions = {
    method: 'PUT',
    headers: headerChangePassword,
    body: rawData,
    redirect: 'follow',
  };

  try {
    const responseChangePassword = await fetch(`${URL_API_AYOTAKU}/user/api/ticket/reset`, requestOptions);
    const returnData = await responseChangePassword.json();

    return returnData;
  } catch (err) {
    console.error(err);
    throw err;
  }
}