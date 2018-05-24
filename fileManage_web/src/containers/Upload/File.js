import React from 'react'
import { Layout, Form, Icon, Input, Button, Checkbox, Card, Table } from 'antd';

const FormItem = Form.Item;
const { Sider, Header, Content, Footer } = Layout;

const dataSource = [{
  key: '1',
  name: '胡彦斌',
  age: 32,
  address: '西湖区湖底公园1号'
}]

const columns = [{
  title: '姓名',
  dataIndex: 'name',
  key: 'name',
}, {
  title: '年龄',
  dataIndex: 'age',
  key: 'age',
}, {
  title: '住址',
  dataIndex: 'address',
  key: 'address',
}];

class FileForm extends React.Component {

  state = {}

  componentDidMount() { }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Card
        style={{ margin: 10 }}
      >
        <Layout>
          <Header
            style={{ backgroundColor: 'white' }}
          >
            <h3>请输入以下信息</h3>
          </Header>
          <Layout>
            <Content
              style={{ padding: '0 50px', backgroundColor: 'white' }}
            >
              <input type="file" webkitdirectory="true" directory="true" />
              <input type="file" />
              <Button type="primary" htmlType="submit" className="login-form-button">
                提交
              </Button>
            </Content>
          </Layout>
          <Footer
            style={{ backgroundColor: 'white' }}
          >
            <Table dataSource={dataSource} columns={columns} bordered={true} pagination={false} />
          </Footer>
        </Layout>
      </Card>

    )
  }
}

const File = Form.create()(FileForm);

export default File