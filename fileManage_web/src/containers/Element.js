import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Table, Pagination, Input, Icon, Radio, DatePicker, Tooltip } from 'antd';
import { inject, observer } from 'mobx-react'
import { withRouter } from "react-router-dom";
import './element.less';

import AccreditModal from './AccreditModal'
import DeleteModal from './DeleteModal'
import ElementDetail from './ElementDetail'

import { formatTime } from '../lib/utils';

// radio
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

// datePicker
const { RangePicker } = DatePicker

@inject('elementStore', 'detailStore', 'creationStore')
@observer
class Element extends React.Component {

  // 外部组件不需要的值
  state = {
    filteredInfo: null,
    sortedInfo: null,
    radioSelected: '',
    tip: '该元素所隶属数据源的授权状态',
    // 授权id
    id: null,
    // delete modal record
    record: null
  }

  componentDidMount() {
    // post方法
    // todo
    this.props.elementStore.initELementList({
      name: 111
    })
  }

  // 截取过长的字符串
  strCut = (str, start = 0, num = 5) => {
    if (str && typeof str === 'string') {
      if (str.length > num) {
        // return str.substr(start, num) + '...'
        return <Tooltip title={str}>
          <span>{str.substr(start, num) + '...'}</span>
        </Tooltip>
      }
      // return str
      return <Tooltip title={str}>
        <span>{str}</span>
      </Tooltip>

    }
  }

  handleChange = (pagination, filters, sorter) => {
    console.log('filters: ', filters)
    this.setState({
      filteredInfo: filters,
      sortedInfo: sorter
    })
    if (Object.keys(filters).length !== 0) {
      // 只有 创建状态和提取方式有过滤操作
      if (Object.keys(filters).indexOf('extract_status') > -1) {
        const param = filters.extract_status.map((item) => parseInt(item))
        this.props.elementStore.updateCrowdList({
          extract_status: param
        })
      } else if (Object.keys(filters).indexOf('type') > -1) {
        const param = filters.type.map((item) => parseInt(item))
        this.props.elementStore.updateCrowdList({
          type: param
        })
      }
    } else if (Object.keys(sorter).length !== 0) {
      // 排序操作
      this.props.elementStore.updateCrowdList({
        orders: [           // 排序字段
          {
            name: sorter.columnKey,
            order: sorter.order === 'descend' ? 'desc' : 'asc'
          }
        ]
      })
    } else {
      // 翻页
      this.props.elementStore.updateCrowdList({

      })
    }
  }

  // 搜索框
  emitEmpty = () => {
    this.searchInput.focus();
    this.props.elementStore.changeSearchText()
    // todo
    // 可能会有一个bug: 过滤或者排序 同时去搜索name，清空搜索框的情况下。
    this.props.elementStore.updateCrowdList()
  }

  onChangeSearchText = (e) => {
    this.props.elementStore.changeSearchText(e.target.value)
    // 向后端要新数据
    this.props.elementStore.updateCrowdList({
      name: e.target.value
    })
  }

  // change time
  // radio
  radioOnChange = (e) => {
    this.setState({
      radioSelected: e.target.value
    })
    let date = {
      start_time: '',
      end_time: '',
    }
    let date1 = new Date();
    let date2 = new Date(date1);
    if (e.target.value === 'all') {
      date = {
        start_time: '',
        end_time: ''
      }
    } else if (e.target.value === 'seven') {
      date2.setDate(date1.getDate() - 7)
      date = {
        start_time: formatTime(date2),
        end_time: formatTime(new Date())
      }
    } else {
      date2.setDate(date1.getDate() - 30)
      date = {
        start_time: formatTime(date2),
        end_time: formatTime(new Date())
      }
    }

    this.props.elementStore.updateCrowdList({
      ...date
    })
  }
  // date onchange
  dateOnChange = (date, dateString) => {
    this.setState({
      radioSelected: ''
    })
    this.props.elementStore.updateCrowdList({
      start_time: dateString[0],
      end_time: dateString[1],
    })

  }

  // modal
  showAccreditModal = (record) => {
    console.log('showAccreditModal', record)
    this.setState({ id: record.datasource.id })
    this.props.elementStore.changeAccreditVisible(true)
  }

  // operation
  operationHandle = (e, record) => {
    switch (e.target.text.trim()) {
      case '洞察':
        console.log('洞察');
        this.goto('data-insight', record.id)
        break;
      case '拓展':
        console.log('拓展', this.props.creationStore.extractType);
        this.props.creationStore.changeStepCurrent(1)
        var path = {
          pathname: 'creation',
          query: {
            name: record.name
          },
        }
        this.props.history.push(path);
        break;
      case '应用':
        console.log('应用');
        this.goto('marketing', record.id)
        break;
      case '删除':
        console.log('删除');
        this.props.elementStore.changeDeleteVisible(true)
        this.setState({
          record
        })
        break;
    }
  }

  // router
  goto = (url, value) => {
    this.props.history.push(`${url}/${value}`);
  }

  // ElementDetail
  showElementDetail = (record) => {
    this.props.detailStore.setId(record.id)
    this.props.detailStore.changeVisible(true)
  }

  // 分页
  showTotal = (total) => {
    return `总计 ${total} 条`;
  }

  // 页码改变的回调
  changePage = (page, pageSize) => {
    this.props.elementStore.updateELementList({
      page,
      limit: pageSize
    })
  }

  // pageSize 改变的回调
  onShowSizeChange = (current, size) => {
    this.props.elementStore.updateELementList({
      page: current,
      limit: size
    })
  }

  render() {
    let { sortedInfo, filteredInfo } = this.state;
    sortedInfo = sortedInfo || {};
    filteredInfo = filteredInfo || {};

    const tipDom = <p className="tip">授权状态<Tooltip placement="bottom" title={this.state.tip}><Icon type="info-circle-o" /></Tooltip></p>

    const columns = [{
      title: '元素ID',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      render: (text, record) => <a onClick={() => this.showElementDetail(record)}>{text}</a>,
    }, {
      title: '元素名称',
      dataIndex: 'name',
      key: 'name',
      width: 100,      
      align: 'left',
      render: (text, record) => this.strCut(text, 0, 4)
    }, {
      title: '创建时间',
      dataIndex: 'create_time',
      key: 'create_time',
      width: 150,      
      render: (text, record) => this.strCut(text, 5),
      // 后端排序
      sorter: (a, b) => a.create_time.length - b.create_time.length,
      sortOrder: sortedInfo.columnKey === 'create_time' && sortedInfo.order,
    }, 
    // {
    //   title: '创建状态',
    //   dataIndex: 'picture',
    //   key: 'picture',
    //   width: 100,      
    //   render: (text, record) => (
    //     text == 3 ? <div style={{ color: '#ff4d4f' }}>失败</div> : text == 2 ? <div style={{ color: '#95de64' }}>成功</div> : <div>准备中</div>
    //   ),
    //   filters: [
    //     { text: '失败', value: '3' },
    //     { text: '成功', value: '2' },
    //     { text: '准备中', value: '1' }
    //   ]
    // },
     {
      title: '图片数据路径',
      dataIndex: 'picture',
      key: 'picture',
      // 后端排序
      sorter: (a, b) => a.num.length - b.num.length,
      sortOrder: sortedInfo.columnKey === 'num' && sortedInfo.order,
    }, {
      title: '力矩数据路径',
      dataIndex: 'curve',
      key: 'curve',
    }, {
      // 授权状态
      // title: tipDom,
      title: '分数',
      dataIndex: 'score',
      key: 'score',
      // render: (text, record) => {
      //   return text.is_authorize == 0 ? <a onClick={() => this.showAccreditModal(record)}>未授权</a> : <div style={{ color: '#95de64' }}>已授权</div>
      // }
    }];

    const suffix = this.props.elementStore.searchText ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null

    const elementList = this.props.elementStore.elementList.concat()
    const { elementTotal } = this.props.elementStore

    return (
      <div className="crowd">
        <div className="action-bar">
          <Button type="primary">
            <Link to='/creation'>创建元素</Link>
          </Button>

          <Input
            className="search-input"
            placeholder="搜索元素名称"
            prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
            suffix={suffix}
            value={this.props.elementStore.searchText}
            onChange={this.onChangeSearchText}
            ref={node => this.searchInput = node}
          />
        </div>

        <Card>
          <RadioGroup onChange={this.radioOnChange} value={this.state.radioSelected}>
            <RadioButton className="angle-radio" value="all">全部</RadioButton>
            <RadioButton className="angle-radio" value="seven">近7天</RadioButton>
            <RadioButton className="angle-radio" value="thirty">近30天</RadioButton>
          </RadioGroup>
          <RangePicker className="angle-radio" format="YYYY-MM-DD" onChange={this.dateOnChange} />
          <Table style={{ marginTop: 10 }} columns={columns} dataSource={elementList} onChange={this.handleChange} rowKey={record => record.id} pagination={false} />
          <Pagination total={elementTotal} showSizeChanger showTotal={this.showTotal} onChange={this.changePage} onShowSizeChange={this.onShowSizeChange} />

          <AccreditModal crowdId={this.state.id} />
          <DeleteModal record={this.state.record} />
          <ElementDetail />
        </Card>

      </div>
    );
  }
}

export default withRouter(Element)
