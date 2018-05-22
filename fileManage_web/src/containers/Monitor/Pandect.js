import React from 'react';
import {Col,Row} from 'antd';
import CountUp from 'react-countup';
import {getMonitorPandect} from '../../services/monitor'

class Pandect extends React.Component {
  state = {

  }

  async componentDidMount() {
    const resp = await getMonitorPandect()
    console.log('resp: ',resp)
  }

  render() {
    return (
      <div>
        <h2>总共统计</h2>
        <Row>
          <Col span={12}>
            <h3>已传输文件个数</h3>
            <CountUp useEasing={true} separator="," start={2500} end={5000} duration={3} style={{ fontSize: 30, fontWeight: 20, color: 'blue' }} /> 
          </Col>
        </Row>
      </div>
    )
  }
}

export default Pandect