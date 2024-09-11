const setCookiesUser = (name, value, days) => {
  let expiresIn = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expiresIn = `;expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${(value || "")}${expiresIn};path=/;SameSite=Strict;Secure`;
}

const setCookiesMenit = (name, value, minutes) => {
  let expiresIn = "";
  if (minutes) {
    const date = new Date();
    date.setTime(date.getTime() + (minutes * 60 * 1000)); // Konversi menit ke milidetik
    expiresIn = `;expires=${date.toUTCString()}`;
  }

  document.cookie = `${name}=${(value || "")}${expiresIn};path=/;SameSite=Strict;Secure`;
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

const deleteCookiesUser = (name, path = '/', domain = '', secure = true, sameSite = 'Strict') => {
  // Mengatur cookie dengan masa kadaluarsa di masa lalu
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}; domain=${domain}; ${secure ? 'Secure; ' : ''}SameSite=${sameSite}`;
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
  setCookiesMenit,
  getCookiesUser,
  deleteCookiesUser,
  checkingCookiesUser
};
