import { routerRedux } from 'dva/router'
import { config } from 'utils'
import { login } from './service'

const { loginKey } = config

export default {
  namespace: 'login',
  state: {},
  effects: {
    * login ({ payload }, { put, call, select }) {
      const data = yield call(login, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success && data.IsSuccess) {
        let { Data } = data;  
        window.sessionStorage.setItem(loginKey, JSON.stringify({
          Id: Data.UserId,
          Name: Data.UserName,
          Account: Data.Account,
          Menus: Data.MenuList
        }))
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard', ))
        }
      } else {
        throw data
      }
    }
  }
}
