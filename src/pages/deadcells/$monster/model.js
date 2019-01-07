import modelExtend from 'dva-model-extend'
import { select } from './service'
import { pageModel } from 'utils/model'

export default modelExtend(pageModel,{
  namespace: 'deadCells_Monster',
  state: {
    indext: 1,
    totals: 0,
    inLoad: false,
    hasMore: true,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/deadcells/monster') {
          dispatch({ 
            type: 'select', 
            payload: {
              page: 1, 
              pageSize: 5
            }
          })
        }
      })
    }
  },
  effects: {
    * select ({ payload }, { put, call }) {
      const data = yield call(select, payload)
      if (data.success && data.IsSuccess) {
        yield put({
          type: 'initList',
          payload: {
            page: payload.page,
            list: data.Data.List,
            total: data.Data.Total
          }
        })
      } else {
        throw data
      }
    }
  },
  reducers: {
    initList(state, { payload }){
      return { 
        ...state,
        inLoad: false,
        indext: payload.page,
        list: state.list.concat(payload.list),
        totals: payload.total
      }
    },
  }
})
