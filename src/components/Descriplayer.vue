<template>
<div class="descript-layer">
  <h1>Hello, Welcome!</h1>
  <h2>欢迎来到我的个人网站</h2>
  <p>
    网站是临时搭建的, 这里展示了我个人的一些作品。主要是过往开发的一些小demo, 源码我会放在github上。
  </p>
  <p>
    The page is a temporary project, show those demo that created by me. I will post the source code on github. There are
    several links for you to check.
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