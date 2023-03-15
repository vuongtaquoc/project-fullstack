import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { List } from 'antd';

import * as movieService from '../../services/movie';
import { IMovie } from '../../models/movie';

import MovieItem from './MovieItem';

const HomePage: FC = () => {
  const [movies, setMovies] = useState<IMovie[]>([]);

  useEffect(() => {
    movieService.findAll().then(resp => {
      setMovies(resp.data.data);
    });
  }, []);

  return (
    <List
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 20,
      }}
      dataSource={movies}
      renderItem={(item) => (
        <MovieItem {...item} />
      )}
    />
  );
};

export default HomePage;
