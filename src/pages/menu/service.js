import { request, config } from 'utils'

const { api } = config
const { menu } = api

export function select(params) {
  return request({
    url: menu.select,
    method: 'get',
    data: params,
  })
}

export function insert(params) {
  return request({
    url: menu.insert,
    method: 'get',
    data: params
  })
}

export function update(params) {
  return request({
    url: menu.update,
    method: 'get',
    data: params
  })
}
