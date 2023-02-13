<template>
<div class="descript-layer">
  <h1>Hello, Welcome!</h1>
  <h2>欢迎来到我的个人网站</h2>
  <p>
    姑且把这里当作我的在线简历吧。我将这做一个简单的介绍。
    同时我也会在这里展示一些我日常做的小玩意~
  </p>
  <p>
    Let's take this as my online resume. I will make a brief introduction. At the same time, I will show some of my daily
    demo here.
  </p> 
  <p class="right">® sudongpeng</p>
</div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.descript-layer {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 1;
  padding-left: 100px;

  h1 {
    background-color: #000;
    color: #fff;
    padding: 5px 30px;
    
  }
  
  h2 {
    background-color: #fff;
    color: #000;
    padding: 10px 30px;
    font-size: 50px;
  }

  p {
    color: #eee;
    margin-top: 30px;
    width: 500px;
  }
  p.right{
    text-align: right;
  }
}
</style>