import type { FC } from 'react';
import { Form, Input, Button } from 'antd';

import './styles.less';

const ShareMoviePage: FC = () => {
  const onFinish = (values: any) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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
            <Button type="primary" className='share-movie-button' htmlType="button">
              Share
            </Button>
          </Form.Item>
        </Form>
      </fieldset>
    </div>
  );
};

export default ShareMoviePage;
