import * as types from './mutation-types'
import moment from 'moment'

const mutations = {
  [types.USER_INFO] (state, user) {
    state.user = user
  },
  [types.OPENID] (state, openid) {
    state.openid = openid
  },
  [types.CHANGE_ACTIVE_TYPE](state, type) {
    state.activeTypeIndex = type
  },
  [types.CHANGE_FOOTER_VISIBLE](state, isShow) {
    state.isShowFooter = isShow
  },

  saveData (state, arg) {
      let year = moment().format('YYYY')
      let month = moment().format('MM')
      let date = moment().format('DD')

      let list = JSON.parse(localStorage.getItem("list") || '[]')
      let datas = {
          [year]: {
             [month]: {
                [date]: {
                   ...arg
                }
             }
          }
      }
      
      if(arg.type == 'out') {
         state.outMoney += parseInt(arg.value)
         console.log(state.outMoney)
      }else if(arg.type == 'in') {
         state.inMoney += parseInt(arg.value)
      }

      list.unshift(datas)
      
      state.dataList = list
      localStorage.setItem("list", JSON.stringify(list))
      
      // state.outMoney = 
  }
}

export default mutations
