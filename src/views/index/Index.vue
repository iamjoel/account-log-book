<template>
  <div class="main p-20rem">
    <div class="summary">
      <div class="date">今日<small> {{today}}</small></div>
      <div class="ly">
        <div class="lyi-f mr-10rem">支出: ￥<strong>34</strong> 元</div>
        <div class="lyi-f">收入: ￥<strong>34</strong> 元</div>
      </div>
    </div>
    <div class="ly ly-j">
      <van-button
        class="mb-10rem mr-10rem"
        type="primary"
        size="large"
        round
        @click="isShowOut=true"
        >
          记一比支出
        </van-button>

        <van-button
        class="mb-10rem mr-10rem"
        type="primary"
        size="large"
        round
        plain
        @click="isShowIn=true"
        >
          记一比收入
        </van-button>
    </div>
    

    <van-popup v-model="isShowOut" position="top">
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="isShowOut=false"
      />
      <div class="mt-10rem">
        支出内容
      </div>
    </van-popup>

    <van-popup v-model="isShowIn" position="top">
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="isShowIn=false"
      />
      <div class="mt-10rem">
        收入内容
      </div>
    </van-popup>
  </div>
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>