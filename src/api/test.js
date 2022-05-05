import request from '@/utils/request'

export function getls() {
  return request({
    url: 'http://localhost:8000/test/ls/',
    method: 'get',
  })
}