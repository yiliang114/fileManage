// 配置
import React, { Component } from 'react'
import { Input, Divider, Row, Col, Form, Select } from 'antd'
import { observer, inject } from 'mobx-react'
import { withRouter } from "react-router-dom";
import './style.less'

import Wifi from './Config/Wifi'
import Group from './Config/Group'
import Extend from './Config/Extend'
import Keyword from './Config/Keyword'
import LBS from './Config/LBS'

const FormItem = Form.Item;
const Option = Select.Option;

@inject('elementStore', 'creationStore')
@observer
class ConfigForm extends Component {

  componentWillUnmount() {
    //  撤销 isFromCrowd
    this.props.creationStore.turnIsFromCrowd(false)
  }

  render() {
    const { extractType, changeCrowdName, crowdName } = this.props.creationStore
    const { getFieldDecorator, getFieldValue, setFieldsValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };

    function handleChange(value) {
      changeCrowdName(value)
    }

    const settings = (() => {
      let result = {}
      switch (extractType) {
        case 1:
          result = {
            name: '文件上传',
            dom: <Extend />
          }
          break
        case 2:
          result = {
            name: 'WiFi探针',
            dom: <Wifi />
          }
          break
        case 3:
          result = {
            name: '关键词提取',
            dom: <Keyword />
          }
          break
        case 4:
          result = {
            name: '腾讯LBS圈选',
            dom: <LBS />
          }
          break
        case 5:
          result = {
            name: '拓展人群',
            dom: <Extend />
          }
          break
        case 6:
          result = {
            name: '组合人群',
            dom: <Group />
          }
          break
        default:
          console.log('default', extractType)
      }
      return result
    })()

    const { isFromCrowd } = this.props.creationStore
    const data = this.props.location.query
    console.log('data: ', data)
    if (isFromCrowd && data && data.name) {
      // isFromCrowd = true : 不需要再输入人群名称。
      changeCrowdName(data.name)
    }

    return (
      isFromCrowd ? (<div>
        <Row className="configRowBox" style={{ marginTop: 10 }}>
          <Col span={4}><p>人群名称:</p></Col>
          <Col span={8}><p>{data.name}</p></Col>
        </Row>
        <Divider />
        {settings.dom}
      </div>)
        : (<div>
          <h4>基本信息</h4>
          <Row className="configRowBox" style={{ height: 50 }}>
            <Col span={12}>
              <Form>
                <FormItem
                  {...formItemLayout}
                  label="人群名称"
                >
                  {getFieldDecorator('crowdName', {
                    rules: [{
                      required: true, message: '请输入人群名称',
                    }],
                    initialValue: crowdName,
                    // 监听onchange
                    getValueFromEvent(e) {
                      if (!e || !e.target) {
                        return e;
                      }
                      const { target } = e;
                      if (target.type === 'checkbox') {
                        return target.checked
                      } else {
                        handleChange(target.value)
                        return target.value
                      }
                    }
                  })(
                    <Input style={{ width: 170 }} />
                    )}
                </FormItem>
              </Form>
            </Col>
          </Row>
          <Row className="configRowBox" style={{ marginTop: 10 }}>
            <Col span={4}><p>新建方式:</p></Col>
            <Col span={8}><p>{settings.name}</p></Col>
          </Row>
          <Divider />
          {settings.dom}
        </div>)
    )
  }
}

const Config = Form.create()(ConfigForm);

export default withRouter(Config)