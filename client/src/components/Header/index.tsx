import type { FC } from 'react';
import React, { useState } from 'react';
import { Layout } from 'antd';

import AuthForm from '../AuthForm';
import UserInfo from '../UserInfo';

import './styles.less';

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 50,
  lineHeight: '64px',
  backgroundColor: '#fff',
  boxShadow: '0 1px 4px rgba(0, 21, 41, 0.08)',
  position: 'sticky',
  top: 0,
  zIndex: 1,
  display: 'flex',
  justifyContent: 'space-between',
};

const Header: FC = () => {
  const token = localStorage.getItem('jwt');
  const [ isLoggedIn, setIsLoggedIn ] = useState(!!token);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogoutSuccess = () => {
    setIsLoggedIn(false);
  };

  return (
    <Layout.Header style={headerStyle}>
      <div className='header-logo'>
        <img src='logo-movie.png' className='header-logo-img' />
        <h1 className='header-logo-text'>Funny Movies</h1>
      </div>
      <div className='header-form'>
        {!isLoggedIn && <AuthForm onLoginSuccess={handleLoginSuccess} />}
        {isLoggedIn && <UserInfo onLogoutSuccess={handleLogoutSuccess} /> }
      </div>
    </Layout.Header>
  );
};

export default Header;
