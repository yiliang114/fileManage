import React, {Component} from 'react';
import RouteMap from './routerMap'
import './App.less';
import { Layout} from 'antd';
const { Footer } = Layout;

const App = () => {
  return (
    <div>
      <RouteMap/>
      <Footer style={{ textAlign: 'center' }}>
        File Manage System ©2018 Created by mrjzhang@zjut.
      </Footer>
    </div>
  );
}

export default App;