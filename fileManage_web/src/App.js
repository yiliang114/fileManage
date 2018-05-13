import React, {Component} from 'react';
import {Layout, Menu, Icon, Breadcrumb} from 'antd';
import classnames from 'classnames';
import {inject, observer} from 'mobx-react'
import RouteMap from './routerMap'
import './App.less';

// import Contents from './components/Contents'; import Sidebar from
// './components/Sidebar'; import Bread from './components/Bread'; import Header
// from './components/Header'; import Footer from './components/Footer'; import
// emitter from './lib/emitter'; import menuData from './lib/menu'; <div>
// <RouteMap/> </div>

@inject('pageStore')
@observer
class App extends Component {

  state = {
    collapsed: false
  }

  render() {
    const {name} = this.props.pageStore
    const {collapsed} = this.state
    return (
      <div>
        <RouteMap/>
      </div>
    // <Layout>   <Sidebar/>   <Layout     className={classnames([     'container',
    // {       'container-collapsed': collapsed     }   ])}>     <Header/> <Bread/>
    //  <Contents/>     <Footer/>   </Layout> </Layout>
    );
  }
}

export default App;