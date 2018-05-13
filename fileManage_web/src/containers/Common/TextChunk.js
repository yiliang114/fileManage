import React from 'react'
import { Row, Col } from 'antd'

// title
// 渲染文字列

export default ({ title = undefined, columns, dataSource }) => {

  // if (columns.length || Object.keys(dataSource).length) return (<div></div>)

  return (
    <div>
      {title && <h4>{title}</h4>}
      {columns.map((col, index) => {
        return (
          <Row key={index}>
            <Col span={8}>
              <p>{col.title}</p>
            </Col>
            <Col span={8}>
              {col.render ? col.render(dataSource[col.dataIndex]) : dataSource[col.dataIndex]}
            </Col>
          </Row>
        )
      })}
    </div>
  )
}


