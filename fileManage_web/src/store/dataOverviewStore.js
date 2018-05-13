import resource from '../lib/resource';
import {observable, action, computed, configure} from 'mobx'
import {formatTime, getTime} from '../../lib/utils';
import {downloadStat, getStat} from "../services/dataOverview";
configure({enforceActions: true})

class dataStore {
  // 数据源类型列表
  @observable dataResource = resource
  // 当前结果的对应参数
  @observable paramsStore = {
    origin: Object.keys(resource),
    start_time: formatTime(getTime(-7)),
    end_time: formatTime(new Date())
  }

  @observable listData = {};

  // 设置listData
  @action setListData = (listData) => {
    this.listData = listData;
  }

  // 查询数据
  @action fetchData = async(params) => {
    if (params) 
      this.paramsStore = params;
    let res = await getStat({
      ...this.paramsStore,
      type: 1
    });
    if (res.code === 0) 
      this.setListData(res.data);
    }
  // 下载数据
  @action downloadData = async(params) => {
    params = params || this.paramsStore;
    let res = await downloadStat({
      origin: params
        .origin
        .join('|'),
      start_time: params.start_time,
      end_time: params.end_time,
      type: 2
    });
  }

  // 概览数据
  @computed get totalData() {
    const listData = this.listData;
    return Object
      .keys(listData)
      .map(key => ({
        key,
        name: resource[key],
        value: listData[key].reduce((sum, e, i) => (sum + e.num), 0)
      }));
  }

}

export default new dataStore();
