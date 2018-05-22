import React from 'react';
import {Col,Row} from 'antd';
import CountUp from 'react-countup';

const Pandect = () => {
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

export default Pandect