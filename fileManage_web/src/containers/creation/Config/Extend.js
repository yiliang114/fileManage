import React from 'react'
import { Row, Col, Input, Table, Divider, Slider, Radio, Button, Modal, InputNumber } from 'antd'
import { inject, observer } from 'mobx-react'
import CountUp from 'react-countup';
import AccreditModal from '../../AccreditModal'
import { getCrowdList } from '../../../../services/crowd'

const Search = Input.Search;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

@inject('creationStore', 'elementStore')
@observer
export default class Extend extends React.Component {
  state = {
    selectedRowKeys: [],
    crowdScope: 1,
    defaultScaleNum: 0,
    scaleNum: 450,
    scale: 9,
    marks: {
      0: '0万',
      25: '1250万',
      50: '2500万',
      75: '3750万',
      100: '5000万',
    },
    searchText: '',
    visible: false,
    record: null,
    id: null
  };

  async componentDidMount() {
    this.props.elementStore.initCrowdList({
      // 限制提取方式 和 人群规模2k - 3kw
      type: [1, 2, 3, 4],
      limit: 'all',
      num: [2000, 30000000],
      extract_status: [2]
    })
    this.setState({
      defaultScaleNum: this.props.creationStore.extend.level_num * 50
    })
  }

  radioOnChange = (e) => {
    this.setState({
      crowdScope: parseInt(e.target.value)
    })
    // store
    this.props.creationStore.setValue('extend', 'type', parseInt(e.target.value))
  }

  changeSlider = (value) => {
    // level_num 拓展量级
    this.setState({
      scaleNum: value * 50,
      scale: value
    })
    this.props.creationStore.setValue('extend', 'level_num', value)
  }

  onChangeSearchText = (e) => {
    this.setState({
      searchText: e.target.value
    })
  }
  getCheckboxProps = (record) => ({
    disabled: record.datasource.is_authorize === 0,
    name: record.name,
  })
  onSearch = async (value) => {
    const resp = await getCrowdList({
      name: value
    })
  }
  onSelectChange = (selectedRowKeys) => {
    this.setState({
      selectedRowKeys
    })
    this.props.creationStore.setValue('extend', 'crowd', {
      id: selectedRowKeys.concat().pop()
    })
  }

  handleOk = (e) => {
    this.setState({
      visible: false
    });
    this.props.elementStore.changeAccreditVisible(true)
  }
  handleCancel = (e) => {
    this.setState({
      visible: false,
    });
  }

  showModal = (record) => {
    this.setState({
      visible: true,
      // record
    })
    this.setState({ id: record.datasource.id })
    this.props.elementStore.changeSearchText(record.name)
  }

  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      type: 'radio',
      selectedRowKeys,
      onChange: this.onSelectChange,
      getCheckboxProps: this.getCheckboxProps
    };
    const columns = [
      {
        title: '人群名称',
        dataIndex: 'name',
        render: (text, record) => {
          return record.datasource.is_authorize == 0 ? <a onClick={() => this.showModal(record)}>{record.name}</a> : <p style={{ margin: 0 }}>{record.name}</p>
        },
        width: 150,
        key: 'name',
      },
      {
        title: '人群ID',
        dataIndex: 'id',
        key: 'id',
        width: 150
      },
      {
        title: '提取方式',
        dataIndex: 'type',
        key: 'type',
        render: (text) => {
          const maps_zh = ['文件数据', '场内数据', '关键词提取', '腾讯LBS圈选', '拓展人群', '组合人群']
          return maps_zh[text - 1]
        },
        width: 150
      },
      {
        title: '人群规模',
        dataIndex: 'num',
        key: 'num',
        width: 150
      }
    ];

    const crowdList = this.props.elementStore.crowdList.concat()

    // 业务说明业务说明
    const statements = this.state.crowdScope === 1 ? '种子人群+拓展人群 业务说明业务说明' : '仅拓展人群 业务说明业务说明'

    return (
      <div>
        <h3>提取设置</h3>
        <p>选择要拓展的人群</p>
        <Row>
          <Col span={16}>
            <Search
              placeholder="搜索人群名称"
              onSearch={this.onSearch}
              value={this.state.searchText}
              onChange={this.onChangeSearchText}
              ref={node => this.searchInput = node}
              enterButton
            />
            <Table className="hide-check-all" rowSelection={rowSelection} columns={columns} rowKey={record => record.id} dataSource={crowdList} pagination={false} scroll={{ y: 500 }} />

          </Col>
        </Row>
        <Row style={{ marginTop: 30 }}>
          <Col span={24}>
            <Col span={8}>
              <h3>拓展量级</h3>
              <Slider marks={this.state.marks} value={this.state.scale} defaultValue={9} onChange={this.changeSlider} />
            </Col>
            <Col span={8} style={{ height: 90, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <InputNumber min={1} max={100} onChange={this.changeSlider} value={this.state.scale} /> 倍 （步长为50万）
            </Col>
            <Col span={8}>
              <h3>拓展人群规模</h3>
              <CountUp useEasing={true} separator="," start={this.state.defaultScaleNum} end={this.state.scaleNum} duration={3} style={{ fontSize: 40, fontWeight: 20, color: 'blue' }} /> 万个
            </Col>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <h4>人群范围</h4>
            <RadioGroup onChange={this.radioOnChange} defaultValue="1">
              <RadioButton value="1">种子人群+拓展人群</RadioButton>
              <RadioButton value="2">仅拓展人群</RadioButton>
            </RadioGroup>
            <p>{statements}</p>
          </Col>
        </Row>

        {/* todo: lazy-load */}
        <Modal
          visible={this.state.visible}
          onCancel={this.handleCancel}
          footer={
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button type="primary" onClick={this.handleOk}>去授权</Button>
              <Button onClick={this.handleCancel}>不授权</Button>
            </div>
          }
        >
          <p>该数据未授权，不可选</p>
        </Modal>

        <AccreditModal crowdId={this.state.id} />
        <Divider />
      </div>
    )
  }
}

