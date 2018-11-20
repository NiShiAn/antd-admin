import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import { select } from './service'
import { pageModel } from 'utils/model'

export default modelExtend(pageModel,{
  namespace: 'admin',
  state: {
    editShow: false,
    editBox: {}
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/admin') {
          const payload = location.query || { page: 1, pageSize: 10 }
          dispatch({
            type: 'select',
            payload,
          })
        }
      })
    },
  },
  effects: {
    * select ({
      payload
    }, { put, call }) {
      const data = yield call(select, payload)
      if (data.success && data.IsSuccess) {
        yield put({
            type: 'querySuccess',
            payload: {
              list: data.Data,
              pagination: {
                current: Number(payload.page) || 1,
                pageSize: Number(payload.pageSize) || 10,
                total: data.Data.Total
              },
            },
        })
      } else {
        throw data
      }
    }
  },
  reducers: {
    showModal(state, { payload }){
      return { ...state, ...payload, editShow: true }
    },
    hideModal(state){
      return { ...state, editShow: false }
    },
  }
})
