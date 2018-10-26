import { request, config } from 'utils'

const { api } = config
const { selectXblade } = api

export function selectList (params) {
  return request({
    url: selectXblade,
    method: 'get',
    data: params,
  })
}

