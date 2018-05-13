import {observable, action, configure, runInAction, computed} from 'mobx'
import {saveCrowd} from '../../services/crowd'

configure({enforceActions: true})

class CreationStore {

  @observable extractType = 1
  @observable crowdName = null

  // step current
  @observable stepCurrent = 0

  // wifi
  @observable wifi = {
    connection_start_date: "", // 起始连接日期
    connection_end_date: "", // 截止连接日期
    connection_time: [ // 连接时段【[0, 1, ..., 23]表示全时段】
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23
    ],
    connection_place: [],
    datasource: {}

  }
  @observable keyword = {
    is_expand: 1, // 是否拓展关键词【1-是 0-否】
    expand_num: 0, // 拓展词数
    is_exclude: 1, // 是否排除关键词【1-是 0-否】
    info: {
      kw_valid: [],
      kw_invalid: [],
      kw_extend: [],
      kw_exclude_valid: [],
      kw_exclude_invalid: []
    }
  }

  @observable lbs = {
    fences: []
  }
  @observable extend = {
    level_num: 9,
    type: 1,
    crowd: {}
  }
  @observable isFromCrowd = false

  @observable group = {
    warnModalVisible: false,

    logic_str: "", // 逻辑组合串
    crowd_str: "" // 人群组合串
  }

  // common
  @action changeCrowdName = crowdName => {
    this.crowdName = crowdName
  }
  // obj 表示 observable 对象，key 表示这个对象的键， value 为需要改变的值
  @action setValue = (obj = '', key = '', value = '') => {
    if (obj.length !== 0 && key.length !== 0 && value !== 0) {
      this[obj][key] = value
    }
  }

  @action allHandleSubmit = async() => {
    // 根据type 提交不同的params
    const maps = [
      'file',
      'wifi',
      'keyword',
      'lbs',
      'extend',
      'group'
    ]
    const index = this.extractType - 1
    const params = {
      name: this.crowdName,
      type: this.extractType,
      [maps[index]]: this[index < maps.length && maps[index]]
    }
    return saveCrowd(params)
  }

  @action changeExtractType = (num) => {
    this.extractType = typeof num === 'number'
      ? num
      : 0
  }

  // extend
  @action turnIsFromCrowd = (bool) => {
    this.isFromCrowd = typeof bool === 'boolean'
      ? bool
      : false
  }

  // group
  @action changeCBSelected = (values) => {
    this.group.selectedRowKeys = values
  }
  @action getCBData = async(params) => {
    // this.group.data = params
    //
    // 删除 getGroupCrowdList
    const resp = await saveCrowd()
    runInAction(() => {
      this.group.data = resp.data
    })
  }
  @action changeCBWarnModalVisible = (bool) => {
    this.group.warnModalVisible = typeof bool === 'boolean'
      ? bool
      : false
  }

  // group
  @computed get selectedRowKeysLength() {
    return this.group.selectedRowKeys.length
  }

  // wifi
  @action setWifiStoreData = (type, value) => {
    if (Object.keys(this.wifi).indexOf(type) > -1) {
      this.wifi[type] = value
    }
  }

  // lbs
  @action changeLBSValue = (key, value) => {
    if (key) {
      this.lbs[key] = value
    }
  }

  // keyword
  @action setKeywordStoreData = (type, value) => {
    if (Object.keys(this.keyword).indexOf(type) > -1) {
      this.keyword[type] = value
    }
  }

  @action changeTags = (key, arr) => {
    if (Object.keys(this.keyword.info).indexOf(key) > -1) {
      this.keyword.info[key] = arr
    }
    console.log(key, this.keyword.info[key])
  }

  // step
  @action changeStepCurrent = (value) => {
    this.stepCurrent = value
    console.log('stepCurrent', this.stepCurrent)
  }

}

export default new CreationStore()
