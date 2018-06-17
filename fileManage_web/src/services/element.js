import request from './request'
import axios from 'axios'

export const getELementList = (params) => {
  return request('/element/api/elements',{
    page: 1,
    limit: 10,
    // all： 表示拉取全部； 0，1，2 分表表示 准备中，已完成 和 失败
    generateStatus: [0,1,2],
    // all： 表示拉取全部； 0，1 分别表示不正常和正常
    scoreStatus: [0,1],
    start_time: '',
    end_time: '',
    name: '',
    num_order: '',
    create_time_order: '',

    ...params
  })
}

export const getElementDetail = (id) => {
  return request(`/element/api/elementId?id=${id}`)
}

// todo
// 集中
export const deleteElement = (id) => {
  const resp = axios.delete(`/element/api/deleteElement?id=${id}`).then(resp => resp.data)
  .then(resp => {
    return resp;
  })
  .catch(error => {
    console.error('请求出错，请重试')
  });

  return resp
}

// 修改 element 的值
export const updateELement = (element) => {

  const resp = axios.put('/element/api/updateELement',element)
    // resp 是 整个 resp的返回体
    .then(resp => resp.data)
    .then(resp => {
      return resp;
    })
    .catch(error => {
      console.error('请求出错，请重试')
    });

  return resp
}

// 画图并上传七牛云
export const createImgs = (params) => {
  return request('/element/api/createImgs',{
    id: 111,
    name: 'xxx',
    score: 100,
    picture: 'F:\\dataSource\\parabolarBlade\\bladeFile\\parabolarBlade500sl50sh0cx0cy.mat',
    curve: 'G:\\作业盘\\javagui\\m-jtest\\03-13\\torgeFile0.0838-0\\parabolarBlade500sl150sh100cx-200cy0.0838',
    create_time: '2222',
    from_ip: '1221',
    status: 0
  })
}