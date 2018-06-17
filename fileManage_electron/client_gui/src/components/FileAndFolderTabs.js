import React from 'react';
import { Input,Tabs,Button, Row, Col } from 'antd';
import {inject, observer} from 'mobx-react'

const TabPane = Tabs.TabPane;
const electron = window.require('electron');  
const dialog = electron.remote.dialog

const TabComponent = ({formStore}) => {

  const {changeValue,fileSrc,folderSrc,scanInterval,picFileSrc,curveFileSrc,picFolderSrc,curveFolderSrc} = formStore

  function OpenFileDialog(e,target) {
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
        changeValue(target,filenames[0])
      }
    });
  }

  function OpenFolderDialog(e,target) {
    e.preventDefault();
    dialog.showOpenDialog(null, {
      properties: ['openDirectory','multiSelections'],
    }, function(filenames) {
      console.log('filenames',filenames)
      if(filenames.length > 0 && filenames[0]) {
        changeValue(target,filenames[0])
      }
    });
  }

  function cutSrc(str) {
    console.log('cutSrc',str)
    if(str.length < 30) {
      return str
    }
    return '...'+str.slice(-30)
  }

  function enterScanInterval(e) {
    changeValue('scanInterval',e.target.value)
  }

  function callback(key) {
    console.log(key === 0);
    changeValue('type', key)
    console.log(formStore.type);
  }

  return (
    <Tabs defaultActiveKey="folderInput" onChange={callback}>
      <TabPane tab="单文件传输" key="file">
        <div style={{height: 100}}>
          <Row style={{paddingBottom: 5}}>
            <Col span={6}>
              <Button type="primary" onClick={(e) => OpenFileDialog(e,'fileSrc')}>
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
              <Button type="primary" onClick={(e) => OpenFolderDialog(e,'folderSrc')}>
                选择文件夹地址
              </Button>
            </Col>
            <Col span={18}>
              <h4 style={{lineHeight: '32px'}}>{folderSrc}</h4>
            </Col>
          </Row>
          <Row style={{paddingBottom: 5}}>
            <Col span={6} >
              <h4 style={{lineHeight: '32px'}}>自动扫描时间:</h4>
            </Col>
            <Col span={6}>
              <Input defaultValue={scanInterval} onChange={enterScanInterval}/>
            </Col>
          </Row>
        </div>
      </TabPane>

      <TabPane tab="单文件导入" key="fileInput">
        <div style={{height: 100}}>
          <Row style={{paddingBottom: 5}}>
            <Col span={6}>
              <Button type="primary" onClick={(e) => OpenFileDialog(e,'picFileSrc')}>
                选择图片文件地址
              </Button>
            </Col>
            <Col span={18}>
              <h4 style={{lineHeight: '32px'}}>{cutSrc(picFileSrc)}</h4>
            </Col>
          </Row>
          <Row style={{paddingBottom: 5}}>
            <Col span={6}>
              <Button type="primary" onClick={(e) => OpenFileDialog(e,'curveFileSrc')}>
                选择曲线文件地址
              </Button>
            </Col>
            <Col span={18}>
              <h4 style={{lineHeight: '32px'}}>{cutSrc(curveFileSrc)}</h4>
            </Col>
          </Row>
        </div>
      </TabPane>
      <TabPane tab="多文件导入" key="folderInput">
        <div style={{height: 100}}>
          <Row style={{paddingBottom: 5}}>
            <Col span={6}>
              <Button type="primary" onClick={(e) => OpenFolderDialog(e,'picFolderSrc')}>
                选择图片文件夹地址
              </Button>
            </Col>
            <Col span={18}>
              <h4 style={{lineHeight: '32px'}}>{picFolderSrc}</h4>
            </Col>
          </Row>
          <Row style={{paddingBottom: 5}}>
            <Col span={6}>
              <Button type="primary" onClick={(e) => OpenFolderDialog(e,'curveFolderSrc')}>
                选择曲线文件夹地址
              </Button>
            </Col>
            <Col span={18}>
              <h4 style={{lineHeight: '32px'}}>{curveFolderSrc}</h4>
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