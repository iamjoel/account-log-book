<template>
  <div id="app">
    <div class="main">
      <router-view></router-view>
    </div>
    <van-tabbar v-model="activeTypeIndex" v-show="$store.state.isShowFooter">
      <van-tabbar-item icon="edit" url="#/">记一笔</van-tabbar-item>
      <van-tabbar-item icon="exchange-record" url="#/statistics">统计</van-tabbar-item>
      <van-tabbar-item icon="share" @click="$toast('开发中')">导出</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import {urls} from '@/setting'
import * as types from '@/store/mutation-types'

export default {
  name: 'app',
  data() {
    return {
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
    }
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

