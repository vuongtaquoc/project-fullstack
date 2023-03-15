import type { FC } from 'react';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from 'antd';

import routes from './routes';

import Header from './components/Header';

const layoutStyle: React.CSSProperties = {
  minHeight: '100%',
  backgroundColor: '#fff',
};

const contentStyle: React.CSSProperties = {
  paddingTop: 40,
  width: 1280,
  margin: 'auto'
};

const App: FC = () => {
  return (
    <Layout style={layoutStyle}>
      <Header />
      <Layout.Content style={contentStyle}>
        <Routes>
          {
            routes.map(route => (
              <Route key={route.path} path={route.path} element={route.element} errorElement={route.errorElement} />
            ))
          }
        </Routes>
      </Layout.Content>
    </Layout>
  );
};

export default App;
