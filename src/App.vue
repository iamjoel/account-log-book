<template>
  <div id="app">
    <div class="main">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="activeTypeIndex" v-show="$store.state.isShowFooter">
      <van-tabbar-item icon="edit" url="#/">记一笔</van-tabbar-item>
      <van-tabbar-item icon="exchange-record" url="#/statistics">统计</van-tabbar-item>
      <van-tabbar-item icon="share" @click="exportData">导出</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {urls} from '@/setting'
import * as types from '@/store/mutation-types'
import XLSX from 'xlsx'; //导出EXCEL库

export default {
  name: 'app',
  data() {
    return {
      allLogData: [
        
      ],
    }
  },
  computed: {
    activeTypeIndex: {
      get() {
        return this.$store.state.activeTypeIndex
      },
      set(val) {
        this.$store.dispatch('changeActiveType', parseInt(val, 0))
      }
    },
    header() {
      var res = {...this.$route.meta} || {}
      res.isShow = !!res.title
      return res
    },
  },
  watch: {
    // 控制底部Tab的高亮，和消隐
    ['$route.path']() {
      this.pathChange()
    }
  },
  mounted() {
    this.pathChange()
  },
  methods: {
    pathChange() {
      var meta = this.$route.meta || {}

      document.title = meta.title || ''

      if(meta.isShowFooter === undefined) {
        meta.isShowFooter = true
      }
      this.$store.dispatch('changeFooterVisible', meta.isShowFooter)

      if(meta.isShowFooter) {
        document.body.classList.remove('no-foot-tabbar')
      } else {
        document.body.classList.add('no-foot-tabbar')
      }

      if(meta.activeTypeIndex !== undefined) {
        this.$store.dispatch('changeActiveType', parseInt(meta.activeTypeIndex, 10))
      }
    },
    exportData() {
      const wb = XLSX.utils.book_new();
      let logData = this.$store.state.log

      if(logData) {
        for(let year in logData) {
          for(let month in logData[year]) {
            let monthData = []
            let sheetName = `${year}年${padZero(month)}月`
            var total = 0
            var inTotal = 0
            var outTotal = 0
            for(let day in logData[year][month]) {
              logData[year][month][day].forEach(item => {
                let value
                if(item.type === 'in') {
                  value = `+${item.value}`
                  total += item.value
                  inTotal += item.value
                } else {
                  value = `-${item.value}`
                  total -= item.value
                  outTotal += item.value
                }
                monthData.push([
                  padZero(day),
                  value,
                  item.classify.name,
                  item.comment
                ])
              })
            }
            
            const ws = XLSX.utils.aoa_to_sheet([
                ['盈余', total],
                ['支出', outTotal],
                ['收入', inTotal],
                [],// 空行
                ["日期", "金额", "费用类型",  "备注"],
                ...monthData,
            ]);

            XLSX.utils.book_append_sheet(wb, ws, sheetName);
          }
        }
      }
      XLSX.writeFile(wb, "个人帐单.xlsx");
      
    },
  }
}

function padZero(number) {
  return parseInt(number, 10) < 10 ? ('0' + number) : number
}

</script>
<style src="@/assets/vendor/reset.css"></style>
<style src="css-utils-collection"></style>
<style src="@/assets/common.css"></style>
<style scoped>
  .main {
    padding-bottom: 40px;
  }
</style>

