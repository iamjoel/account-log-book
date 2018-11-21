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
          <van-cell title="盈余" :value="surplus + '元'"/>
          <van-cell 
            title="支出" 
            :value="outMonthValue + '元'" 
            is-link
            @click="showClassifyType('out')"
          />
          <van-cell 
            title="收入" 
            :value="inMonthValue + '元'" 
            is-link
            @click="showClassifyType('in')"
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
              <!-- <f2-line :charData="serverData" :id="'c1'"></f2-line> -->
          </div>
        </div>
      </van-tab>
    </van-tabs>

    <van-popup v-model="isShowOut" position="right">
      <div class="full">
        <van-nav-bar
          left-arrow
          title="支出"
          @click-left="isShowOut=false"
        />
        <div class="chart-wrapper mt-10rem">
          <canvas id="out-classify-chart"></canvas>
        </div>
      </div>
    </van-popup>

    <van-popup v-model="isShowIn" position="right">
      <div class="full">
        <van-nav-bar
          left-arrow
          title="收入"
          @click-left="isShowIn=false"
        />
        <div class="chart-wrapper mt-10rem">
          <canvas id="in-classify-chart"></canvas>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script src="./main.js">
  
</script>

<style scoped src="./style.css"></style>