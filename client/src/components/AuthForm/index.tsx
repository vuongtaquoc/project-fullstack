import type { FC } from 'react';
import { Form, Input, Button, message } from 'antd';

import * as userService from '../../services/user';

import './styles.less';

type AuthFormProps = {
  onLoginSuccess(user: any): void;
};

const AuthForm: FC<AuthFormProps> = ({ onLoginSuccess }: AuthFormProps) => {
  const [form] = Form.useForm();

  const handleLogin = async () => {
    const username = form.getFieldValue('username');
    const password = form.getFieldValue('password');

    try {
      const resp = await userService.login(username, password);

      message.success('Login successful!');

      onLoginSuccess(resp.data.data.user);
    } catch (e) {
      message.error('Login failed, please try again!');
    }
  };

  const handleRegister = () => {

  };

  return (
    <Form
      layout='inline'
      className='auth-form'
      autoComplete="off"
      form={form}
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
        <Button type="link" onClick={handleLogin}>Login</Button>
        <span className='auth-form-divide'>/</span>
        <Button type="link" onClick={handleRegister}>Register</Button>
      </div>
    </Form>
  );
};

export default AuthForm;
