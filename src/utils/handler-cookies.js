const setCookiesUser = (name, value, days) => {
  let expiresIn = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expiresIn = `;expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${(value || "")}${expiresIn};path=/`;
}

const getCookiesUser = (name) => {
  const nameCookies = `${name}=`;
  const cookiesArray = document.cookie.split(';');

  for (let i = 0; i < cookiesArray.length; i++) {
    let cookie = cookiesArray[i].trim();
    if (cookie.indexOf(nameCookies) === 0) {
      return cookie.substring(nameCookies.length, cookie.length);
    }
  }

  return null;
}

const checkingCookiesUser = (name) => {
  const cookiesValue = getCookiesUser(name);
  if (cookiesValue) {
    return {
      isExist: true,
    };
  }

  return {
    isExist: false,
  };
}

export default {
  setCookiesUser,
  getCookiesUser,
  checkingCookiesUser
};
