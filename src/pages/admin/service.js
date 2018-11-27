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

export function insert(params){
  return request({
    url: admin.insert,
    method: 'get',
    data: params
  })
}

export function update(params){
  return request({
    url: admin.update,
    method: 'get',
    data: params
  })
}

export function roles(){
  return request({
    url: admin.roles,
    method: 'get'
  })
}