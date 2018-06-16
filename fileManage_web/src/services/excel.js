import axios from 'axios'

export const dbToExcel = (excelFileSrc) => {
  return axios
    .post('/cmd/dbToExcel', {
      src: excelFileSrc
    })
    .then(resp => resp.data)
    .then(resp => {
      // if (resp.code === 401 && resp.url) {   location.href = resp.url; } 
      // else if(resp.code === 403 && resp.info) {   message.info(resp.info); }
      return resp;
    })
    .catch(error => {
      console.error('请求出错，请重试')
    });
}
