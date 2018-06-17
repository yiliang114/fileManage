import {observable, action, configure} from 'mobx'

configure({enforceActions: true})

class FormStore {
  // type = 0 表示 单文件传输
  // type = 1 表示 多文件传输
  @observable type = 'folderInput'

  @observable SERVER_IP = '127.0.0.1'
  @observable SERVER_PORT = '9999'
  
  // todo 初始值不能为空， mobx 更新有问题
  @observable fileSrc = 'F:\\fileManageWorkspace\\send\\bladeFile-0\\parabolarBlade500sl150sh100cx-100cy.mat'
  // todo 初始值不能为空，mobx 更新有问题
  @observable folderSrc = 'F:\\fileManageWorkspace\\send\\bladeFile-0\\imageTemp'
  // 自动扫描间隔时间
  @observable scanInterval = 5000

  // 导入数据库文件数据
  @observable picFileSrc = 'F:\\dataSource\\parabolarBlade\\bladeFile\\parabolarBlade500sl50sh0cx0cy.mat'
  @observable curveFileSrc = 'F:\\dataSource\\parabolarBlade\\torgeFile0.0838\\parabolarBlade500sl50sh0cx0cy0.0838'

  @observable picFolderSrc = 'F:\\dataSource\\6-17\\bladeFile-0'
  @observable curveFolderSrc = 'F:\\dataSource\\6-17\\torgeFile0.0838-0'
  

  @action changeValue = (target,value) => {
    if(this[target]) {
      this[target] = value
    }
    console.log(target,this[target])
  }

  // 提交
  @action submitParams = () => {
    let params = {
      type: this.type,
      SERVER_IP: this.SERVER_IP,
      SERVER_PORT: this.SERVER_PORT
    }
    if(this.type === 0) {
      params = {
        ...params,
        fileSrc: this.fileSrc
      }
    } else {
      params = {
        ...params,
        folderSrc: this.folderSrc,
        scanInterval: this.scanInterval
      }
    }
    // post
    console.log('params: ',params)

  }
}

export default new FormStore()
