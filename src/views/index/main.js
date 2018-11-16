import moment from 'moment'
import ChooseType from '@/components/choose-type/'
import {inType, outType} from '../../dict.js'

var logItemTemplate = { // 每一笔记录的模板
  type: null,
  classify: {},
  value: null,
  comment: null
}

const today = moment()
const year = today.year()
const month = today.month() + 1
const day = today.date()

export default {
  components: {
    ChooseType
  },
  data() {
    return {
      today,
      isShowOut: false,
      isShowIn: false,
      outValue: 0,
      inValue: 0,
      curr: { // 当前记录的这笔
        ...logItemTemplate
      },
    }
  },
  mounted() {
    this.$store.commit('initTodayItem')
    this.updateTodayValue()
  },
  methods: {
    getTodayData() {
      var log = this.$store.state.log

      if(log && log[year] && log[year][month] && log[year][month][day]) {
        return log[year][month][day]
      } else {
        return false
      }
    },
    getTodayValue(type) {
      var todayData = this.getTodayData()
      if (!todayData) {
        return 0
      }

      var res = 0
      todayData
        .filter(item => item.type === type)
        .forEach(item => {
          var value = parseFloat(item.value)
          if(!isNaN(value)) {
            res += value
          }
        })
      return res
    },
    updateTodayValue() {
      this.outValue = this.getTodayValue('out')
      this.inValue = this.getTodayValue('in')
    },
    show(type) {
      this.curr = { // 重置之前的
        ...logItemTemplate,
        type,
        classify: type === 'in' ? inType[0] : outType[0] // 默认选中第一个
      }
      
      if(type === 'in') {
        this.isShowIn = true
      } else {
        this.isShowOut = true
      }

      // 设置组件的初始化状态
      this.$nextTick(() => {
        if(type === 'in') {
          this.$refs.chooseInType.update(this.curr.classify)
        } else {
          this.$refs.chooseOutType.update(this.curr.classify)
        }
      })
    },
    valid(item) {
      var errMsg = null
      if(!item.value) {
        errMsg = '请输入金额'
      }
      if(errMsg) {
        this.$toast(errMsg)
        return false
      } else {
        return true
      }
    },
    save() {
      if(!this.valid(this.curr)) {
        return
      }
      this.$store.commit('addItem', {
        date: today,
        payload: {...this.curr}
      })
      this.updateTodayValue()

      if(this.curr.type === 'in') {
        this.isShowIn = false
      } else {
        this.isShowOut = false
      }
    },

  }
}