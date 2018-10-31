import modelExtend from 'dva-model-extend'
import { routerRedux } from 'dva/router'
import { selectList } from './service'
import { pageModel } from 'utils/model'

export default modelExtend(pageModel,{
  namespace: 'xblade',
  state: {
    editVisible: false,
    edit: {}
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/xblade') {
          const payload = location.query || { name: '', page: 1, pageSize: 10 }
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
    }, { put, call, select }) {
      const data = yield call(selectList, payload)
      if (data.success && data.IsSuccess) {
        yield put({
            type: 'querySuccess',
            payload: {
              list: data.Data.List,
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
    },
  },
  reducers: {
    showModal(state, { payload }){
      return { ...state, ...payload, editVisible: true }
    },
    hideModal(state){
      return { ...state, editVisible: false }
    }
  }
})
