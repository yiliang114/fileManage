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

export const fileInfoToDb = (params) => {
  return axios
    .post('http://localhost:8080/cmd/fileInfoToDb', {
      id: parseInt(Math.random()*100000),
      name: "222",
      score: 0,
      picture: params.picFileSrc,
      curve: params.curveFileSrc,
      create_time: "2018-05-23 14:35:02",
      from_ip: "ip1",
      status: 0
    })
    .then(resp => resp.data)
    .then(resp => {
      return resp;
    })
    .catch(error => {
      console.error('请求出错，请重试')
    });
}

export const folderInfoToDb = (picFolderSrc,curveFolderSrc) => {
  return axios
    .post('http://localhost:8080/cmd/folderInfoToDb', {
      picFolderSrc,curveFolderSrc
    })
    .then(resp => resp.data)
    .then(resp => {
      return resp;
    })
    .catch(error => {
      console.error('请求出错，请重试')
    });
}