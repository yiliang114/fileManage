import request from './request'
import axios from 'axios'

export const getMonitorDetail = () => {
  // return request(`/element/api/elementId?id=${id}`)
  const resp = axios.get('https://jsonplaceholder.typicode.com/users')
    .then(resp => resp.data)
    .then(resp => {
      return resp;
    })
    .catch(error => {
      console.error('请求出错，请重试')
    });

  return resp
}
