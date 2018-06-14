import React from 'react';
import { Input,Tabs,Button, Row, Col,message } from 'antd';
import {inject, observer} from 'mobx-react'

const TabPane = Tabs.TabPane;
const electron = window.require('electron');  
const dialog = electron.remote.dialog

function callback(key) {
  console.log(key);
}

function palyInfos(infos) {
  message.info('This is a normal message');
}

const TabComponent = ({formStore}) => {

  const {changeValue,fileSrc} = formStore

  function OpenDialog(e) {
    e.preventDefault();
    dialog.showOpenDialog(null, {
      properties: ['openFile','multiSelections'],
      // 后缀为html, js, json, md其中之一
      // filters: [{
      //   name: 'Text', 
      //   extensions: ['html', 'js', 'json', 'md'] 
      // }]
    }, function(filenames) {
      console.log('filenames',filenames)
      if(filenames.length > 0 && filenames[0]) {
        changeValue('fileSrc',filenames[0])
      }
    });
  }

  function cutSrc(str) {
    if(str.length < 30) {
      return str
    }
    return '...'+str.slice(-30)
  }

  return (
    <Tabs defaultActiveKey="file" onChange={callback}>
      <TabPane tab="单文件传输" key="file">
        <div style={{height: 100}}>
          <Row style={{paddingBottom: 5}}>
            <Col span={6}>
              <Button type="primary" onClick={OpenDialog}>
                选择文件地址
              </Button>
            </Col>
            <Col span={18}>
              <h4 style={{lineHeight: '32px'}}>{cutSrc(fileSrc)}</h4>
            </Col>
          </Row>
        </div>
      </TabPane>
      <TabPane tab="多文件传输" key="folder">
        <div style={{height: 100}}>
          <Row style={{paddingBottom: 5}}>
            <Col span={6}>
              <Button type="primary" onClick={palyInfos}>
                选择文件夹
              </Button>
            </Col>
            <Col span={18}>
              <Input placeholder="文件文件夹" />
            </Col>
          </Row>
          <Row style={{paddingBottom: 5}}>
            <Col span={6} >
              <h4 style={{lineHeight: '32px'}}>自动扫描时间:</h4>
            </Col>
            <Col span={6}>
              <Input />
            </Col>
          </Row>
        </div>
      </TabPane>
    </Tabs>
  )
}

const FileAndFolderTabs = inject(
  stores => ({
    formStore: stores.formStore
  })
)(observer(TabComponent))

export default FileAndFolderTabs