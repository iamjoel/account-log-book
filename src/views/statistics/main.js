import moment from 'moment'
import F2 from '@antv/f2'
import F2Line from '@/components/line-chart/index.vue'
import {getPlainMonthData, getMonthValue} from '@/assets/utils/log-data-utils'

const ym = moment()
const year = ym.year()
const month = ym.month() + 1
const day = ym.date()

var curMonthDay = []
for(let i = 1; i < (day + 1); i++) {
  curMonthDay.push(i)
}

export default {
  components: {
      'f2-line': F2Line
  },
  data() {
    return {
      isShowOut: false,
      isShowIn: false,
      currDate: moment(),
      prevMonthDate: moment().add('month', -1),
      activeDate: moment(), // 当前统计是时间
      outMonthValue: 0,
      inMonthValue: 0,
      everydayOutValue: [],
      everydayInValue: [],
      serverData: []
    }
  },
  computed: {
    surplus() { // 盈余
      var res = this.inMonthValue - this.outMonthValue
      if(res > 0) {
        res = '+' + res
      }
      return res
    }
  },
  mounted() {
    this.updateSummary() // 收入，支出的概览
    this.updateEverydayValue() 
    this.$nextTick(() => {
       this.getChart()
    })
  },
  methods: {
    getChart() {
    var outInChart = this.$refs.chart;
    var aa = document.getElementById("#outInChart")
    console.log(aa)
    if (!outInChart){console.log("空空")}
    const chart = new F2.Chart({
          id: 'outInChart',
          pixelRatio: window.devicePixelRatio // 指定分辨率
        });

        chart.source(this.everydayOutValue);
        chart.line().position('release*count');
        chart.point().position('release*count').style({
          lineWidth: 1,
          stroke: '#fff'
        });
        
        chart.render();
    },
    getEverydayData() {
    var log = this.$store.state.log
    if(log && log[year] && log[year][month]) {
    return log[year][month]
    } else {
    return false
    }
    },
    getEverydayValue(type) {
    const f2OutData = []
        const f2InData = []

    var everdayData = this.getEverydayData()
    curMonthDay.forEach(i => {
            var res = 0
            if(everdayData[i]) {
              everdayData[i]
              .filter(item => item.type === type)
              .forEach(item => {
              res += item.value
              })
            }
            let oneData = {
              day: i+'日', 
              sum: res
            }
            type === 'out' ? f2OutData.push(oneData) : f2InData.push(oneData)
    })
        this.everydayOutValue = f2OutData
        this.everydayInValue = f2InData
        this.serverData = f2InData
    },
    updateEverydayValue() {
        this.getEverydayValue('out')
        this.getEverydayValue('in')
    },
    updateSummary() {
      var year = this.activeDate.year()
      var month = this.activeDate.month() + 1
      var monthPlainData = getPlainMonthData(this.$store.state.log, year, month)
      this.outMonthValue = getMonthValue(monthPlainData, 'out')
      this.inMonthValue = getMonthValue(monthPlainData, 'in')
    }
  }
}