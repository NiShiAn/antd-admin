import { request, config } from 'utils'

const { api } = config
const { admin } = api

export function login (params) {
  return request({
    url: admin.login,
    method: 'post',
    data: params,
  })
}

export function logout (params) {
  return request({
    url: admin.logout,
    method: 'get',
    data: params,
  })
}

