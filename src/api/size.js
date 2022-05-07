import request from '@/utils/request'

export function addSize(params) {
  return request({
    url: 'http://localhost:8000/size/add',
    method: 'get',
    params
  })
}

export function getAllSize() {
  return request({
    url: 'http://localhost:8000/size/getall/',
    method: 'get'
  })
}

export function getSize(params) {
  return request({
    url: 'http://localhost:8000/size/get/',
    method: 'get',
    params
  })
}

