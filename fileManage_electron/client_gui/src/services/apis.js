// http://localhost:8080/api/element/elements
import request from './request'
import axios from 'axios'


export const getElements = () => {
  return request('/element/api/elements')
}

// http://localhost:8080/cmd/clientWork
// 传输文件
export const clientWork = (SERVER_IP,SERVER_PORT,params) => {
  // return request(`/cmd/clientWork?SERVER_IP=${SERVER_IP}&SERVER_PORT=${SERVER_PORT}&fileSrc=${fileSrc}`)
  // return request('cmd/clientWork',{
  //   SERVER_IP,
  //   SERVER_PORT,
  //   ...params
  // })

  return axios
    .post('http://localhost:8080/cmd/clientWork', {
      serverIp: SERVER_IP,
      serverPort: SERVER_PORT,
      ...params
    })
    .then(resp => resp.data)
    .then(resp => {
      return resp;
    })
    .catch(error => {
      console.error('请求出错，请重试')
    });
}

export const monitorClientWork = (SERVER_IP,SERVER_PORT,params) => {
  return axios
    .post('http://localhost:8080/cmd/monitorClientWork', {
      serverIp: SERVER_IP,
      serverPort: SERVER_PORT,
      ...params
    })
    .then(resp => resp.data)
    .then(resp => {
      return resp;
    })
    .catch(error => {
      console.error('请求出错，请重试')
    });
}