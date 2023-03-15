import type { FC } from 'react';
import type { MenuProps } from 'antd';
import { useState, useEffect } from 'react';
import { Dropdown, Avatar, Button } from 'antd';
import { UserOutlined, LogoutOutlined } from '@ant-design/icons';

import './styles.less';

type UserInfoProps = {
  onLogoutSuccess(): void;
};

const UserInfo: FC<UserInfoProps> = ({ onLogoutSuccess }: UserInfoProps) => {
  const [username, setUsername] = useState<string | null>('');

  const handleLogout = () => {
    localStorage.clear();
    onLogoutSuccess();
  };

  const items: MenuProps['items'] = [
    {
      key: 'logout',
      label: (
        <span onClick={handleLogout}>
          Logout
        </span>
      ),
    },
  ];

  useEffect(() => {
    setUsername(localStorage.getItem('username'));
  }, []);

  return (
    <div className='header-user-info'>
      <div className='header-user-info-username'>
        Welcome {username}
      </div>
      <Button className='header-user-info-space' type='primary'>Share a movie</Button>
      <Dropdown menu={{ items }} placement="bottomRight">
        <Avatar className='header-user-info-space' icon={<UserOutlined />} />
      </Dropdown>
    </div>
  );
};

export default UserInfo;
