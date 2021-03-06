// 路由配置
var routes = [
  {
    path: '/',
    meta: {
      title: '记一笔',
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
      activeTypeIndex: 1,
    },
    component: resolve => {
      lazyLoading(resolve, 'statistics')
    },
  },
  {
    path: '/data-center',
    meta: {
      title: '数据中心',
      activeTypeIndex: 2,
    },
    component: resolve => {
      lazyLoading(resolve, 'data-center')
    },
  },
]



const lazyLoading = (resolve, name, index = true) => {
  require.ensure([], function(require) {
    resolve(require(`@/views/${name}${index ? '/Index' : ''}.vue`));
  })
}

export default routes
