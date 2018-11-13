<template>
	<div class="insert m-10rem" border="false">
      <h5 class="title">常用类别</h5>
      <van-row class="types">
          <van-col span="6" v-for="(item,index) in payinTypes">
             <van-button round type="default" size="small" ref="typeName" class="btn" @click="selectType(index)">{{ item }}</van-button>
          </van-col>
      </van-row>

      <van-row>
         <van-col span="24">
            <van-cell-group>
                <van-field
                  v-model="money"
                  placeholder="请输入收入金额">
                  <div slot="button">元</div>
                </van-field>
            </van-cell-group>
         </van-col>
      </van-row>

      <van-row class="mt-20rem">
         <van-col span="24">
           <van-button size="large" type="primary" round @click="payinSub">确认提交</van-button>
         </van-col>
      </van-row>
  </div>
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>