import React, {Component} from 'react';
import { Layout,Form, Input, Button,message } from 'antd';
import {inject, observer} from 'mobx-react'
import './App.css';

import {getElements,clientWork} from './services/apis'

import FileAndFolderTabs from './components/FileAndFolderTabs'

const FormItem = Form.Item;
const { Header, Content, Footer } = Layout;

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

@inject('pageStore','formStore')
@observer
class AppForm extends Component {

  handleSubmit = (e) => {
    const {fileSrc,folderSrc,scanInterval,type} = this.props.formStore
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const resp = await clientWork(values.serverIp,values.serverPort,{
          fileSrc,
          folderSrc,
          scanInterval,
          type
        })
        this.palyInfos(resp)
      }
    });
  }

  palyInfos = (infos) => {
    message.info(infos);
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <Layout>
        <Header style={{background: 'white', textAlign: 'center'}}>
          <h2>文件传输客户端</h2>
        </Header>
        <Layout>
          <Content style={{ padding: '0 50px' }}>
            <h4>请输入以下信息</h4>
            <Form onSubmit={this.handleSubmit}>
              <FormItem
                {...formItemLayout}
                label="服务器IP"
              >
                {getFieldDecorator('serverIp', {
                  rules: [{ required: true, message: 'Please input your serverIp!' }],
                  initialValue: '127.0.0.1'
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
                  initialValue: '9999'                  
                })(
                  <Input placeholder="serverPort" />
                )}
              </FormItem>
              <FileAndFolderTabs />
              <Button type="primary" onClick={this.handleSubmit}>
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