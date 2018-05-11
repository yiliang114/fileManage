import axios from 'axios'

const request = (api, params) => {
  if (params) {
    return axios
      .post(api, {data: params})
      .then(resp => resp.data)
      .then(resp => {
        // if (resp.code === 401 && resp.url) {   location.href = resp.url; } else if
        // (resp.code === 403 && resp.info) {   message.info(resp.info); }
        return resp;
      })
      .catch(error => {
        console.error('请求出错，请重试')
      });
  } else {
    return axios
      .get(api)
      .then(resp => resp.data)
      .then(resp => {
        // if (resp.code === 401 && resp.url) {   location.href = resp.url; } else if
        // (resp.code === 403 && resp.info) {   message.info(resp.info); }
        return resp;
      })
      .catch(error => {
        console.error('请求出错，请重试')
      });
  }
}

export default request