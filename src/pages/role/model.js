import modelExtend from 'dva-model-extend'
import { select, insert, update, menu } from './service'
import { pageModel } from 'utils/model'

export default modelExtend(pageModel,{
  namespace: 'role',
  state: {
    roles: [],
    modalType: 'add',
    editShow: false,
    editBox: {},
    purviewShow: false,
    curRoleId: 0,
    roleMenus: [],
    checkedKey: []
  },
  subscriptions: {
    setup ({ dispatch }) {
      dispatch({ type: 'select', payload: {} })
    }
  },
  effects: {
    * select ({ payload }, { put, call }) {
      const data = yield call(select, payload)
      if (data.success && data.IsSuccess) {
        yield put({
          type: 'updateState',
          payload: {
            roles: data.Data
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
    * menu ({ payload },{ call, put }){
      const data = yield call(menu, payload)
      if (data.success && data.IsSuccess) {
        yield put({ type: 'hidePurview' })
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
    showPurview(state, { payload }){
      return { ...state, ...payload, purviewShow: true }
    },
    hidePurview(state){
      return { ...state, purviewShow: false }
    }
  }
})
