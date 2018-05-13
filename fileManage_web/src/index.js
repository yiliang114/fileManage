import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'mobx-react'
import stores from './store/indexStore'

import './index.less';
import Page from './Page';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider {...stores}>
  <Page/>
</Provider>, document.getElementById('root'));
registerServiceWorker();