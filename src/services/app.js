import { request, config } from 'utils'

const { api } = config
const { user, userLogout, userLogin } = api

export function login (params) {
  debugger;
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

export function logout (params) {
  debugger;
  return request({
    url: userLogout,
    method: 'get',
    data: params,
  })
}

export function query (params) {
  debugger;
  return request({
    url: user.replace('/:id', ''),
    method: 'get',
    data: params,
  })
}
