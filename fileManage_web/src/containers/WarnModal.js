import React from 'react'
import { Modal, Button } from 'antd'
import { observer, inject } from 'mobx-react'

// todo
// stateless Component

@inject('creationStore')
@observer
export default class WarnModal extends React.Component {

  handleOk = () => {
    this.props.creationStore.changeCBWarnModalVisible(false)
  }

  render() {
    return (<div>
      <Modal
        title="已达最大人群数量"
        visible={this.props.creationStore.group.warnModalVisible}
        onCancel={this.handleOk}
        footer={
          <Button type="primary" onClick={this.handleOk}>确认</Button>
        }
      >
        <p>目前，最多支持10个人群包的组合计算。</p>
      </Modal>
    </div>);
  }
}