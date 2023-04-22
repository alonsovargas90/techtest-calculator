import Cookies from "js-cookie";

export const isAuthenticated = (): boolean => {
  const token = Cookies.get("jwt");

  if (token) {
    return true;
  }

  return false;
};