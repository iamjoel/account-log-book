<template>
	<div class="insert m-10rem" border="false">
      <h5 class="title">常用类别</h5>
      <van-row class="types">
          <van-col span="6" v-for="item in inoutTypeValues">
             
             <van-button 
               round 
               type="default" 
               size="small"  
               class="btn" 
               :type="item.id === currTypeId ? 'primary' : 'default'" 
               @click="selectType(item.id)"
               >{{ item.name }}</van-button>

          </van-col>
      </van-row>

  </div>
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>