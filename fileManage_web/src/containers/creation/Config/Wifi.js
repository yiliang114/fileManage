import {inject, observer} from 'mobx-react';
import React from 'react'
import {Select, DatePicker, Row, Col, Divider} from 'antd';
import {Link} from 'react-router-dom';
import {getWifiLocation, getdsshortlist} from '../../../../services/crowd'

const Option = Select.Option;
const {RangePicker} = DatePicker;

@inject('creationStore')
@observer
export default class Wifi extends React.Component {

  state = {
    dsshortlist: [],
    wifiLoclist: []
  }
  async componentDidMount() {
    const resp = await getdsshortlist()
    if (resp && resp.code === 0) {
      console.log('resp: ', resp)
      const result = resp
        .data
        .filter(item => {
          if (item.is_authorize === 1 && item.abutment === 2) {
            return true
          } else {
            return false
          }
        })

      this.setState({dsshortlist: result})

    }

  }

  changeWifiSource = async(value) => {
    console.log(`selected ${value}`);
    this
      .props
      .creationStore
      .setWifiStoreData('datasource', {id: value})
    const resp = await getWifiLocation(value)
    console.log('getWifiLocation: ', resp.data)
    this.setState({wifiLoclist: resp.data})

  }

  changeRangePicker = (date, dateString) => {
    console.log(date, dateString);
    this
      .props
      .creationStore
      .setWifiStoreData('connection_start_date', dateString[0])
    this
      .props
      .creationStore
      .setWifiStoreData('connection_end_date', dateString[1])
  }

  changeConnectionTime = (value) => {
    console.log('changeConnectionTime: ', value)
    this
      .props
      .creationStore
      .setWifiStoreData('connection_time', value)

  }

  changeConnectionPlace = (value) => {
    console.log('changeConnectionPlace: ', value)
    this
      .props
      .creationStore
      .setWifiStoreData('connection_place', value)
  }

  render() {

    const wifiChildren = this
      .state
      .dsshortlist
      .map(item => (
        <Option key={item.id} value={item.id}>{item.name}</Option>
      ))

    const wifiLocChildren = this
      .state
      .wifiLoclist
      .map(item => (
        <Option key={item.connection_place} value={item.connection_place}>{item.connection_place + item.desc}</Option>
      ))

    return (
      <div>
        <Row className="rowBox">
          <Col span={4}>
            <p>WiFi数据源:
            </p>
          </Col>
          <Col span={6}>
            <Select
              defaultValue="请选择wifi数据源"
              className="rowBoxSelect"
              onChange={this.changeWifiSource}>
              {wifiChildren}
            </Select>
          </Col>
        </Row>
        <Row className="rowBox" style={{
          paddingTop: 0
        }}>
          <Col span={4}></Col>
          <Col span={20}>
            <p>只能选择已有数据源<span style={{
        color: 'red'
      }}>（且已授权）</span>，您可以在数据对接页面进行数据源管理
              <Link
                to="/data-butt"
                style={{
                color: "#1890ff"
              }}>立即前往</Link>
            </p>
          </Col>
        </Row>
        <Row className="rowBox">
          <Col span={4}>
            <p>连接日期:
            </p>
          </Col>
          <Col span={6}>
            <RangePicker format="YYYYMMDD" onChange={this.changeRangePicker}/>
          </Col>
        </Row>
        <Row className="rowBox">
          <Col span={4}>
            <p>连接时段:
            </p>
          </Col>
          <Col span={6}>
            <Select
              defaultValue="alltime"
              className="rowBoxSelect"
              onChange={this.changeConnectionTime}>
              <Option value="alltime">全时段</Option>
            </Select>
          </Col>
        </Row>
        <Row className="rowBox">
          <Col span={4}>
            <p>连接WiFi点:
            </p>
          </Col>
          <Col span={6}>
            <Select
              mode="multiple"
              defaultValue={[]}
              className="rowBoxSelect"
              onChange={this.changeConnectionPlace}
              placeholder="点击选择">
              {wifiLocChildren}
            </Select>
          </Col>
        </Row>
        <Divider/>
      </div>
    )
  }
}
