<script setup lang="ts">

</script>

<template>
  <div class="hobby">
    <h2 class="title"><div>喜</div><div>爱</div><div>的</div><div>事</div><div>物</div></h2>
  </div>
</template>

<style lang="scss" scoped>
.hobby{
    transform-style: preserve-3d;
    perspective: 1000px;
    height: 100%;
    overflow: auto;
}
.title{
  text-align: center;
  perspective-origin: 50% 0%;
  transform: rotateY(0deg);
  transform-style: preserve-3d;
  height: 200vw;
  div{
    position: relative;
    display: inline-block;
    border: 2px solid red;
    border-radius: 10px;
    font-size: 10vh;
    margin-right: 10px;
    padding: 10px 20px;
    color: #000;
    background-color: #fff;
    z-index: 1;
  
    &::after{
      content: '';
      display: inline-block;
      position: absolute;
      bottom: -2px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: rgba($color: #000000, $alpha: 0);
      box-shadow: 0 0 10px 1px rgba($color: #000000, $alpha: 0.6);
      z-index: -1;
    }

    &:nth-of-type(1){
      transform: translateZ(-200px)  scale(1);
    }
    &:nth-of-type(2) {
      transform: translateZ(0px) scale(1.60);
    }
    &:nth-of-type(3) {
      transform: translateZ(-10px) scale(1.01);
    }
    &:nth-of-type(4) {
      transform: translateZ(-10px) scale(1.01);
    }
    &:nth-of-type(5) {
      transform: translateZ(-10px) scale(1.01);
    }
  }
}
</style>