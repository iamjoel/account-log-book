<template>
  <div class="main p-20rem">
    {{curr}}
    <div class="summary">
      <div class="date">今日<small> {{today | time('YYYY年MM月DD日')}}</small></div>
      <div class="ly">
        <div class="lyi-f mr-10rem">支出: ￥<strong>{{outValue}}</strong> 元</div>
        <div class="lyi-f">收入: ￥<strong>{{inValue}}</strong> 元</div>
      </div>
    </div>
    <div class="ly ly-j">
      <van-button
        class="mb-10rem mr-10rem"
        type="primary"
        size="large"
        round
        @click="show('out')"
      >
        记一笔支出
      </van-button>

      <van-button
        class="mb-10rem mr-10rem"
        type="primary"
        size="large"
        round
        plain
        @click="show('in')"
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

      <choose-type 
        type="out"
        v-model="curr.classify"
        ref="chooseOutType"
      />
 
       <van-row class="m-20rem">
         <van-col span="24">
            <van-cell-group>
                <van-field
                  v-model="curr.value"
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
                  v-model="curr.comment"
                  placeholder="请输入备注">
                </van-field>
            </van-cell-group>
         </van-col>
      </van-row>
      
      <van-row class="m-20rem">
         <van-col span="24">
           <van-button size="large" type="primary" round @click="save">确认提交</van-button>
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
      
      <choose-type 
        type="in"
        v-model="curr.classify"
        ref="chooseInType"
      />

      <van-row class="m-20rem">
         <van-col span="24">
            <van-cell-group>
                <van-field
                  v-model="curr.money"
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
                  v-model="curr.comment"
                  placeholder="请输入备注">
                </van-field>
            </van-cell-group>
         </van-col>
      </van-row>

      <van-row class="m-20rem">
         <van-col span="24">
           <van-button size="large" type="primary" round @click="save">确认提交</van-button>
         </van-col>
      </van-row>

    </van-popup>

  </div>
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>