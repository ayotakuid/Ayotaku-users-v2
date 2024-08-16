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