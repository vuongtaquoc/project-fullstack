import type { FC } from 'react';
import { Form, Input, Button } from 'antd';

import './styles.less';

const AuthForm: FC = () => {
  return (
    <Form
      layout='inline'
      className='auth-form'
    >
      <Form.Item
        label=""
        name="username"
        rules={[{ required: true, message: '' }]}
      >
        <Input placeholder='Username' />
      </Form.Item>
      <Form.Item
        label=""
        name="password"
        rules={[{ required: true, message: '' }]}
      >
        <Input.Password placeholder='Password' />
      </Form.Item>
      <div className='auth-form-group-button'>
        <Button type="link">Login</Button>
        <span className='auth-form-divide'>/</span>
        <Button type="link">Register</Button>
      </div>
    </Form>
  );
};

export default AuthForm;
