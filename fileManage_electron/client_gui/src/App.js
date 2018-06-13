import React, {Component} from 'react';
import { Layout,Form, Input, Button,Divider } from 'antd';
import {inject, observer} from 'mobx-react'
import './App.css';

import {getElements} from './services/apis'

import FileAndFolderTabs from './components/FileAndFolderTabs'

const FormItem = Form.Item;
const { Header, Content, Footer } = Layout;

const electron = window.require('electron');  
const dialog = electron.remote.dialog

const formItemLayout = {
  labelCol: {
    xs: { span: 8 },
    sm: { span: 5 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

@inject('pageStore')
@observer
class AppForm extends Component {

  handleSubmit = (e) => {
    e.preventDefault();
    dialog.showOpenDialog(null, {
      properties: ['openFile', 'openDirectory','multiSelections'],
      // 后缀为html, js, json, md其中之一
      // filters: [{
      //   name: 'Text', 
      //   extensions: ['html', 'js', 'json', 'md'] 
      // }]
    }, function(filenames) {
      console.log('filenames',filenames)
    });

  }

  render() {
    const {name} = this.props.pageStore

    const { getFieldDecorator } = this.props.form;

    return (
      <Layout>
        <Header style={{background: 'white', textAlign: 'center'}}>
          <h2>文件传输客户端</h2>
        </Header>
        <Layout>
          <Content style={{ padding: '0 50px' }}>
            <h4>请输入以下信息</h4>
            <Form onSubmit={this.handleSubmit} className="login-form">
              <FormItem
                {...formItemLayout}
                label="服务器IP"
              >
                {getFieldDecorator('serverIp', {
                  rules: [{ required: true, message: 'Please input your serverIp!' }],
                })(
                  <Input placeholder="serverIp" />
                )}
              </FormItem>
              <FormItem
                {...formItemLayout}
                label="服务器端口"
              >
                {getFieldDecorator('serverPort', {
                  rules: [{ required: true, message: 'Please input your serverPort!' }],
                })(
                  <Input placeholder="serverPort" />
                )}
              </FormItem>
              <FileAndFolderTabs />
              <Divider />
              <Button type="primary" htmlType="submit" className="login-form-button">
                传输
              </Button>
            </Form>
          </Content>
        </Layout>  
        <Footer>
          
        </Footer>      
      </Layout>
    );
  }
}

const App = Form.create()(AppForm);

export default App;