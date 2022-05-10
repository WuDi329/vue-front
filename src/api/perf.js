import request from '@/utils/request'

export function addPerf(params) {
  return request({
    url: 'http://localhost:8000/perf/add/',
    method: 'get',
    params
  })
}

export function getAllPerf() {
  return request({
    url: 'http://localhost:8000/perf/getall/',
    method: 'get'
  })
}

export function getPerf(params) {
  return request({
    url: 'http://localhost:8000/perf/get/',
    method: 'get',
    params
  })
}

export function getAvgPerf(params) {
  return request({
    url: 'http://localhost:8000/perf/getavg/',
    method: 'get',
    params
  })
}

