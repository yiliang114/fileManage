import React from 'react'
import { Card,Button } from 'antd';

import {createImgs} from '../../services/element'

const Configuration = () => {
  function qiniuImgs() {
    createImgs()
  }
  return (
    <Card
    style={{ margin: 10 }}
    >
      <div>
        configuration
        <Button onClick={qiniuImgs}>imgs</Button>
      </div>
    </Card>
  )
}

export default Configuration