import request from './request'
import axios from 'axios'

export const getMonitorDetail = () => {
  return request(`/trace/api/traces`)
}

export const getMonitorPandect = () => {
  return request(`/trace/api/pandect`)
}

export const getTraceOfIps = () => {
  return request(`/trace/api/traceOfIps`)
}

export const getTraceByDay = () => {
  return request(`/trace/api/traceByDay`)
}
