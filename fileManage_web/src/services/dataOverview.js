import agent from '../services/agent';
import axios from 'axios';

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

function queryStringStringify(obj) {
  return `?${Object
    .keys(obj)
    .map(key => `${key}=${obj[key]}`)
    .join('&')}`;
}

//获取数据概览
export const getStat = (params) => {
  return agent('/pdmp/api/v1/datasource/getstat', params);
};

//获取下载数据
export const downloadStat = (params) => {
  const link = document.createElement('a');
  link.href = '/pdmp/api/v1/datasource/getstat' + queryStringStringify({
    ...params,
    token: getToken()
  });
  link.download = 'download.xlsx';
  document
    .body
    .appendChild(link);
  link.click();
  document
    .body
    .removeChild(link);
};
