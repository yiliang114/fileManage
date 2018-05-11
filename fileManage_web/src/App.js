import React, {Component} from 'react';
import {Button} from 'antd';
import {inject, observer} from 'mobx-react'
import RouteMap from './routerMap'
import './App.css';

@inject('pageStore')
@observer
class App extends Component {
  render() {
    const {name} = this.props.pageStore
    return (
      <div>
        <RouteMap/>
      </div>
    );
  }
}

export default App;