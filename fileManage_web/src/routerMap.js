import React from 'react';
import {Router, Route, Switch} from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
// 按路由拆分代码
import Loadable from 'react-loadable';
import MyLoadingComponent from './components/MyLoadingComponent'

const history = createHistory();

const AsyncHome = Loadable({
  loader: () => import ('./containers/Home'),
  loading: MyLoadingComponent
});
const AsyncCity = Loadable({
  loader: () => import ('./containers/City'),
  loading: MyLoadingComponent
});
const AsyncNotFound = Loadable({
  loader: () => import ('./containers/NotFound'),
  loading: MyLoadingComponent
});
const AsyncElementTable = Loadable({
  loader: () => import ('./containers/Element.js'),
  loading: MyLoadingComponent
});
const AsyncMonitor = Loadable({
  loader: () => import ('./containers/Monitor/index.js'),
  loading: MyLoadingComponent
});

// 路由配置
class RouteMap extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Switch>
          {/* <Route exact path="/" component={AsyncHome}/> */}

          <Route exact path="/" component={AsyncElementTable}/>
          <Route exact path="/city" component={AsyncCity}/>
          <Route exact path="/monitor" component={AsyncMonitor}/>
          <Route component={AsyncNotFound}/>
        </Switch>
      </Router>
    );
  }
}

export default RouteMap;