import React from 'react';
import './data-overview.less';
import Header from './Header';
import DisplaySide from './Display';
import ChartCard from './Chart';
import {formatTime, getTime} from '../../lib/utils';
import {observer, inject} from 'mobx-react';
import {getStat} from '../../services/dataOverview'

@inject('dataOverviewStore')
@observer
export default class Marketing extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="data-overview">
        <Header/>
        <DisplaySide/>
        <ChartCard/>
      </div>
    );
  }
}
