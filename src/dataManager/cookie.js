import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const setCookie = (id, value, option) => {
  return cookies.set(id, value, { ...option });
};

export const getCookies = (id) => {
  return cookies.get(id);
};

const cookieControler = () => {
  return null;
};

export default cookieControler;
