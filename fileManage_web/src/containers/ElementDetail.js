import React from 'react'
import { Modal,  Divider, Tag, Icon, Input, message,Button } from 'antd';
import { observer, inject } from 'mobx-react';
import {deleteElement,updateELement} from '../services/element'

import TextChunk from './Common/TextChunk'

@inject('detailStore', 'elementStore')
@observer
export default class ElementDetail extends React.Component {

  state = {
    // name
    nameInputVisible: false,
    nameInputValue: '',
    // score
    scoreInputVisible: false,
    scoreInputValue: '',

  }

  trim = (str) => {
    return str.replace(/^\s+|\s+$/g, "");
  }

  showInput = (target) => {
    const value = target === 'name' ? 'nameInputVisible' : 'scoreInputVisible'
    this.setState({ [value]: true }, () => this.input.focus());
  }

  handleInputChange = (e,target) => {
    const value = target === 'name' ? 'nameInputValue' : 'scoreInputValue'
    this.setState({ [value]: e.target.value });
  }

  handleInputConfirm = async () => {
    const { nameInputValue } = this.state;
    // 不能输入空白内容
    if (this.trim(nameInputValue) === '') {
      message.error('请输入元素名称，不能为空格~')
      this.setState({
        nameInputVisible: false,
        nameInputValue: '',
      });
      return
    }
    const { detail, updateElement } = this.props.detailStore
    const resp = await updateELement({
      ...detail,
      name: nameInputValue
    })

    if (resp && resp.code === 0) {
      // 修改detail值
      updateElement('name',nameInputValue)
      // 更新element list
      this.props.elementStore.updateELementList()
      message.success('更新成功')
    } else {
      message.error('未更新成功')
    }

    this.setState({
      nameInputVisible: false,
      nameInputValue: '',
    });
  }

  handleScoreInputConfirm = async () => {
    const { scoreInputValue } = this.state;
    // 不能输入空白内容
    if (this.trim(scoreInputValue) === '') {
      message.error('请输入元素名称，不能为空格~')
      this.setState({
        scoreInputVisible: false,
        scoreInputValue: '',
      });
      return
    }
    const { detail, updateElement } = this.props.detailStore
    const resp = await updateELement({
      ...detail,
      score: scoreInputValue
    })

    if (resp && resp.code === 0) {
      // 修改detail值
      updateElement('score',scoreInputValue)
      // 更新element list
      this.props.elementStore.updateELementList()
      message.success('更新成功')
    } else {
      message.error('未更新成功')
    }

    this.setState({
      scoreInputVisible: false,
      scoreInputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  // 可修改元素名称框
  alterElementName = (name) => {
    const { nameInputVisible, nameInputValue } = this.state
    return (
      <div>
        {
          nameInputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={nameInputValue}
              onChange={(e) => this.handleInputChange(e,'name')}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )
        }
        {
          !nameInputVisible && (
            <Tag
              onClick={() => this.showInput('name')}
              style={{ background: '#fff', borderStyle: 'dashed' }}
            >
              <Icon type="edit" /> {name}
            </Tag>
          )
        }
      </div>
    )
  }

  // 可修改元素的分数
  alterElementScore = (score) => {
    const { scoreInputVisible, scoreInputValue } = this.state
    return (
      <div>
        {
          scoreInputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={scoreInputValue}
              onChange={(e) => this.handleInputChange(e,'score')}
              onBlur={this.handleScoreInputConfirm}
              onPressEnter={this.handleScoreInputConfirm}
            />
          )
        }
        {
          !scoreInputVisible && (
            <Tag
              onClick={() => this.showInput('score')}
              style={{ background: '#fff', borderStyle: 'dashed' }}
            >
              <Icon type="edit" /> {score}
            </Tag>
          )
        }
      </div>
    )
  }

  handleCancel = () => {
    this.props.detailStore.changeVisible(false)
  }

  deleteElement = async (id) => {
    const resp = await deleteElement(id)
    if(resp && resp.code === 0 && resp.data == true) {
      // 隐藏浮层
      this.handleCancel()
      // 更新列表
      this.props.elementStore.updateELementList()
    }
  }

  render() {
    const { visible, detail } = this.props.detailStore

    const baseInfoColumns = [{
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: '元素名称',
      dataIndex: 'name',
      render: (name) => {
        return this.alterElementName(name)
      }
    },{
      title: '分数',
      dataIndex: 'score',
      render: (score) => {
        return this.alterElementScore(score)
      }
    },{
      title: '创建时间',
      dataIndex: 'create_time',
    }]

    return (
      <div>
        <Modal
          visible={visible}
          title="详情"
          width={'50%'}
          style={{ top: 0, right: -310 }}
          footer={null}
          onCancel={this.handleCancel}
        >
        {/* todo PictureChunk */}
          <TextChunk title="基本信息" columns={baseInfoColumns} dataSource={detail} />
          <Divider />
          <img src={'http://p9eaf78s5.bkt.clouddn.com/parabolarBlade500sl150sh100cx-100cy.png'} />
          <img src={'http://p9eaf78s5.bkt.clouddn.com/parabolarBlade500sl50sh0cx0cy0.png'} />
          {/* http://p9eaf78s5.bkt.clouddn.com/parabolarBlade500sl50sh0cx0cy0.png */}

          <Button style={{backgroundColor: 'red',color: 'white'}} onClick={() => this.deleteElement(detail.id)}>删除</Button>

        </Modal>
      </div>
    )
  }
}
