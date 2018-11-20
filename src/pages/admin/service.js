import { request, config } from 'utils'

const { api } = config
const { admin } = api

export function select (params) {
  return request({
    url: admin.select,
    method: 'get',
    data: params,
  })
}