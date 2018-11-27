import { request, config } from 'utils'

const { api } = config
const { admin } = api

export function login (data) {
  return request({
    url: admin.login,
    method: 'get',
    data,
  })
}
