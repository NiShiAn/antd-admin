/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */

import { routerRedux } from 'dva/router'
import config from 'config'
import { logout } from 'services/app'
import queryString from 'query-string'

const { prefix, loginKey } = config

export default {
  namespace: 'app',
  state: {
    user: {},
    permissions: {
      visit: [],
    },
    menu: [{
      Id: 1,
      Name: '首页',
      Icon: 'laptop',
      Route: '/dashboard',
      Level: 1,
      ParentId: 0
    }],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: location.query,
          },
        })
      })
    },
    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    }
  },
  effects: {
    * query (action, { put, select }) {
      var userJson = window.sessionStorage.getItem(loginKey)
      const { locationPathname } = yield select(_ => _.app)

      if (userJson && userJson.length > 0) {
        const user = JSON.parse(userJson);

        yield put({
          type: 'updateState',
          payload: {
            user,
            permissions: {
              visit: user.Menus.map(item => item.id)
            },
            menu: user.Menus
          }
        })
        if (location.pathname === '/login') {
          yield put(routerRedux.push({ pathname: '/dashboard' }))
        }
      } else if (config.openPages && config.openPages.indexOf(locationPathname) < 0) {
        window.sessionStorage.removeItem(loginKey)
        yield put(routerRedux.push({
          pathname: '/login',
          search: queryString.stringify({ from: locationPathname })
        }))
      }
    },
    * logout ({ payload }, { call, put }) {
      const data = yield call(logout, { id: payload })
      if (data.success) {
        window.sessionStorage.removeItem(loginKey)
        yield put({ type: 'updateState', payload: {
          user: {},
          permissions: { visit: [] },
          menu: [{
            Id: 1,
            Name: '首页',
            Icon: 'laptop',
            Route: '/dashboard',
            Level: 1,
            ParentId: 0
          }],
        }})
        yield put(routerRedux.push({ pathname: '/login' }))
      } else {
        throw (data)
      }
    },
    * changeNavbar (action, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },
  },
  reducers: {
    updateState (state, { payload }) {
      return { ...state, ...payload }
    },
    switchSider (state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return { ...state, siderFold: !state.siderFold }
    },
    switchTheme (state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return { ...state, darkTheme: !state.darkTheme }
    },
    switchMenuPopver (state) {
      return { ...state, menuPopoverVisible: !state.menuPopoverVisible }
    },
    handleNavbar (state, { payload }) {
      return { ...state, isNavbar: payload }
    },
    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return { ...state, ...navOpenKeys }
    }
  }
}
