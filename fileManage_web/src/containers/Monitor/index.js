import React from 'react';
import { Card } from 'antd';
import Detail from './Detail';
import Pandect from './Pandect';
import Chart from './Chart';
 
const Monitor = () => {
  return (
    <Card
    style={{ margin: 10 }}
    >
      <h1>监视器</h1>
      <Detail />
      <Pandect />
      <Chart />
    </Card>
  )
}

export default Monitor