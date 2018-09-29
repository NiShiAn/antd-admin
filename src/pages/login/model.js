import { routerRedux } from 'dva/router'
import { login } from './service'

export default {
  namespace: 'login',

  state: {},

  effects: {
    * login ({
      payload
    }, { put, call, select }) {
      const data = yield call(login, payload)
      const { locationQuery } = yield select(_ => _.app)
      if (data.success && data.IsSuccess) {
        let { Data } = data;  
        window.localStorage.setItem('loginUser', JSON.stringify({
          Id: Data.Idx,
          Name: Data.UserName,
          Account: Data.Account
        }))
        const { from } = locationQuery
        yield put({ type: 'app/query' })
        if (from && from !== '/login') {
          yield put(routerRedux.push(from))
        } else {
          yield put(routerRedux.push('/dashboard'))
        }
      } else {
        throw data
      }
    },
  },

}
