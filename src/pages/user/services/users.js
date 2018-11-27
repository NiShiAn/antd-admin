import { request, config } from 'utils'

const { api } = config
const { admin } = api

export function query (params) {
  return request({
    url: admin.select,
    method: 'get',
    data: params,
  })
}

export function remove (params) {
  return request({
    url: admin.select + '/delete',
    method: 'post',
    data: params,
  })
}
