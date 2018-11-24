import * as types from './mutation-types'
import moment from 'moment'

const mutations = {
  [types.CHANGE_ACTIVE_TYPE](state, type) {
    state.activeTypeIndex = type
  },
  [types.CHANGE_FOOTER_VISIBLE](state, isShow) {
    state.isShowFooter = isShow
  },
  initTodayItem(state) {
    var today = new moment()
    const year = today.year()
    const month = today.month() + 1
    const day = today.date()

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
  },
  addItem (state, data) {// 加一笔
    var {date, payload} = data
    let log = state.log

    const year = date.year()
    const month = date.month() + 1
    const day = date.date()

    log[year][month][day].push(payload)
    localStorage.setItem('log', JSON.stringify(log)) // 同步
  },
  clearData(state) {
    state.log = {}
    localStorage.setItem('log', JSON.stringify({})) // 同步
  }
}

export default mutations
