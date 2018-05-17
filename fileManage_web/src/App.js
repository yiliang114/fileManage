import React, {Component} from 'react';
import {Layout, Menu, Icon, Breadcrumb} from 'antd';
import classnames from 'classnames';
import {inject, observer} from 'mobx-react'
import RouteMap from './routerMap'
import './App.less';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

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
        <Layout>
          {/* <Header className="header">
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">nav 1</Menu.Item>
              <Menu.Item key="2">nav 2</Menu.Item>
              <Menu.Item key="3">nav 3</Menu.Item>
            </Menu>
          </Header> */}
          <Layout>
            <Sider width={200} style={{ background: '#fff' }}>
              <Menu
                mode="inline"
                defaultSelectedKeys={['1']}
                defaultOpenKeys={['sub1']}
                style={{ height: '100%', borderRight: 0 }}
              >
                <Menu.Item key="sub1" ><span><Icon type="user" />subnav 1</span></Menu.Item>
                <Menu.Item key="sub2" ><span><Icon type="laptop" />subnav 2</span></Menu.Item>
                <Menu.Item key="sub3" ><span><Icon type="notification" />subnav 3</span></Menu.Item>
              </Menu>
            </Sider>
            <Layout style={{ padding: '0 24px 24px' }}>
              <Content style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}>
                <RouteMap/>
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    // <Layout>   <Sidebar/>   <Layout     className={classnames([     'container',
    // {       'container-collapsed': collapsed     }   ])}>     <Header/> <Bread/>
    //  <Contents/>     <Footer/>   </Layout> </Layout>
    );
  }
}

export default App;