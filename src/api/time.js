import request from '@/utils/request'

export function addTime(params) {
  return request({
    url: 'http://localhost:8000/time/add',
    method: 'get',
    params
  })
}

export function getAllTime() {
  return request({
    url: 'http://localhost:8000/time/getall/',
    method: 'get'
  })
}

export function getTime(params) {
  return request({
    url: 'http://localhost:8000/time/get/',
    method: 'get',
    params
  })
}
