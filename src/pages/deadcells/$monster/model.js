import modelExtend from 'dva-model-extend'
import { select } from './service'
import { pageModel } from 'utils/model'

export default modelExtend(pageModel,{
  namespace: 'deadCells_Monster',
  state: {
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/deadcells/monster') {
          const payload = location.query || {}
          dispatch({ type: 'select', payload })
        }
      })
    }
  },
  effects: {
    * select ({ payload }, { put, call }) {
      const data = yield call(select, payload)
      if (data.success && data.IsSuccess) {
        yield put({
          type: 'querySuccess',
          payload: {
            list: data.Data
          }
        })
      } else {
        throw data
      }
    }
  },
  reducers: {

  }
})
