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
      console.log(datas)
      if(arg.type == 1) {
         state.outMoney += parseInt(arg.value)
      }else if(arg.type == 1) {
         state.inMoney += parseInt(arg.value)
      }

      list.unshift(datas)

      state.dataList = list
      localStorage.setItem("list", JSON.stringify(list))
      
      // state.outMoney = 
  }
}

export default mutations
