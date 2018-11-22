<template>
  <div class="statistics-page main p-20rem">
    <van-cell-group>
      <van-cell
        title="时间"
        :value="activeDateLabel"
        is-link
        @click="isShowSelectTime = true"
      />
    </van-cell-group>
    <van-popup v-model="isShowSelectTime" position="bottom">
      <van-picker
        show-toolbar
        title="时间"
        :columns="['本月', '上月']"
        @cancel="isShowSelectTime = false"
        @confirm="selectTimeChange"
      />
    </van-popup>

    <van-tabs 
      @change="dataViewChange"
      v-model="activeDataViewIndex"
      type="card" class="mt-20rem" color="#67b836"
    >
      <van-tab title="概览" >
        <van-cell-group class="mt-15rem">
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
          <van-button 
            type="primary" 
            plain
            size="mini"
            @click="isShowDetail = true"
          >
            明细
          </van-button>
          <van-popup v-model="isShowDetail" position="right">
            <div class="full">
              <van-nav-bar
                left-arrow
                :title="activeDateLabel + '明细'"
                @click-left="isShowDetail=false"
              />
              <table class="table">
                <thead>
                  <th>日期</th>
                  <th>金额</th>
                  <th>类别</th>
                  <th>注释</th>
                </thead>
                <tbody>
                  <tr v-for="(item, i) in activeMonthPlainData" :key="i">
                    <td>{{padZero(item.day)}}</td>
                    <td
                      :class="[item.type === 'in' ? 'green' : 'red']"
                    >
                      {{(item.type === 'in' ? '+' : '-') + item.value}}
                    </td>
                    <td>{{item.classify.name}}</td>
                    <td>{{item.comment}}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </van-popup>
        </div>
        <div class="chart-wrapper">
          <canvas id="detail-chart"></canvas>
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
        <div class="chart-wrapper">
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
        <div class="chart-wrapper">
          <canvas id="in-classify-chart"></canvas>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script src="./main.js"></script>
<style>
  .statistics-page .van-tabs__nav--card {
    margin: 0;
  }
</style>
<style scoped src="./style.css"></style>