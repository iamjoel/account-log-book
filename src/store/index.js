import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import * as actions from './actions'
import * as getters from './getters'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

import {inType, outType} from '@/dict.js'
// 测试数据
// var logData = {
//   2018: {
//     10: {// 上月的数据
//       1: [makeMockLogItemData('in'),makeMockLogItemData('out'),makeMockLogItemData('out'),],
//       2: [makeMockLogItemData('out'),makeMockLogItemData('out'),],
//       4: [makeMockLogItemData('in'),makeMockLogItemData('out'),makeMockLogItemData('out'),],
//       10: [makeMockLogItemData('in'),makeMockLogItemData('out'),makeMockLogItemData('out'),],
//       29: [makeMockLogItemData('in'),makeMockLogItemData('out'),makeMockLogItemData('out'),],
//     },
//     11: {// 本月的数据
//       1: [makeMockLogItemData('in'),makeMockLogItemData('out'),makeMockLogItemData('out'),],
//       2: [makeMockLogItemData('out'),makeMockLogItemData('out'),],
//       3: [makeMockLogItemData('in'),makeMockLogItemData('out'),makeMockLogItemData('out'),],
//       4: [makeMockLogItemData('in'),makeMockLogItemData('out'),makeMockLogItemData('out'),],
//       20: [makeMockLogItemData('in'),makeMockLogItemData('out'),makeMockLogItemData('out'),],
//     }
//   },
// }

const state = {
  isShowFooter: true,
  activeTypeIndex: 0,
  // log: logData
  log: localStorage.getItem('log') ? JSON.parse(localStorage.getItem('log')) : {}
}

export default new Vuex.Store({
    state,
    mutations,
    actions,
    getters,
    strict: debug,
})

function makeMockLogItemData(type) {
  return {
    type,
    classify: getRandomClassify(type),
    value: parseInt(2 + Math.random() * 10), // 金额
    comment: '随机注释' + parseInt(2 + Math.random() * 10)
  }
}

function getRandomClassify(type) {
  var allClassify = type === 'in' ? inType : outType
  if(Math.random() > 0.6) { // 模拟的真一点，第一类是最多的
    return allClassify[0]
  } else {
    var index = parseInt(Math.random() * allClassify.length)
    return allClassify[index]
  }
  
}
