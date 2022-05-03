import request from '@/utils/request'

export function doLogin(data) {
  return request({
    url: 'http://localhost:8000/doLogin/',
    method: 'post',
    data: data
  })
}

export function getCSRFtoken() {
  //debugger
  return request({
      url: 'http://localhost:8000/get-token/',
      method: 'get'
  })
}
