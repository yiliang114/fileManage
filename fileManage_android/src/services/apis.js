// http://localhost:8080/api/element/elements
import request from './request'

export const getElements = () => {
  return request('/element/api/elements')
}