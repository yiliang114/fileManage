import React from 'react';
import { Router, Route, Switch, Link } from 'react-router-dom';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';
import createHistory from 'history/createBrowserHistory';
// 按路由拆分代码
import Loadable from 'react-loadable';
import MyLoadingComponent from './components/MyLoadingComponent'

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

const history = createHistory();

const AsyncHome = Loadable({
  loader: () => import('./containers/Home'),
  loading: MyLoadingComponent
});
const AsyncCity = Loadable({
  loader: () => import('./containers/City'),
  loading: MyLoadingComponent
});
const AsyncNotFound = Loadable({
  loader: () => import('./containers/NotFound'),
  loading: MyLoadingComponent
});
const AsyncElementTable = Loadable({
  loader: () => import('./containers/Element.js'),
  loading: MyLoadingComponent
});
const AsyncMonitor = Loadable({
  loader: () => import('./containers/Monitor/index.js'),
  loading: MyLoadingComponent
});
const AsyncUpload = Loadable({
  loader: () => import('./containers/Upload/index.js'),
  loading: MyLoadingComponent
});
const AsyncOperation = Loadable({
  loader: () => import('./containers/Operation/index.js'),
  loading: MyLoadingComponent
});
const AsyncConfiguration = Loadable({
  loader: () => import('./containers/Configuration/index.js'),
  loading: MyLoadingComponent
});

// 路由配置
class RouteMap extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Layout>
          <Sider width={200} style={{ background: '#fff' }}>
            <Menu
              mode="inline"
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['monitor']}
              style={{ height: '100%', borderRight: 0 }}
            >
              <Menu.Item key="monitor"><Link to="/monitor"><span><Icon type="area-chart" />Element Monitor</span></Link></Menu.Item>
              <Menu.Item key="table" ><Link to="/table"><span><Icon type="laptop" />Element Table</span></Link></Menu.Item>
              <Menu.Item key="configuration" ><Link to="/configuration"><span><Icon type="setting" />upload configuration</span></Link></Menu.Item>
              <Menu.Item key="operation" ><Link to="/operation"><span><Icon type="appstore-o" />其他功能</span></Link></Menu.Item>
            </Menu>
          </Sider>
          <Layout>
            <Content>
              <Switch>
                <Route exact path="/table" component={AsyncElementTable} />
                <Route exact path="/city" component={AsyncCity} />
                <Route exact path="/monitor" component={AsyncMonitor} />
                <Route exact path="/upload" component={AsyncUpload} />
                <Route exact path="/operation" component={AsyncOperation} />
                <Route exact path="/configuration" component={AsyncConfiguration} />
                <Route component={AsyncNotFound} />
              </Switch>
            </Content>
          </Layout>
        </Layout>
      </Router>
    );
  }
}

export default RouteMap;