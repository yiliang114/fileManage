import {observable, action, configure, runInAction} from 'mobx'
import {getCrowdList} from '../../services/crowd';
import {getELementList} from '../../services/element';

configure({enforceActions: true})

class elementStore {
  @observable accreditModalStore = {
    visible: false,
    checked: false
  }
  @observable deleteModalStore = {
    visible: false
  }

  // table data
  @observable searchText = ''
  @observable crowdList = []
  @observable total = 0

  @observable elementList = []
  @observable elementTotal = 0

  // delete modal
  @action changeDeleteVisible = (bool) => {
    this.deleteModalStore.visible = typeof bool === 'boolean'
      ? bool
      : false
  }

  // table data
  @action initCrowdList = async(params) => {
    const resp = await getCrowdList(params)
    if(resp && resp.data && resp.total) {
      runInAction(() => {
        this.crowdList = resp.data 
        this.total = resp.total
      })
    } else {
      runInAction(() => {
        this.crowdList = []
        this.total = 0
      })
    }
  }

  // table data
  @action initELementList = async(params) => {
    const resp = await getELementList(params)
    console.log('ELement List',resp)
    if(resp && resp.code === 0 && resp.data) {
      runInAction(() => {
        this.elementList = resp.data.elements
        this.elementTotal = resp.data.total
      })
    } else {
      runInAction(() => {
        this.elementList = []
        this.elementTotal = 0
      })
    }
  }

  @action changeSearchText = (value = '') => {
    this.searchText = value
  }

  @action updateELementList = (params = {}) => {
    this.initELementList(params)
  }

  // accreditModal
  @action changeAccreditVisible = (bool) => {
    console.log(bool)
    this.accreditModalStore.visible = typeof bool === 'boolean'
      ? bool
      : false
  }

  @action changeAccreditChecked = (bool) => {
    this.accreditModalStore.checked = typeof bool === 'boolean'
      ? bool
      : false
  }

  



}

export default new elementStore()