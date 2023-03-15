import type { FC } from 'react';
import { List } from 'antd';
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';

import './styles.less';

export type MovieItemProps = {
  title: string;
  description: string;
  content: string;
};

const MovieItem: FC<MovieItemProps> = (item: MovieItemProps) => {
  return (
    <List.Item
      key={item.title}
      className='movie-item'
    >
      <div className='movie-item-video'>
        <img
          width={272}
          alt="logo"
          src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
        />
      </div>
      <div className='movie-item-main'>
        <List.Item.Meta
          className='movie-item-meta'
          title={<a href='#'>{item.title}</a>}
        />
        <div className='movie-item-share-info'>
          Share by: admin@gmail.com
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
          {item.description}
        </div>
      </div>
    </List.Item>
  );
};

export default MovieItem;
