<template>
  <div class="main p-20rem">
    <div class="summary">
      <div class="date">今日<small> {{today}}</small></div>
      <div class="ly">
        <div class="lyi-f mr-10rem">支出: ￥<strong>{{getTodayOut}}</strong> 元</div>
        <div class="lyi-f">收入: ￥<strong>{{getTodayIn}}</strong> 元</div>
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
          记一笔支出
        </van-button>

        <van-button
        class="mb-10rem mr-10rem"
        type="primary"
        size="large"
        round
        plain
        @click="isShowIn=true"
        >
          记一笔收入
        </van-button>
    </div>
    
    <!-- 支出弹出 -->
    <van-popup v-model="isShowOut" position="top">
       <van-nav-bar
         left-text="返回"
         left-arrow
         @click-left="isShowOut=false"
       />
       <radio-button :inout-type="'1'" v-model="typeValue" />

       <van-row class="m-20rem">
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

      <van-row class="m-20rem">
         <van-col span="24">
            <van-cell-group>
                <van-field
                  v-model="comment"
                  placeholder="请输入备注">
                </van-field>
            </van-cell-group>
         </van-col>
      </van-row>
      
      <van-row class="m-20rem">
         <van-col span="24">
           <van-button size="large" type="primary" round @click="outInSubmit(1)">确认提交</van-button>
         </van-col>
      </van-row>

    </van-popup>

    <!-- 收入弹出 -->
    <van-popup v-model="isShowIn" position="top">
       <van-nav-bar
         left-text="返回"
         left-arrow
         @click-left="isShowIn=false"
       />
       <radio-button :inout-type="'2'" v-model="typeValue" />

       <van-row class="m-20rem">
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
      
      <van-row class="m-20rem">
         <van-col span="24">
            <van-cell-group>
                <van-field
                  v-model="comment"
                  placeholder="请输入备注">
                </van-field>
            </van-cell-group>
         </van-col>
      </van-row>

      <van-row class="m-20rem">
         <van-col span="24">
           <van-button size="large" type="primary" round @click="outInSubmit(2)">确认提交</van-button>
         </van-col>
      </van-row>

    </van-popup>

  </div>
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>