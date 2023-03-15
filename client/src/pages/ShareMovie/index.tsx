import type { FC } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';

import * as movieService from '../../services/movie';

import './styles.less';

const ShareMoviePage: FC = () => {
  const navigate = useNavigate();

  const onFinish = async (values: any) => {
    try {
      await movieService.share(values.youtubeUrl);

      message.success('Share a movie successful!');

      navigate('/');
    } catch (e) {
      message.error('Share a movie failed. Please try again!');
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
    message.error('Share a movie failed. Please try again!');
  };

  useEffect(() => {
    const token = localStorage.getItem('jwt');

    if (!token) {
      return navigate('/');
    }
  }, []);

  return (
    <div className='share-movie'>
      <fieldset className='share-movie-fieldset'>
        <legend className='share-movie-legend'>Share a Youtube movie</legend>
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          className='share-movie-form'
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Youtube URL"
            name="youtubeUrl"
            rules={[{ required: true, message: 'Please input Youtube URL!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" className='share-movie-button' htmlType="submit">
              Share
            </Button>
          </Form.Item>
        </Form>
      </fieldset>
    </div>
  );
};

export default ShareMoviePage;
