import React from 'react';
// 路由中不要 # 和 哈希值 用 BrowserRouter ，否则 HashRouter
import { BrowserRouter, Route, IndexRoute, Switch, Redirect} from 'react-router-dom';
import configData from './lib/config';
import App from './App';

export default () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="*" component={App} />
    </Switch>
  </BrowserRouter>
)
