<template>
  <div id="app">
    <div class="main">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="activeTypeIndex" v-show="$store.state.isShowFooter">
      <van-tabbar-item icon="edit" url="#/">记一笔</van-tabbar-item>
      <van-tabbar-item icon="exchange-record" url="#/statistics">统计</van-tabbar-item>
      <van-tabbar-item icon="share" @click="_export">导出</van-tabbar-item>
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
      data: [
        ["日期", "收入或支出的类型", "类型", "金额", "备注"],      
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
    this.getLogData()
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
    getLogData() {
       let dataArrays = []
       let logData = this.$store.state.log

       if(logData) {
           for(let year in logData) {
              for(let month in logData[year]) {
                 for(let day in logData[year][month]) {
                    let date = year + '-' + month + '-' + day
                    let type, classify, value, comment, oneArray;
                    
                    logData[year][month][day]
                       .forEach(item => {
                          type = item.type
                          classify = item.classify.name
                          value = item.value
                          comment = item.comment
                          oneArray = [date, type, classify, value, comment]
    
                          dataArrays.push(oneArray)
                       })    
                 }
              }
           }
       }
       this.data.push(...dataArrays)
    },
    
    _export(evt) {
      const ws = XLSX.utils.aoa_to_sheet(this.data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      XLSX.writeFile(wb, "个人帐单.xlsx");
    },
    
  }
};


</script>
<style src="@/assets/vendor/reset.css"></style>
<style src="css-utils-collection"></style>
<style src="@/assets/common.css"></style>
<style scoped>
  .main {
    padding-bottom: 40px;
  }
</style>

