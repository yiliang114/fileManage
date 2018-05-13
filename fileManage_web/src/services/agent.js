import axios from 'axios';
import {message} from 'antd'

function getToken() {
  let hash = 5381;
  let str = getCookie('skey') || '';
  for (let i = 0, len = str.length; i < len; ++i) {
    hash += (hash << 5 & 0x7fffffff) + str.charCodeAt(i)
  }
  return hash & 0x7fffffff;
}

function getCookie(name) {
  var arr,
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr = document.cookie.match(reg)) 
    return unescape(arr[2]);
  else 
    return null;
  }

axios.defaults.timeout = 8000;
export default(api, params) => axios
  .post(api, {
  data: params,
  token: getToken()
})
  .then(resp => resp.data)
  .then(resp => {
    if (resp.code === 401 && resp.url) {
      window.location.href = resp.url;
    } else if (resp.code === 403 && resp.info) {
      message.info(resp.info);
    }
    return resp;
  })
  .catch(error => {
    message.error('请求出错，请重试')
  });
