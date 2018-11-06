import { request, config } from 'utils'

const { api } = config
const { selectXblade, updateXblade } = api

export function selectList (params) {
  return request({
    url: selectXblade,
    method: 'get',
    data: params,
  })
}

export function update(params){
  return request({
    url: updateXblade,
    method: 'get',
    data: params
  })
}
