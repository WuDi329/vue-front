import request from '@/utils/request'

export function doLogin(params) {
  return request({
    url: 'http://localhost:8000/doLogin/',
    method: 'post',
    params
  })
}

export function getCSRFtoken() {
  debugger
  return request({
      url: 'http://localhost:8000/get-token/',
      method: 'get'
  })
}
