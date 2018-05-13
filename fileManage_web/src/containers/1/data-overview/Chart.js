import React from 'react';
import { Card } from 'antd';
import { observer, inject } from 'mobx-react';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/legend';

import './chart.less';
import resource from "../../lib/resource";

// @note: 这里不直接使用echarts-for-react，原因是它把整个echarts涵盖了

@inject('dataOverviewStore')
@observer
class ChartCard extends React.Component {
    constructor(props){
        super(props);
        this.myChart = null;
    }

    state = {
        resource: [],
    };

    initChart = () => {
        const options = this.getOptions();
        if (this.myChart) {
            this.myChart.setOption(options);
        } else if (this.refs.chartDetail) {
            this.myChart = echarts.init(this.refs.chartDetail);
            this.myChart.setOption(options);
        }
        if (this.myChart &&
            !Object.keys(this.props.dataOverviewStore.listData).length) {
            this.myChart.clear();
        }
    };

    // 获取维度
    getLegend = () => {
        return Object.keys(this.props.dataOverviewStore.listData).map(key => resource[key]);
    };
    // 获取X轴数据
    getXAxis = () => {
        return [...new Set([].concat(...Object.values(this.props.dataOverviewStore.listData).map(item => item.map(e => e.time))))];
    };
    // 获取Y轴数据
    getYAxis = () => {
        return Object.keys(this.props.dataOverviewStore.listData).map(key => ({
            type: 'line',
            name: resource[key],
            data: this.getXAxis().map((x) => {
                const tmp = this.props.dataOverviewStore.listData[key].find(e => e.time === x);
                return tmp ? tmp.num : 0;
            }),
        }));
    };
    // 获取配置项
	getOptions = () => {
        return {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: this.getLegend(),
            },
            color: ['#006eff', '#29cc85', '#ffbb00'],
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: this.getXAxis(),
            },
            yAxis: {
                type: 'value',
            },
            series: this.getYAxis(),
        };
    };

	render() {
        this.initChart();
		return (
			<Card className="data-overview-chart" title="图表">
                <div className="chart-detail" ref="chartDetail"></div>
                { !Object.keys(this.props.dataOverviewStore.listData).length ?
                    <span className="no-data">暂无数据</span> : '' }
			</Card>
		)
	}
}

export default ChartCard;
