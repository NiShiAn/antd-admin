import modelExtend from 'dva-model-extend'
import { select, insert, update, sort } from './service'
import { pageModel } from 'utils/model'

export default modelExtend(pageModel,{
  namespace: 'menu',
  state: {
    modalType: 'add',
    editShow: false,
    editBox: {}
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/menu') {
          const payload = location.query || { page: 1, pageSize: 10 }
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
            list: data.Data.List,
            pagination: {
              current: Number(payload.page) || 1,
              pageSize: Number(payload.pageSize) || 10,
              total: data.Data.Total
            }
          }
        })
      } else {
        throw data
      }
    },
    * insert ({ payload }, { put, call }){
      const data = yield call(insert, payload)
      if (data.success && data.IsSuccess) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    * update ({ payload },{ call, put }){
      const data = yield call(update, payload)
      if (data.success && data.IsSuccess) {
        yield put({ type: 'hideModal' })
      } else {
        throw data
      }
    },
    * sort ({ payload },{ call, put }){
      yield put({ type: 'updateState', payload: { list: payload.list } })
      yield call(sort, { sorts: payload.ids.join('@') })
    }
  },
  reducers: {
    showModal(state, { payload }){
      return { ...state, ...payload, editShow: true }
    },
    hideModal(state){
      return { ...state, editShow: false }
    }
  }
})
