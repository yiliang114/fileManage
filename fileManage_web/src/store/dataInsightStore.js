import {observable, action, configure, runInAction} from 'mobx';
import {dataInsightService} from '../services/index'
import agent from '../services/agent';

configure({enforceActions: true});

class DataInsightStore {
  @observable isLoading = false;
  @observable total = null;
  @observable chartData = [];
  @observable selectValue = '';

  @action async loadData(params = {}) {
    this.isLoading = true;

    return dataInsightService
      .insight(params)
      .then(action(resp => {
        this.isLoading = false;
        if (resp && resp.data && resp.data.length) {
          this.total = resp.total;
          this.chartData = resp.data;
        }
      }));
  }

  @action async loadCrowdList(params = {}) {
    return dataInsightService
      .crowdList(params)
      .then(action(resp => resp));
  }

  @action setValue(value) {
    this.selectValue = value
  }
}

export default new DataInsightStore();
