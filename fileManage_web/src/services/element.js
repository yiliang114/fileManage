import agent from './agent';
import request from './request'

export const getELementList = (params) => {
  return request('/element/api/elements')
}