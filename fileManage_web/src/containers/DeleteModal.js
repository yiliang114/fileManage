import React from 'react'
import { Modal, Checkbox, Table } from 'antd'
import { observer, inject } from 'mobx-react'
import { deleteCrowd } from '../services/crowd'

const modal = ({ record, deleteModalStore, changeDeleteVisible, updateCrowdList }) => {

  async function handleOk(e) {
    changeDeleteVisible(false)
    // 向后台请求删除数据源操作
    console.log('delete id: ', record)
    const resp = await deleteCrowd({
      id: record.id
    })
    // 不需要处理: 人群已被应用，不允许删除。
    if (resp.code === 0) {
      // 更新数据
      updateCrowdList()
    }

  }
  function handleCancel(e) {
    changeDeleteVisible(false)
  }

  return (<div>
    <Modal
      title="删除数据源"
      visible={deleteModalStore.visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>没有应用的人群包, 可以删除。确认删除人群包吗？</p>
    </Modal>
  </div>);
}

const DeleteModal = inject(
  stores => ({
    deleteModalStore: stores.elementStore.deleteModalStore,
    changeDeleteVisible: stores.elementStore.changeDeleteVisible,
    updateCrowdList: stores.elementStore.updateCrowdList
  })
)(observer(modal))

export default DeleteModal