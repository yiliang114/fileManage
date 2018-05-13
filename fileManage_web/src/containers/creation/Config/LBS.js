import React from 'react'
import { Tag } from 'antd';
import { inject, observer } from 'mobx-react'
import { lbssign } from '../../../../services/lbs'

@inject('creationStore')
@observer
export default class LBS extends React.Component {

  state = {
    height: 700
  }
  async componentDidMount() {
    // iframe loading完后使用postMessage传递信息到电子围栏页面
    var iframeDom = document.getElementById('iframe');
    const resp = await lbssign()
    if (resp && resp.code === 0) {
      var data = {
        action: 'init',
        message: {
          // userId: 1640599564, // 用户id
          // appid: 'Bzm8xM6AVCQBgTTklV1WjYidJpkU3cWc',
          // appName: 'pdmp', // 使用iframe嵌入页面的，工程名称
          // timestamp: 1525057906660, // 时间戳
          // sign: 'f1b91561cb681d594c3a3af0e8fc98d3', // md5加密字符串
          ...resp.data,
          userId: 1640599564, // 用户id
          selectedRegion: [], // 已选择的电子围栏id
        }
      };
      iframeDom.onload = function (e) {
        iframeDom.contentWindow.postMessage(data, '*');
      }
    }


    // 接收消息
    window.addEventListener('message', (e) => {
      if (e.data.action === 'response') { // 接收成功反馈
        //可忽略
      } else if (e.data.action === 'resize') { // 内容大小改变
        this.setState({
          height: e.data.message.height
        })
      } else if (e.data.action === 'rename') { // 勾选
        // id: '34', name: 'xxx',
        console.log('rename: ', e.data.message[0]);
        // todo
        // 修改obj
        // const message = e.data.message
        // if (message && message[0]) {
        //   this.addFences(message[0])
        // }
        const message = e.data.message
        if (message && message[0]) {
          this.editFences(message[0])
        }

      } else if (e.data.action === 'add') { // 勾选
        // name: '', // 电子围栏名称 id: '', // 电子围栏id, poi: '', // 电子围栏经纬度, type: '', // 电子围栏类型
        // console.log('勾选： ', e.data.message[0]);
        // const message = e.data.message
        // if (message && message[0]) {
        //   this.addFences(message[0])
        // }

        if (e.data.message.length == 1) {
          this.addFences(e.data.message[0])
        } else {
          for (let i = 0; i < e.data.message.length; i++) {
            this.addFences(e.data.message[i])
          }
        }

      } else if (e.data.action === 'delete') { // 取消勾选
        // 'id1', 'id2', // 电子围栏id
        // console.log('取消勾选: ', e.data.message[0]);
        if (e.data.message.length == 1) {
          this.deleteFences(e.data.message[0])
        } else {
          for (let i = 0; i < e.data.message.length; i++) {
            this.deleteFences(e.data.message[i])
          }
        }

      }
    }, false);

  }

  // tag close
  tagCloseLog = (e, id) => {
    e.preventDefault()
    console.log(id);
    // 删除state 中的数组
    this.deleteFences(id)
    // 通知iframe 页面取消勾选
    document.getElementById('iframe').contentWindow.postMessage({
      action: 'delete',
      message: {
        id: id, // 电子围栏id
      }
    }, '*');
  }

  // add fences
  addFences = (value) => {
    const fences = this.props.creationStore.lbs.fences.concat()
    fences.push(value)
    this.props.creationStore.changeLBSValue('fences', fences)
  }

  editFences = (value) => {
    const fences = this.props.creationStore.lbs.fences.concat()
    const newFences = fences.filter((item) => item.id !== value.id)
    newFences.push(value)
    this.props.creationStore.changeLBSValue('fences', newFences)
  }

  // delete
  deleteFences = (value) => {
    let fences = this.props.creationStore.lbs.fences.concat()
    fences = fences.filter((item, index) => {
      return value !== item.id;
    })
    console.log('fences: ', fences)
    this.props.creationStore.changeLBSValue('fences', fences)

  }

  render() {
    return <div>
      <h3>提取设置</h3>
      <iframe
        src="https://urban.qq.com/bgia/iframe.html#/elefence"
        frameBorder="0"
        width='100%'
        height={this.state.height}
        border='0'
        id="iframe"></iframe>
      <h3>已选围栏</h3>
      <div className="fenceContainer">
        {this.props.creationStore.lbs.fences.concat().map((fence, index) => {
          return <Tag closable onClose={(e) => this.tagCloseLog(e, fence.id)} key={index}>{fence.name}</Tag>
        })}
      </div>

    </div>

  }
}

