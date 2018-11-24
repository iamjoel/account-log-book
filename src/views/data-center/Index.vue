<template>
  <div class="main">
    <img class="cover" src="./images/cover.jpeg">
    <van-cell-group>
      <van-cell 
        icon="share"
        title="导出数据"
        is-link
        @click="exportData"
      />
      <van-cell 
        icon="close"
        title="清空数据"
        is-link
        @click="clearData"
      />
    </van-cell-group>
  </div>
</template>

<script src="./main.js">
  
</script>

<style scoped src="./style.css"></style>