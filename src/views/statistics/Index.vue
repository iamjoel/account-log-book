<template>
  <div class="main p-20rem">
    <van-cell-group>
      <van-cell
        title="时间"
        value="本月"
        is-link
      />
    </van-cell-group>

    <van-tabs type="card" class="mt-20rem" color="#67b836">
      <van-tab title="概览" >
        <van-cell-group>
          <van-cell title="盈余" :value="surplus"/>
          <van-cell 
            title="支出" 
            :value="outMonthValue" 
            is-link
            @click="isShowOut = true"
          />
          <van-cell 
            title="收入" 
            :value="inMonthValue" 
            is-link
            @click="isShowIn = true"
          />
        </van-cell-group>
      </van-tab>
      <van-tab title="每日详情">
        <div class="ly ly-r mt-10rem">
          <a href="javascript:void(0);">明细</a>
        </div>
        <div class="mt-10rem">
          收入支出折线图
          <div>
              <!-- <canvas id="outInChart" ref="chart" width="80%" height="260"></canvas> -->
              <f2-line :charData="serverData" :id="'c1'"></f2-line>
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <van-popup v-model="isShowOut" position="right">
      <div class="full">
        <van-nav-bar
          left-text="返回"
          left-arrow
          @click-left="isShowOut=false"
        />
        <div class="mt-10rem">
          支出饼状图
        </div>
      </div>
    </van-popup>

    <van-popup v-model="isShowIn" position="right">
      <div class="full">
        <van-nav-bar
          left-text="返回"
          left-arrow
          @click-left="isShowIn=false"
        />
        <div class="mt-10rem">
          收入饼状图
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script src="./main.js">
  
</script>

<style scoped src="./style.css"></style>