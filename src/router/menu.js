// 路由配置
var routes = [
  {
    path: '/',
    meta: {
      title: '首页',
      activeTypeIndex: 0,
    },
    component: resolve => {
      lazyLoading(resolve, 'index')
    },
  },
  {
    path: '/statistics',
    meta: {
      title: '统计',
      activeTypeIndex: 3,
    },
    component: resolve => {
      lazyLoading(resolve, 'statistics')
    },
  },
]



const lazyLoading = (resolve, name, index = true) => {
  require.ensure([], function(require) {
    resolve(require(`@/views/${name}${index ? '/Index' : ''}.vue`));
  })
}

export default routes
