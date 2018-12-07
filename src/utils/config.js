const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
//const head = 'http://localhost:58043/fr'
const head = 'http://47.94.160.77:8034/fr'

module.exports = {
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2018 zuiidea',
  logo: '/public/logo.svg',
  iconFontCSS: '/public/iconfont.css',
  iconFontJS: '/public/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  loginKey: 'loginUser',
  api: {
    admin: {
      login: `${head}/admin/login`,
      logout: `${head}/admin/logout`,
      select: `${head}/admin/user/list`,
      insert: `${head}/admin/user/insert`,
      update: `${head}/admin/user/update`,
      roles: `${head}/admin/user/roles`
    },
    menu: {
      select: `${head}/admin/menu/list`,
      insert: `${head}/admin/menu/insert`,
      update: `${head}/admin/menu/update`,
      sort: `${head}/admin/menu/sort`
    },
    xblade: {
      select: `${head}/xblade/list`,
      update: `${head}/xblade/update`
    },
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  }
}
