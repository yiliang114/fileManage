import React, {Component} from 'react';
import { Layout,Form, Input, Button,message, Row, Col } from 'antd';
import {inject, observer} from 'mobx-react'
import './App.css';
import {serverStart} from './services/apis'

const electron = window.require('electron');  
const dialog = electron.remote.dialog

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

@inject('formStore')
@observer
class AppForm extends Component {

  handleSubmit = (e) => {
    const {folderSrc} = this.props.formStore
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        let resp = await serverStart(values.serverPort,folderSrc)
        this.palyInfos(resp)
      }
    });
  }

  palyInfos = (infos) => {
    message.info(infos);
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {changeValue,folderSrc} = this.props.formStore
  
    function OpenFolderDialog(e) {
      e.preventDefault();
      dialog.showOpenDialog(null, {
        properties: ['openDirectory','multiSelections'],
      }, function(filenames) {
        console.log('filenames',filenames)
        if(filenames.length > 0 && filenames[0]) {
          changeValue('folderSrc',filenames[0])
        }
      });
    }
  
    function cutSrc(str) {
      console.log('cutSrc',str)
      if(str.length < 50) {
        return str
      }
      return '...'+str.slice(-50)
    }

    return (
      <Layout>
        <Header style={{background: 'white', textAlign: 'center'}}>
          <h2>文件传输服务端</h2>
        </Header>
        <Layout>
          <Content style={{ padding: '0 50px' }}>
            <h4>请输入以下信息</h4>
            <Form>
              <FormItem
                {...formItemLayout}
                label="接收文件端口"
              >
                {getFieldDecorator('serverPort', {
                  rules: [{ required: true, message: 'Please input your serverPort!' }],
                  initialValue: '9999'
                })(
                  <Input placeholder="serverPort" />
                )}
              </FormItem>
              <div style={{height: 100}}>
                <Row style={{paddingBottom: 5}}>
                  <Col span={6}>
                    <Button type="primary" onClick={OpenFolderDialog}>
                      选择接收文件夹地址
                    </Button>
                  </Col>
                  <Col span={18}>
                    <h4 style={{lineHeight: '32px'}}>{cutSrc(folderSrc)}</h4>
                  </Col>
                </Row>
              </div>
              <Button type="primary" onClick={this.handleSubmit}>
                启动
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