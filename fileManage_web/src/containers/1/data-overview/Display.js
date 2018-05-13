import React from 'react';
import { Card, Row, Col, Divider} from 'antd';
import { observer, inject } from 'mobx-react';
import classnames from 'classnames';
import './display.less';

const Display = ({ totalData }) => {
	// 分组，5个一组
	let groups = [];
	let count = -1;
	totalData.forEach((v, k) => {
		if (k % 4 === 0) {
			count ++;
			groups[count] = [];
		}
		groups[count].push(v);
	});
	const items = groups.map((group, k) =>
		<Row key={ 'row_' + group.join('') }>
			{group.map((item) =>
				<Col span={6} key={item.key}>
					<div className="display-name">
						{item.name}
					</div>
					<div className="display-value">
						{item.value.toLocaleString()}
					</div>
				</Col>
			)}
	    </Row>
	);
	return (<div className="data-overview-display">
			<Card title="概览" bordered={false}>
				{items && items.length ? items :
					<span>暂无数据</span>
				}
			</Card>
		</div>)
}

const DisplaySide = inject(
	stores => ({
		totalData: stores.dataOverviewStore.totalData,
	})
)(observer(Display))

export default DisplaySide;
