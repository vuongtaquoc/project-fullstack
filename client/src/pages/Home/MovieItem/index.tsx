import type { FC } from 'react';
import { List } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

import { IMovie } from '../../../models/movie';
import * as words from '../../../utils/words';

import './styles.less';

const MovieItem: FC<IMovie> = (item: IMovie) => {
  return (
    <List.Item
      key={item.youtube_id}
      className='movie-item'
    >
      <div className='movie-item-video'>
        <iframe className='movie-item-video-iframe' width="272" src={`https://www.youtube.com/embed/${item.youtube_id}`} title={item.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen></iframe>
      </div>
      <div className='movie-item-main'>
        <List.Item.Meta
          className='movie-item-meta'
          title={<a href='#'>{item.title}</a>}
        />
        <div className='movie-item-share-info'>
          Share by: {item.created_user.username}
        </div>
        <div className='movie-item-vote'>
          <span className='movie-item-vote-item'>
            99 <LikeOutlined />
          </span>
          <span className='movie-item-vote-item'>
            12 <DislikeOutlined />
          </span>
        </div>

        <div className='movie-item-description'>
          {words.truncate(item.description, 80)}
        </div>
      </div>
    </List.Item>
  );
};

export default MovieItem;
