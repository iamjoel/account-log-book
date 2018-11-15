<template>
  <div class="insert m-10rem" border="false">
    <h2 class="title">常用类别</h2>
    <van-row class="types">
      <van-col span="6" v-for="item in typeList" :key="item.id">
        <van-button 
          size="small"
          class="btn"
          round
          :type="item.id === selectedType.id ? 'primary' : 'default'"
          @click="select(item)"
          >
          {{item.name}}
        </van-button>
      </van-col>
    </van-row>
  </div>
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>