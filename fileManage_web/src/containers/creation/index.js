import React from 'react';
import { Row, Col, Steps, Button, message, Card } from 'antd';
import { inject, observer } from 'mobx-react'
import Extract from './Extract'
import Config from './Config'
import { withRouter } from "react-router-dom";


const Step = Steps.Step;

const steps = [{
  title: '提取方式',
  content: <Extract />,
}, {
  title: '配置',
  content: <Config />,
}];

@inject('creationStore', 'dataManagerStore', 'dataIndexStore')
@observer
class Creation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }

  componentWillUnmount() {
    // console.log('componentWillUnmount')
    this.props.creationStore.changeStepCurrent(0)
    this.props.creationStore.changeExtractType(1)
  }

  next() {
    // upload link to data butt
    const { extractType } = this.props.creationStore
    const { changeUploadType, changeActivekey } = this.props.dataIndexStore
    if (extractType === 1) {
      // 暂时不可用
      // changeActivekey('upload')
      // changeUploadType(5)
      // console.log('link to data butt')
      // this.props.history.push('data-butt');

    } else {
      const { changeStepCurrent, stepCurrent } = this.props.creationStore
      changeStepCurrent(stepCurrent + 1)
    }

  }
  prev() {
    const { changeStepCurrent, stepCurrent } = this.props.creationStore
    changeStepCurrent(stepCurrent - 1)
  }

  handleSubmit = async () => {
    const {
      allHandleSubmit,
      crowdName,
      extractType,
      setKeywordStoreData,
      changeCrowdName,
      keyword: {
        info: {
          kw_valid,
        kw_invalid,
        kw_extend,
        kw_exclude_valid,
        kw_exclude_invalid
        }
      }
    } = this.props.creationStore

    if (crowdName) {
      const resp = await allHandleSubmit()
      console.log('resp', resp)
      if (resp && resp.code === 0) {
        message.success(resp.info)
        // 跳转到人群优选
        this.props.history.push('crowd');
        // 清空输入框的值
        changeCrowdName(null)
        // 清空lbs 已选人群
        this.props.creationStore.changeLBSValue('fences', [])

      } else {
        message.error(resp.info)
      }

    } else {
      message.error('请输入人群名称!')
    }
  }

  // router
  goto = (url, key, value) => {
    var path = {
      pathname: url,
      query: {
        [key]: value
      },
    }
    this.props.history.push(path);
  }


  render() {
    // const { current } = this.state;
    const { stepCurrent } = this.props.creationStore

    const data = this.props.location.query
    // console.log('creation data: ', data)
    if (data && data.name) {
      this.props.creationStore.turnIsFromCrowd(true)
    }


    return (
      <div>
        <Row style={{ paddingTop: 10, paddingBottom: 10 }}>
          <Col span={8}>
            <Steps current={stepCurrent}>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
          </Col>
        </Row>

        <Card>
          <div className="steps-content">{steps[stepCurrent].content}</div>
          <div className="steps-action">
            {
              stepCurrent < steps.length - 1
              &&
              <div>
                <Button type="primary" onClick={() => this.next()}>下一步</Button>
                <Button style={{ marginLeft: 8 }} onClick={() => this.next()}>取消</Button>
              </div>
            }
            {
              stepCurrent === steps.length - 1
              &&
              <Button type="primary" onClick={this.handleSubmit}>确定</Button>
            }
            {
              stepCurrent > 0
              &&
              <Button style={{ marginLeft: 8 }} onClick={() => this.prev()}>
                上一步
              </Button>
            }
          </div>
        </Card>


      </div>
    );
  }
}

export default withRouter(Creation)
