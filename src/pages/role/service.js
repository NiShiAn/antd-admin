import { request, config } from 'utils'

const { api } = config
const { role } = api

export function select(params) {
  return request({
    url: role.select,
    method: 'get',
    data: params,
  })
}

export function insert(params) {
  return request({
    url: role.insert,
    method: 'get',
    data: params
  })
}

export function update(params) {
  return request({
    url: role.update,
    method: 'get',
    data: params
  })
}

export function menu(params) {
  return request({
    url: role.menu,
    method: 'get',
    data: params
  })
}