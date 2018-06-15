import axios from 'axios'

export const serverStart = (serverPort,receiveFolder) => {

  return axios
    // .post('cmd/serverStart', {
    .post('http://localhost:8080/cmd/serverStart', {      
      serverPort,
      receiveFolder
    })
    .then(resp => resp.data)
    .then(resp => {
      return resp;
    })
    .catch(error => {
      console.error('请求出错，请重试')
    });
}