import React from 'react';
import echarts from 'echarts/lib/echarts' 
import 'echarts/lib/chart/line'
// 引入柱状图
import  'echarts/lib/chart/bar';
// 引入提示框和标题组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

import {getTraceByDay,getTraceOfIps} from '../../services/monitor'

class Chart extends React.Component {

  state = {
    legend: {},
    categoryData: [],
    series: []
  }

  componentDidMount() {
    this.createData()
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
      title: {
        text: '客户端文件统计'
      },
      tooltip: {
          trigger: 'axis'
      },
      legend: {
          data:['221212','ip1','ip2','ip3']
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      toolbox: {
          feature: {
              saveAsImage: {}
          }
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['周一','周二','周三','周四','周五','周六','周日']
      },
      yAxis: {
          type: 'value'
      },
      series: [
          {
              name:'221212',
              type:'line',
              stack: '总量',
              data:[2, 2, 1, 0, 0, 1, 1]
          },
          {
              name:'ip1',
              type:'line',
              stack: '总量',
              data:[2, 1, 2, 3, 0, 1, 2]
          },
          {
              name:'ip2',
              type:'line',
              stack: '总量',
              data:[3, 2, 1, 0, 5, 1, 2]
          },
          {
              name:'ip3',
              type:'line',
              stack: '总量',
              data:[2, 1, 2, 3, 1, 2, 4]
          }
      ]
    });
  }

  createData = async () => {
    const ips = await getTraceOfIps()
    console.log('ips',ips)
    if(ips) {
      this.setState({
        legend: {
          data: ips
        }
      })
    }
    const trace = await getTraceByDay()
    console.log('trace',trace)
    // todo
    // 这个其实不应该放在前端处理
    
  }

  render() {
    return (
      <div>
        图表显示
        <div id="main" style={{ width: '100%', height: 400 }}></div>
      </div>
    )
  }
}

export default Chart