import request from './request';

export const share = (url: string) => {
  return request.post('/movies', {
    videoUrl: url,
  });
};

export const findAll = () => {
  return request.get('/movies');
};
