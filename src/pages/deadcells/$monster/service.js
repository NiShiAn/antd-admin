import { request, config } from 'utils'

const { api } = config
const { deadCells } = api
const { monster } = deadCells

export function select(params) {
  return request({
    url: monster.select,
    method: 'get',
    data: params,
  })
}

