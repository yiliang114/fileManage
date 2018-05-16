import request from './request'
import axios from 'axios'

export const getELementList = (params) => {
  return request('/element/api/elements',params)
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