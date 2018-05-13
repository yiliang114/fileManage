// 提取方式
import React from 'react'
import {Row, Col, Divider, Card, message} from 'antd'
import classnames from 'classnames';
import styles from './style.less'
import {observer, inject} from 'mobx-react'

@inject('creationStore')
@observer
export default class RowPiece extends React.Component {

  checkMode = (id) => {
    console.log(id)
    if (id === 1) {
      message.error('该功能正在更新，请前往【数据源管理】导入数据来创建人群~')
    } else {
      this
        .props
        .creationStore
        .changeExtractType(id)
    }
  }

  render() {

    const {title, types} = this.props.data
    const {extractType} = this.props.creationStore

    return (
      <div>
        <h4>{title}</h4>
        <Row>
          {types.map((item, index) => {
            return (
              <Col span={4} key={item.id} className="colContainer" onClick={() => this.checkMode(item.id)} // 产品要求： 文件数据上传暂时不可选
  className={classnames([
                'colContainer', {
                  'disabled': item.id === 1
                }, {
                  'selected': extractType === item.id && extractType !== 1
                }
              ])}>
                <div className={classnames(['modeImg', `${item.img}-img`])}></div>
                <div className='modeBody'>
                  <div className="title">{item.name}</div>
                  <p>{item.context}</p>
                </div>
              </Col>
            )
          })}
        </Row>
      </div >
    )
  }
}