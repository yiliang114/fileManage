import {
  observable,
  action,
  configure,
  runInAction,
  transaction,
  computed
} from 'mobx'
import {getCrowdDetail, getCrowdList} from '../../services/crowd'

configure({enforceActions: true})

class SupernatantStore {
  @observable id = null
  @observable visible = false
  @observable type = 0
  @observable detail = {}
  // @observable tableDataSource = []

  initData = async() => {
    const resp = await getCrowdDetail(this.id)
    runInAction("上面的action修饰不到", () => {
      this.detail = resp.data
    })
  }

  @action changeVisible = (bool) => {

    this.visible = typeof bool === 'boolean'
      ? bool
      : false
    // console.log('changeVisible', this.visible) 这里优化组件的加载速度，只有在modal 显示的时候才会请求数据
    if (this.visible) {
      console.log('changeVisible', this.visible)

      this.initData()
    } else {
      // 隐藏浮层， detail置空
      this.detail = {}
    }
  }

  @action changeExtractType = (num) => {
    this.type = typeof num === 'number'
      ? num
      : 0
  }

  @action setId = (id) => {
    this.id = id
  }

  @action updateCrowdName = (value) => {
    this.detail.name = value
  }

  @computed get isShowTable() {
    if ([4, 5, 6].indexOf(this.type) > -1) {
      return true
    }
    return false
  }

  @computed get tableDataSource() {

    const type_maps = ['lbs', 'extend', 'group']
    const maps = ['fences', 'crowd', 'crowds']
    if ([4, 5, 6].indexOf(this.type) > -1 && Object.keys(this.detail).length) {

      const type_key = type_maps[this.type - 4]
      const key = maps[this.type - 4]
      if (key === 'crowd') {
        let temp = []
        temp.push(this.detail[type_key][key])
        return temp
      }
      return this.detail[type_key][key]
    }
    return []
  }
}

export default new SupernatantStore