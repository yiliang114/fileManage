import React from 'react'
import { Card,Col,Row,Layout,Button,Input,Upload,Icon, message } from 'antd';
import {dbToExcel} from '../../services/excel'

const { Header, Content, Footer } = Layout;


// C:\Users\Mrz2J\Desktop\test

export default class Operation extends React.Component {

  state = {
    excelFileSrc: ''
  }

  findExcelFile = (e) => {
    e.preventDefault();
    dbToExcel('C:\\Users\\Mrz2J\\Desktop\\test\\1.xls')
  }

  render() {
    const props = {
      name: 'file',
      // action: '//jsonplaceholder.typicode.com/posts/',
      // headers: {
      //   authorization: 'authorization-text',
      // },
      onChange(info) {
        // if (info.file.status !== 'uploading') {
        //   console.log(info.file, info.fileList);
        // }
        // if (info.file.status === 'done') {
        //   message.success(`${info.file.name} file uploaded successfully`);
        // } else if (info.file.status === 'error') {
        //   message.error(`${info.file.name} file upload failed.`);
        // }
        alert(info.file.name)
      },
    };

    return (
      <Card
        style={{ margin: 10 }}
      >
          <Layout>
            <Header style={{background: 'white', textAlign: 'center'}}>
              <h2>其他功能</h2>
            </Header>
            <Layout>
              <Content style={{ padding: '0 50px' }}>
                <Row>
                  <Col span={24}>
                    <h3>导出数据到excel</h3>
                    <div style={{height: 100}}>
                      <Row style={{paddingBottom: 5}}>
                        <Col span={8}>
                          <Upload {...props}>
                            <Button>
                              <Icon type="upload" /> 选择一个空的xls文件
                            </Button>
                          </Upload>
                        </Col>
                        <Col span={6}>
                          <Button type="primary" onClick={this.findExcelFile}>
                            导出
                          </Button>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Content>
            </Layout>       
          </Layout>
      </Card>
    )
  }
}