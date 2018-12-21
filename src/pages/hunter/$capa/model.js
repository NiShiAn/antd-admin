import modelExtend from 'dva-model-extend'
import { pageModel } from 'utils/model'

export default modelExtend(pageModel, {
  namespace: 'capa',
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/hunter/capa') {
          
        }
      })
    }
  }
})
