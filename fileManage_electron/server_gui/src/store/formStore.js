import {observable, action, configure} from 'mobx'

configure({enforceActions: true})

class FormStore {

  @observable SERVER_PORT = '9999'
  @observable folderSrc = 'F:\\fileManageWorkspace\\receive'

  @action changeValue = (target,value) => {
    if(this[target]) {
      this[target] = value
    }
    console.log(target,this[target])
  }
}

export default new FormStore()
