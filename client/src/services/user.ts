import request from './request';

const storeToken = (data: any) => {
  // store token
  localStorage.setItem('jwt', data?.token);
  localStorage.setItem('userId', data?.user?.id);
  localStorage.setItem('username', data?.user?.username);
};

export const login = async(username: string, password: string) => {
  const resp = await request.post('/auth/login', {
    username,
    password,
  });

  storeToken(resp.data?.data);

  return resp;
};

export const register = async (username: string, password: string) => {
  const resp = await request.post('/auth/register', {
    username,
    password,
  });

  storeToken(resp.data?.data);

  return resp;
};
