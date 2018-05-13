import React from 'react'
import { Modal, Checkbox } from 'antd'
import { observer, inject } from 'mobx-react'
import { accredit } from '../services/crowd'

const modal = ({ crowdId, accreditModalStore, changeAccreditVisible, changeAccreditChecked, updateCrowdList }) => {

  async function handleOk(e) {
    changeAccreditVisible(false)
    if (accreditModalStore.checked) {
      // 授权接口
      const resp = await accredit({
        id: crowdId,
        "auth": 1
      })
      if (resp.code === 0) {
        changeAccreditChecked(false)
        // 重新拉取人群列表
        updateCrowdList()
      }
    }
  }
  function handleCancel(e) {
    changeAccreditVisible(false)
  }

  function onChange(e) {
    changeAccreditChecked(e.target.checked)
  }

  return (<div>
    <Modal
      title="数据源授权"
      visible={accreditModalStore.visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <p>你还<span style={{ color: 'red' }}>未完成</span>该人群包的授权，授权完成后，方可进行人群洞察与营销应用。建议完成该数据源的数据授权。</p>
      <Checkbox checked={accreditModalStore.checked} onChange={onChange}>同意该数据源数据授权给腾讯用于人群画像洞察和营销应用</Checkbox>
    </Modal>
  </div>);
}

const AccreditModal = inject(
  stores => ({
    accreditModalStore: stores.elementStore.accreditModalStore,
    changeAccreditVisible: stores.elementStore.changeAccreditVisible,
    changeAccreditChecked: stores.elementStore.changeAccreditChecked,
    updateCrowdList: stores.elementStore.updateCrowdList
  })
)(observer(modal))

export default AccreditModal