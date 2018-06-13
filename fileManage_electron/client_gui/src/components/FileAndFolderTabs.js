import React from 'react';
import { Input,Tabs,Button, Row, Col } from 'antd';
const TabPane = Tabs.TabPane;

function callback(key) {
  console.log(key);
}

const FileAndFolderTabs = () => {
  return (
    <Tabs defaultActiveKey="file" onChange={callback}>
      <TabPane tab="单文件传输" key="file">
        <div style={{height: 100}}>
          <Row style={{paddingBottom: 5}}>
            <Col span={6}>
              <Button type="primary">
                选择文件
              </Button>
            </Col>
            <Col span={18}>
              <Input placeholder="文件地址" />
            </Col>
          </Row>
        </div>
      </TabPane>
      <TabPane tab="多文件传输" key="folder">
        <div style={{height: 100}}>
          <Row style={{paddingBottom: 5}}>
            <Col span={6}>
              <Button type="primary">
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

export default FileAndFolderTabs