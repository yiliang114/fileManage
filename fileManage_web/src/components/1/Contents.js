import './contents.less';

import React from 'react';
import {Route, Switch, Redirect} from 'react-router-dom';
import {Layout} from 'antd';
import asyncComponent from './asyncComponent'
import NotFound from './NotFound';

import Crowd from '../containers/crowd/Crowd';
import DataInsight from '../containers/data-insight/DataInsight';
import DataOverview from '../containers/data-overview/DataOverview';

const {Content} = Layout;

export default class Contents extends React.Component {
  render() {
    return (
      <Content className="content">
        <Switch>
          <Route exact path="/data-overview" component={DataOverview}/>
          <Route exact path="/crowd" component={Crowd}/>
          <Route exact path="/data-insight" component={DataInsight}/>
          <Route exact path="/data-insight/:id" component={DataInsight}/>
          <Route exact path="*" component={NotFound}/>

        </Switch>
      </Content>
    );
  }
}
