// 提取方式
import React from 'react'
import {Divider} from 'antd'
import {observer, inject} from 'mobx-react'

import RowPiece from './RowPiece';

@inject('elementStore')
@observer
class Extract extends React.Component {
  constructor() {
    super(...arguments)
  }

  render() {
    const {extractModes} = this.props.elementStore
    const RowDoms = extractModes && extractModes.length && extractModes.map((item) => {
      return <RowPiece data={item} key={item.id}/>
    })
    return (
      <div>
        <h3>请选择人群提取方式</h3>
        {RowDoms}
        <Divider/>
      </div>
    )
  }
}

export default Extract
