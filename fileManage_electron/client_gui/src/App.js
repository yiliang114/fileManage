import React, {Component} from 'react';
import { Layout,Form, Icon, Input, Button, Checkbox } from 'antd';
import {inject, observer} from 'mobx-react'
import './App.css';

import {getElements} from './services/apis'

const FormItem = Form.Item;
const { Header, Content, Footer } = Layout;

@inject('pageStore')
@observer
class AppForm extends Component {

  // async componentDidMount() {
  //   const resp = await getElements()
  //   if (resp) {
  //     console.log('resp', resp)
  //   }
  // }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const {name} = this.props.pageStore

    const { getFieldDecorator } = this.props.form;

    return (
      <Layout>
        <Content style={{ padding: '0 50px' }}>
          <input type="file" webkitdirectory="true" directory="true" />  
          <input type="file" />  
          <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
            {getFieldDecorator('userName', {
              rules: [{ required: true, message: 'Please input your username!' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: 'Please input your Password!' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>
          <FormItem>
            {getFieldDecorator('remember', {
              valuePropName: 'checked',
              initialValue: true,
            })(
              <Checkbox>Remember me</Checkbox>
            )}
            <a className="login-form-forgot" href="">Forgot password</a>
            <Button type="primary" htmlType="submit" className="login-form-button">
              Log in
            </Button>
            Or <a href="">register now!</a>
          </FormItem>
        </Form>
        </Content>
      </Layout>
    );
  }
}

const App = Form.create()(AppForm);

export default App;