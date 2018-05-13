import React from 'react'
import { Modal, Button, Row, Col, Divider, Tag, Icon, Input, Tooltip, message } from 'antd';
import { observer, inject } from 'mobx-react';
import { updateCrowd } from '../services/crowd'

import TextChunk from './Common/TextChunk'
import TableChunk from './Common/TableChunk'

@inject('supernatantStore', 'elementStore')
@observer
export default class Supernatant extends React.Component {

  state = {
    inputVisible: false,
    inputValue: ''
  }

  trim = (str) => {
    return str.replace(/^\s+|\s+$/g, "");
  }

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  }

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  }

  handleInputConfirm = async () => {
    const { inputValue } = this.state;
    if (this.trim(inputValue) === '') {
      message.error('请输入人群名称，不能为空格~')
      this.setState({
        inputVisible: false,
        inputValue: '',
      });
      return
    }
    const { detail, updateCrowdName } = this.props.supernatantStore
    const resp = await updateCrowd({
      id: detail.id,
      name: inputValue
    })
    if (resp && resp.code === 0) {
      // 修改detail值
      updateCrowdName(inputValue)
      // 更新list
      this.props.elementStore.updateCrowdList()
      message.success(resp.info)
    } else {
      message.error(resp.info)
    }

    this.setState({
      inputVisible: false,
      inputValue: '',
    });
  }

  saveInputRef = input => this.input = input

  // 可修改人群名称框
  alterCrowdName = (name) => {
    const { inputVisible, inputValue } = this.state
    return (
      <div>
        {
          inputVisible && (
            <Input
              ref={this.saveInputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={this.handleInputChange}
              onBlur={this.handleInputConfirm}
              onPressEnter={this.handleInputConfirm}
            />
          )
        }
        {
          !inputVisible && (
            <Tag
              onClick={this.showInput}
              style={{ background: '#fff', borderStyle: 'dashed' }}
            >
              <Icon type="edit" /> {name}
            </Tag>
          )
        }
      </div>
    )
  }

  handleCancel = () => {
    this.props.supernatantStore.changeVisible(false)
  }

  render() {
    const { visible, type, detail, isShowTable, tableDataSource } = this.props.supernatantStore

    const maps = ['file', 'wifi', 'keyword', 'lbs', 'extend', 'group']
    const maps_zh = ['文件数据', '场内数据', '关键词提取', '腾讯LBS圈选', '拓展人群', '组合人群']
    const origin_maps = ['CRM', 'Social', '官网', '线下', '广告投放', 'APP', '广告投放', '电商']
    const data_type_maps = ['QQ', '手机号', 'IDFA', 'MAC']

    const baseInfoColumns = [{
      title: 'ID',
      dataIndex: 'id',
    }, {
      title: '人群名称',
      dataIndex: 'name',
      render: (name) => {
        return this.alterCrowdName(name)
      }
    }, {
      title: '人群规模',
      dataIndex: 'num',
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
    }]

    const extractStatusColumns = [{
      title: '创建状态',
      dataIndex: 'extract_status',
      key: 'extract_status',
      render: (text, record) => (
        text == 3 ? <div style={{ color: '#ff4d4f' }}>失败</div> : text == 2 ? <div style={{ color: '#95de64' }}>成功</div> : <div>准备中</div>
      ),
    }, {
      title: '画像状态',
      dataIndex: 'figure_status',
      key: 'figure_status',
      render: (text, record) => (
        text == 0 ? '-' : text == 1 ? '计算中' : '已生成'
      ),
    }]

    const tableDetail = tableDataSource && tableDataSource.concat()

    let extractInfoColumns = []
    let extractInfoTableColumns = []
    let title = ''

    // detail 接口不返回type，type是从 crowd table 中获得
    switch (type) {
      case 1:
        extractInfoColumns = [
          {
            title: '提取方式',
            dataIndex: 'type',
            render: () => maps_zh[type - 1]
          },
          {
            title: '数据源名称',
            dataIndex: 'file',
            render: (text, record) => text && text.datasource && text.datasource.name
          },
          {
            title: '品牌',
            // 坑啊，文档说dataIndex 支持 a.b.c 的嵌套写法，但是事实上使用的时候，异步加载数据只要a = undefined 必挂
            dataIndex: 'file',
            render: (text, record) => {
              return text && text.datasource && text.datasource.brand
            }
          },
          {
            title: '数据来源',
            dataIndex: 'file',
            render: (text, record) => text && text.datasource && origin_maps[text.datasource.origin - 1]
          }, {
            title: '用户数据描述',
            dataIndex: 'file',
            render: (text, record) => text && text.datasource && text.datasource.user_describe
          }, {
            title: '数据类型',
            dataIndex: 'file',
            render: (text, record) => text && text.datasource && data_type_maps[text.datasource.data_type - 1]
          }
        ];
        break
      case 2:
        extractInfoColumns = [
          {
            title: '提取方式',
            dataIndex: 'type',
            render: (value) => maps_zh[value - 1]

          }, {
            title: '连接日期',
            dataIndex: 'wifi',
            render: (text, record) => text && `${text.connection_start_date} - ${text.connection_end_date}`
          }, {
            title: '连接时段',
            dataIndex: 'wifi',
            render: (text, record) => text && text.connection_time
          },
          {
            title: '连接WiFi点',
            dataIndex: 'wifi',
            render: (text, record) => text && text.connection_place
          }
        ];
        break
      case 3:
        extractInfoColumns = [
          {
            title: '提取方式',
            dataIndex: 'type',
            render: (value) => maps_zh[value - 1]
          },
          {
            title: '输入的有效关键词',
            dataIndex: 'keyword',
            render: (keyword) => {
              if (keyword && keyword.info && Object.prototype.toString.call(keyword.info) == '[object Object]') {
                // 过滤拓展关键字
                var info = keyword.info.kw_valid.join(',')
                return info !== '' ? info : '(空)'
              }
            }
          },
          {
            title: '拓展的关键词',
            dataIndex: 'keyword',
            render: (keyword) => {
              if (keyword && keyword.info && Object.prototype.toString.call(keyword.info) == '[object Object]') {
                var info = keyword.info.kw_extend.join(',')
                return info !== '' ? info : '(空)'
              }
            }
          },
          {
            title: '拓展数量',
            dataIndex: 'keyword',
            render: (keyword, record) => {
              if (keyword && keyword.info && Object.prototype.toString.call(keyword.info) == '[object Object]') {
                var length = keyword.info.kw_extend.length
                return length + '个'
              }
            }
          },
          {
            title: '有效排除的关键词',
            dataIndex: 'keyword',
            render: (keyword) => {
              if (keyword && keyword.info && Object.prototype.toString.call(keyword.info) == '[object Object]') {
                var info = keyword.info.kw_exclude_valid.join(',')
                return info !== '' ? info : '(空)'
              }
            }
          }
        ];
        break
      case 4:
        extractInfoColumns = [{
          title: '提取方式',
          dataIndex: 'type',
          render: (value) => maps_zh[value - 1]

        }];
        extractInfoTableColumns = [
          {
            title: '围栏名称',
            dataIndex: 'name',
            width: 171
          },
          {
            title: '所属商圈',
            dataIndex: 'business_area',
            width: 171
          },
          {
            title: '人群创建时间',
            dataIndex: 'create_time',
            width: 225
          },
        ];
        break
      case 5:
        extractInfoColumns = [
          {
            title: '提取方式',
            dataIndex: 'type',
            render: (value) => maps_zh[value - 1]
          },
          {
            title: '拓展方式',
            dataIndex: 'type',
            render: (type, record) => type === 1 ? '种子人群+拓展人群' : '仅拓展人群'

          },
          {
            title: '扩散人群规模',
            dataIndex: 'extend',
            render: (extend, record) => extend && extend.level_num * 1000000
          }
        ];
        extractInfoTableColumns = [
          {
            title: '人群ID',
            dataIndex: 'id',
            width: 108
          },
          {
            title: '人群名称',
            dataIndex: 'name',
            width: 126
          },
          {
            title: '人群创建时间',
            dataIndex: 'create_time',
            width: 166

          },
          {
            title: '种子人群规模',
            dataIndex: 'num',
            width: 167
          }
        ];
        title = '种子人群'
        break;
      case 6:
        extractInfoColumns = [
          {
            title: '提取方式',
            dataIndex: 'type',
            render: (value) => maps_zh[value - 1]

          },
          {
            title: '组合逻辑',
            dataIndex: 'group',
            render: (group, record) => group && < p style={{ color: 'red', margin: 0 }}>{group.logic_str}</p >
          }
        ];
        extractInfoTableColumns = [
          {
            title: '组合',
            dataIndex: 'group',
            width: 100
          },
          {
            title: '人群ID',
            dataIndex: 'id',
            width: 126
          },
          {
            title: '人群名称',
            dataIndex: 'name',
            width: 147
          },
          {
            title: '人群创建时间',
            dataIndex: 'create_time',
            width: 193
          },
        ];
        break


    }

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
          <TextChunk title="基本信息" columns={baseInfoColumns} dataSource={detail} />

          <Divider />
          <div>
            <TextChunk title="人群提取详情" columns={extractInfoColumns} dataSource={detail} />
            {isShowTable && <TableChunk title={title} columns={extractInfoTableColumns} dataSource={tableDetail} />}
          </div>
          <Divider />
          <TextChunk title="创建状态" columns={extractStatusColumns} dataSource={detail} />
          <Divider />

        </Modal>
      </div>
    )
  }
}
