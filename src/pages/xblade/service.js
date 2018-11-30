import { request, config } from 'utils'

const { api } = config
const { xblade } = api

export function select (params) {
  return request({
    url: xblade.select,
    method: 'get',
    data: params,
  })
}

export function update(params){
  return request({
    url: xblade.update,
    method: 'get',
    data: params
  })
}
