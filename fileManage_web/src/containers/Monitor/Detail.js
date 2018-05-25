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

    const ipChunk = ips && ips.map((trace) => {
      return (
        <Col span={8} key={trace.ip}>
          <h3>{trace.ip}</h3>        
          <CountUp useEasing={true} separator="," start={0} end={trace.num} duration={3} style={{ fontSize: 30, fontWeight: 20, color: 'blue' }} />           
        </Col>
      )
    })

    return (<div>
      <h2>当前在线的客户端</h2>
      <Row>
        {ipChunk}
      </Row>
    </div>)
  }
}

export default Detail