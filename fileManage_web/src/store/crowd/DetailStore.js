import {
  observable,
  action,
  configure,
  runInAction
} from 'mobx'
import {getElementDetail} from '../../services/element';

configure({enforceActions: true})

class DetailStore {
  @observable id = null
  @observable visible = false
  @observable detail = {}

  initData = async() => {
    const resp = await getElementDetail(this.id)
    console.log('resp: ',resp)
    if(resp && resp.code === 0 && resp.data) {
      runInAction(() => {
        this.detail = resp.data
      })
    }
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

  @action setId = (id) => {
    this.id = id
  }

  @action updateElement = (key,value) => {
    this.detail[key] = value
  }

}

export default new DetailStore()