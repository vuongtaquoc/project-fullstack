import type { FC } from 'react';
import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { Layout } from 'antd';

import router from './routes';

import Header from './components/Header';

const layoutStyle: React.CSSProperties = {
  minHeight: '100%',
  backgroundColor: '#fff',
};

const contentStyle: React.CSSProperties = {
  paddingTop: 24,
  width: 1280,
  margin: 'auto'
};

const App: FC = () => {
  return (
    <Layout style={layoutStyle}>
      <Header />
      <Layout.Content style={contentStyle}>
        <RouterProvider router={router} />
      </Layout.Content>
    </Layout>
  );
};

export default App;
