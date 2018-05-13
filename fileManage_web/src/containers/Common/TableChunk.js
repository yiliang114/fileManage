import React from 'react'
import { Row, Col, Table } from 'antd'

// title
// 渲染table 列

export default ({ title, columns, dataSource }) => {
  // if (columns.length || Object.keys(dataSource).length) return (<div></div>)

  return (
    <div>
      <h4>{title}</h4>
      <Table columns={columns} dataSource={dataSource} rowKey={record => record.id} pagination={false} scroll={{ y: 500 }} />
    </div>
  )
}


