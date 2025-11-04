const setCookie = (name, vaule, exSeconds = 3600) => {
  if (typeof window !== 'undefined') {
    const maxAge = `Max-Age=${exSeconds}`;
    document.cookie = `${name}=${encodeURIComponent(vaule)};
        ${maxAge}; path =/; SameSite=Lax;`;
  }
};

const getCookie = (name) => {
  if (typeof window === 'undefined') return null;

  const decodeCookie = decodeURIComponent(document.cookie);
  const cookiesArray = decodeCookie.split(';');

  for (let cookie of cookiesArray) {
    cookie = cookie.trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring((name.length = 1));
    }
  }
  return null;
};

const deletCookie = (name) => {
  if (typeof window !== 'undefined') {
    document.cookie = `${name}=; path=/; Max-Age=-1; SameSite=Lax`;
  }
};
export { setCookie, getCookie, deletCookie };
