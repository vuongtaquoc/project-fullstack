import axios from 'axios';

export type PlainObject<T = any> = Record<string, T>;

const instance = axios.create({
  baseURL: process.env.API_URL,
  params: {},
});

instance.interceptors.response.use(
  response => response,
  error => Promise.resolve(error)
);

type Options = {
  token?: string;
  params?: PlainObject;
};

const getHeaders = () => {
  const token = localStorage.getItem('jwt');

  return {
    Authorization: token ? `Bearer ${ token }` : '',
  };
};

const request = {
  get(endpoint: string, options: Options = {}) {
    return instance.get(endpoint, {
      params: options.params,
      headers: getHeaders(),
    });
  },
  post(endpoint: string, body?: PlainObject, options: Options = {}) {
    return instance.post(endpoint, body, {
      params: options.params,
      headers: getHeaders(),
    });
  },
  put(endpoint: string, body?: PlainObject, options: Options = {}) {
    return instance.put(endpoint, body, {
      params: options.params,
      headers: getHeaders(),
    });
  },
  delete(endpoint: string, options: Options = {}) {
    return instance.delete(endpoint, {
      params: options.params,
      headers: getHeaders(),
    });
  },
};

export default request;
