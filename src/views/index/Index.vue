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
      <van-button type="primary" size="large" round class="mb-10rem mr-10rem">记一比支出</van-button>
      <van-button type="primary" size="large" round plain>记一比收入</van-button>
    </div>
    
  </div>
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>