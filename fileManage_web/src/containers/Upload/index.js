import React from 'react'
import { Card, Tabs } from 'antd';
import { inject, observer } from 'mobx-react'

import Loadable from 'react-loadable';
import MyLoadingComponent from '../../components/MyLoadingComponent'

const TabPane = Tabs.TabPane;

const AsyncFile = Loadable({
  loader: () => import('./File.js'),
  loading: MyLoadingComponent
});

const AsyncFolder = Loadable({
  loader: () => import('./Folder.js'),
  loading: MyLoadingComponent
});

export default class Upload extends React.Component {

  callback = (key) => {
    console.log(key);
  }

  render() {
    return (
      <Card
        style={{ margin: 10 }}
      >
        <Tabs defaultActiveKey="client" onChange={this.callback}>
          <TabPane tab="文件导入" key="client">
            <AsyncFile />
          </TabPane>
          <TabPane tab="文件夹导入" key="server">
            <AsyncFolder />
          </TabPane>
        </Tabs>
      </Card>
    );
  }

}