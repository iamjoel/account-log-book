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
        @click="popShow('outType')"
        >
          记一笔支出
        </van-button>

        <van-button
        class="mb-10rem mr-10rem"
        type="primary"
        size="large"
        round
        plain
        @click="popShow('inType')"
        >
          记一笔收入
        </van-button>
    </div>
    

    <van-popup v-model="isShow" position="top">
       <van-nav-bar
         left-text="返回"
         left-arrow
         @click-left="isShow=false"
       />
       <in-value :popType="popType" />
    </van-popup>

    
    <!-- <van-popup v-model="isShowIn" position="top">
      <van-nav-bar
        left-text="返回"
        left-arrow
        @click-left="isShowIn=false"
      /> -->
      <!-- <div class="m-10rem">
        <van-row>
           <van-col span="11">
              <van-cell-group>
                 <van-field
                   v-model="inInput"
                   placeholder="请选择收入类型"
                   @click="pickerInShow" />
              </van-cell-group>
           </van-col>

           <van-col span="10" offset="1">
              <van-cell-group>
                  <van-field
                    v-model="inMoney"
                    placeholder="请输入收入金额">
                    <div slot="button">元</div>
                  </van-field>
              </van-cell-group>
              
           </van-col>
        </van-row>

        <van-row class="mt-20rem">
           <van-col span="24">
             <van-button size="large" type="primary" round @click="inSubmit">确认提交</van-button>
           </van-col>
        </van-row>
      </div> -->
    <!-- </van-popup> -->
  </div>
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>