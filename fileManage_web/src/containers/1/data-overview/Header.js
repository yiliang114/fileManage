import React from 'react';
import {
  Dropdown,
  Menu,
  Icon,
  Radio,
  DatePicker,
  Button,
  Checkbox,
  Row,
  Col
} from 'antd';
import moment from 'moment';
import {observer, inject} from 'mobx-react'
import {formatTime, getTime} from '../../lib/utils';
import './header.less';
import {getStat, downloadStat} from '../../services/dataOverview'
import resource from "../../lib/resource";
const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

// datePicker
const {RangePicker} = DatePicker;

@inject('dataOverviewStore')
@observer
class Header extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    originIndeterminate: false,
    originCheckAll: false,
    originVisible: false,
    radioDateValue: '-7',
    origin: Object.keys(resource),
    start_time: formatTime(getTime(-7)),
    end_time: formatTime(new Date())
  };

  componentDidMount() {
    // 初始化
    this.setState({
      origin: Object.keys(this.props.dataOverviewStore.dataResource),
      originIndeterminate: false,
      originCheckAll: true,
      start_time: this.props.dataOverviewStore.paramsStore.start_time,
      end_time: this.props.dataOverviewStore.paramsStore.end_time
    });
    this
      .props
      .dataOverviewStore
      .fetchData();
  }

  // 修改数据源来源
  originOnCheckAllChange = (e) => { // 全选
    this.setState({
      origin: e.target.checked
        ? Object.keys(this.props.dataOverviewStore.dataResource)
        : [],
      originIndeterminate: false,
      originCheckAll: e.target.checked
    });
  };
  originOnChange = (e) => { // 单选
    const value = e.target.value;
    let checkedList = this.state.origin;
    const index = checkedList.indexOf(value);
    // 添加
    if (e.target.checked && index === -1) {
      checkedList.push(value);
    } else if (!e.target.checked && index !== -1) { // 删除
      checkedList.splice(index, 1);
    }
    this.setState({
      origin: checkedList,
      originIndeterminate: !!checkedList.length && (checkedList.length < this.props.dataOverviewStore.dataResource.length),
      originCheckAll: checkedList.length === Object
        .keys(this.props.dataOverviewStore.dataResource)
        .length
    });
  };
  originOnVisibleChange = (flag) => {
    this.setState({originVisible: flag});
  };

  //修改时间参数
  radioTimeOnChange = (e) => {
    this.setState({
      radioDateValue: e.target.value,
      start_time: formatTime(getTime(e.target.value)),
      end_time: formatTime(new Date())
    });
  };
  // 时间修改
  dateOnChange = (date, dateString) => {
    this.setState({radioDateValue: null, start_time: dateString[0], end_time: dateString[1]});
  };

  // 查询
  query = () => {
    this
      .props
      .dataOverviewStore
      .fetchData({origin: this.state.origin, start_time: this.state.start_time, end_time: this.state.end_time});
  }
  // 下载
  download = () => {
    this
      .props
      .dataOverviewStore
      .downloadData({origin: this.state.origin, start_time: this.state.start_time, end_time: this.state.end_time});
  }

  render() {
    // 选择数据源 下拉菜单
    const checkData = (
      <Menu className="data-overview-dropmenu">
        <Menu.Item key="all">
          <Checkbox
            indeterminate={this.state.originIndeterminate}
            onChange={this.originOnCheckAllChange}
            checked={this.state.originCheckAll}>全选</Checkbox>
        </Menu.Item>
        {Object
          .keys(this.props.dataOverviewStore.dataResource)
          .map(key => <Menu.Item key={key}>
            <Checkbox
              value={key}
              onChange={this.originOnChange}
              checked={this
              .state
              .origin
              .includes(key)}>
              {this.props.dataOverviewStore.dataResource[key]}
            </Checkbox>
          </Menu.Item>)}
      </Menu>
    );
    return (
      <div className="data-overview-header">
        <Dropdown
          overlay={checkData}
          trigger={['click']}
          onVisibleChange={this.originOnVisibleChange}
          visible={this.state.originVisible}>
          <Button className="drop">
            {this.state.origin.length
              ? `已选${this.state.origin.length}个数据源`
              : '选择数据源'}
            <Icon type="down"/>
          </Button>
        </Dropdown>
        <RadioGroup onChange={this.radioTimeOnChange} value={this.state.radioDateValue}>
          <RadioButton value="-1">昨天</RadioButton>
          <RadioButton value="-7">近7天</RadioButton>
          <RadioButton value="-30">近30天</RadioButton>
          <RangePicker
            className="date-radio-group"
            value={[
            moment(this.state.start_time, 'YYYY-MM-DD'),
            moment(this.state.end_time, 'YYYY-MM-DD')
          ]}
            onChange={this.dateOnChange}
            allowClear={false}/>
        </RadioGroup>
        <Button type="primary" className="query" onClick={this.query}>查询</Button>
        <Button onClick={this.download}>下载</Button>
      </div>
    )
  }
};

export default Header
