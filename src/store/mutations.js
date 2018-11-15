import * as types from './mutation-types'
import moment from 'moment'

const mutations = {
  [types.CHANGE_ACTIVE_TYPE](state, type) {
    state.activeTypeIndex = type
  },
  [types.CHANGE_FOOTER_VISIBLE](state, isShow) {
    state.isShowFooter = isShow
  },
  addItem (state, data) {// 加一笔
    var {date, payload} = data

    const year = date.year()
    const month = date.month() + 1
    const day = date.date()

    let log = state.log

    if(!log[year]) {
      log[year] = {}
    }

    if(!log[year][month]) {
      log[year][month] = {}
    }

    if(!log[year][month][day]) {
      log[year][month][day] = []
    }

    log[year][month][day].push(payload)
    localStorage.setItem('log', JSON.stringify(log)) // 同步
  }
}

export default mutations
