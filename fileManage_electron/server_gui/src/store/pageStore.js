import {observable, action, configure} from 'mobx'

configure({enforceActions: true})

class PageStore {
  @observable name = 'mrjzhang'

  @action changeName = (name) => {
    this.name = name
  }
}

export default new PageStore()
