import agent from './agent';

export const getCrowdList = (params) => {
  return agent('/pdmp/api/v1/crowd/list', {
    page: 1, // 页数，从1开始
    limit: 10, // 每页记录数，all为全量拉取
    start_time: '', // 起始时间，格式YYYY-MM-DD（为空表示全部）
    end_time: '', // 截止时间，格式YYYY-MM-DD（为空表示全部）
    name: '', // 人群名称，可为空
    type: [
      1,
      2,
      3,
      4,
      5,
      6
    ], // 提取方式，1 文件数据，2 场内数据, 3 关键词提取，4 lbs，5 拓展，6 组合
    extract_status: [
      1, 2, 3
    ], // 创建状态：1 准备中，2 成功，3 失败
    orders: [// 排序字段
      // {   name: 'num',   order: 'desc' },
      {
        name: 'create_time',
        order: 'desc'
      }
    ],
    ...params
  })
}

export const saveCrowd = (params) => {
  return agent('/pdmp/api/v1/crowd/save', params);
}

export const updateCrowd = (params) => {
  return agent('/pdmp/api/v1/crowd/update', params);
}

export const accredit = (params) => {
  return agent('/pdmp/api/v1/datasource/authds', params);
}

export const deleteCrowd = (params) => {
  return agent('/pdmp/api/v1/crowd/delete', params);
}

export const getCrowdDetail = (id) => {
  return agent('/pdmp/api/v1/crowd/detail', {id});
}

export const getWifiLocation = (id) => {
  return agent('/pdmp/api/v1/crowd/wifi-loc', {
    datasource: {
      id: id
    }
  });
}

export const kwExtend = (params) => {
  return agent('/pdmp/api/v1/crowd/kw-extend', params);
}

export const kwCheck = (params) => {
  return agent('/pdmp/api/v1/crowd/kw-check', params);
}

// 获取wifi 数据源列表
export const getdsshortlist = (params) => {
  return agent('/pdmp/api/v1/datasource/getdsshortlist', params);
}
