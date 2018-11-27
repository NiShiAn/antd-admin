import modelExtend from 'dva-model-extend'
import { selectList, update } from './service'
import { pageModel } from 'utils/model'

export default modelExtend(pageModel,{
  namespace: 'xblade',
  state: {
    editShow: false,
    editBox: {},
    favesShow: false,
    favesBox: {}
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
    }, { put, call }) {
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
    * update({ payload },{ select, call, put }){
      const data = yield call(update, payload)
      if (data.success && data.IsSuccess) {
        yield put({ type: 'hideModal' })
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
    showFaves(state, { payload }){
      return{ ...state, ...payload, favesShow: true }
    },
    hideFaves(state){
      return { ...state, favesShow: false }
    },
  }
})
