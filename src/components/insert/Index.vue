<template>
	<div class="insert m-10rem">
      <van-row>
           <van-col span="11">
              <van-cell-group>
                 <van-field
                   placeholder="请选择支出类型"
                    />
              </van-cell-group>
             
           </van-col>

           <van-col span="10" offset="1">
              <van-cell-group>
                  <van-field
                    placeholder="请输入支出金额">
                    <div slot="button">元</div>
                  </van-field>
              </van-cell-group>
              
           </van-col>
        </van-row>

        <van-row class="mt-20rem">
           <van-col span="24">
             <van-button size="large" type="primary" round >确认提交</van-button>
           </van-col>
        </van-row>

        <!-- <van-popup v-model="pickerisShow" position="bottom">
           <van-picker :columns="payTypes" @change="onChange" />
       </van-popup> -->
  </div>
</template>

<script src="./main.js"></script>

<!-- <style scoped src="./style.css"></style> -->