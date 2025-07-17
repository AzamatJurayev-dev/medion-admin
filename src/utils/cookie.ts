import Cookies from 'js-cookie';

export const setToken = (jwt: string) => {
  Cookies.set('jwt', jwt, { expires: 7, path: '' }); 
  console.log('Token set:', jwt);
};

export const getToken = () => {
  return Cookies.get('jwt');
};

export const removeToken = () => {
  Cookies.remove('token');
};
