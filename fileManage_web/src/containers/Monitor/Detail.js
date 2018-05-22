import React from 'react';
import {Col,Row} from 'antd';
import CountUp from 'react-countup';

import {getMonitorDetail} from '../../services/monitor'

class Detail extends React.Component {
  state = {
    ips: null
  }

  async componentDidMount() {
    const resp = await getMonitorDetail()
    console.log('resp',resp)
    if(resp && resp.length) {
      this.setState({
        ips: resp
      })
    }
  }

  render() {
    const {ips} = this.state

    return (<div>
      <h2>当前在线的客户端</h2>
      <Row>
        <Col span={8}>
          <h3>ip1</h3>
          <CountUp useEasing={true} separator="," start={2500} end={5000} duration={3} style={{ fontSize: 30, fontWeight: 20, color: 'blue' }} /> 
        </Col>
        <Col span={8}>
          <h3>ip2</h3>        
          <CountUp useEasing={true} separator="," start={2500} end={5000} duration={3} style={{ fontSize: 30, fontWeight: 20, color: 'blue' }} />           
        </Col>
        <Col span={8}>
          <h3>ip3</h3> 
          <CountUp useEasing={true} separator="," start={2500} end={5000} duration={3} style={{ fontSize: 30, fontWeight: 20, color: 'blue' }} />           
        </Col>
        <Col span={8}>
          <h3>ip4</h3> 
          <CountUp useEasing={true} separator="," start={2500} end={5000} duration={3} style={{ fontSize: 30, fontWeight: 20, color: 'blue' }} />           
        </Col>
        <Col span={8}>
          <h3>ip5</h3> 
          <CountUp useEasing={true} separator="," start={2500} end={5000} duration={3} style={{ fontSize: 30, fontWeight: 20, color: 'blue' }} />           
        </Col>
      </Row>
    </div>)
  }
}

export default Detail