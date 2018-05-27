import React from 'react'
import { Layout, Form, Icon, Input, Button, Checkbox, Card, Table,Upload, message,Row, Col } from 'antd';

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

const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

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
            <Row>
              <Col span={12}>
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> 上传图片文件
                  </Button>
                </Upload>
              </Col>
              <Col span={12}>
                <Upload {...props}>
                  <Button>
                    <Icon type="upload" /> 上传曲线文件
                  </Button>
                </Upload>
              </Col>
            </Row>
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