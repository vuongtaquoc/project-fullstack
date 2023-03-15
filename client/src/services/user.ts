import request from './request';

export const login = async(username: string, password: string) => {
  const resp = await request.post('/auth/login', {
    username,
    password,
  });

  // store token
  localStorage.setItem('jwt', resp.data.data?.token);
  localStorage.setItem('userId', resp.data.data?.user?.id);
  localStorage.setItem('username', resp.data.data?.user?.username);

  return resp;
};
