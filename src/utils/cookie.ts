import Cookies from "js-cookie";

export const setToken = (jwt: string) => {
  Cookies.set("jwt", jwt, { expires: new Date(Date.now() + 3600 * 1000) });
  console.log("Token set:", jwt);
};

export const getToken = () => {
  return Cookies.get("jwt");
};

export const removeToken = () => {
  Cookies.remove("jwt");
};
