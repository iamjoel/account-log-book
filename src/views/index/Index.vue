<template>
  <div class="main p-20rem">
    <div class="summary">
      <div class="date">今日<small> {{today | time('YYYY年MM月DD日')}}</small></div>
      <div class="ly">
        <div class="lyi-f ly ly-j ly-m mr-20rem">
          <span>支出:</span> 
          <span class="ly ly-m">￥<strong>{{outValue}}</strong> 元</span>
        </div>
        <div class="lyi-f ly ly-j ly-m">
          <span>收入:</span>
          <span class="ly ly-m">￥<strong>{{inValue}}</strong> 元</span>
        </div>
      </div>
    </div>
    <div class="ly ly-j mt-10rem">
      <van-button
        class="mb-10rem mr-20rem op-btn"
        type="primary"
        size="large"
        round
        @click="show('out')"
      >
        记一笔支出
      </van-button>

      <van-button
        class="mb-10rem op-btn"
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
        title="记一笔支出"
        left-arrow
        @click-left="isShowOut=false"
      />
      
      <div class="mh-20">
        <h2 class="title">类别</h2>
        <choose-type 
          type="out"
          v-model="curr.classify"
          ref="chooseOutType"
        />
      </div>
      
      <div class="mh-20">
        <h2 class="title">金额</h2>
          <van-field
            v-model.number="curr.value"
            placeholder="请输入金额"
            type="number"
            required
          >
            <div slot="button">元</div>
          </van-field>
      </div>
      
      <div class="mh-20">
        <h2 class="title">备注</h2>
          <van-field
            v-model="curr.comment"
            type="textarea"
            placeholder="请输入备注"
          >
          </van-field>
      </div>
      
      <div class="m-20 ly">
        <van-button size="large"  round @click="isShowOut=false" class="mr-10rem">取消</van-button>
        <van-button size="large" type="primary" round @click="save">保存</van-button>
      </div>
    </van-popup>

    <!-- 收入弹出 -->
    <van-popup v-model="isShowIn" position="top">
      <van-nav-bar
        title="记一笔收入"
        left-arrow
        @click-left="isShowIn=false"
      />
      
      <div class="mh-20">
        <h2 class="title">类别</h2>
        <choose-type 
          type="in"
          v-model="curr.classify"
          ref="chooseInType"
        />
      </div>
      
      <div class="mh-20">
        <h2 class="title">金额</h2>
          <van-field
            v-model.number="curr.value"
            placeholder="请输入金额"
            type="number"
            required
          >
            <div slot="button">元</div>
          </van-field>
      </div>
      
      <div class="mh-20">
        <h2 class="title">备注</h2>
          <van-field
            v-model="curr.comment"
            type="textarea"
            placeholder="请输入备注"
          >
          </van-field>
      </div>
      
      <div class="m-20 ly">
        <van-button size="large"  round @click="isShowIn=false" class="mr-10rem">取消</van-button>
        <van-button size="large" type="primary" round @click="save">保存</van-button>
      </div>
    </van-popup>

  </div>
</template>

<script src="./main.js"></script>

<style scoped src="./style.css"></style>