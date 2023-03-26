<script setup lang="ts">

</script>

<template>
    <h2 class="title"><div>喜</div><div>爱</div><div>的</div><div>事</div><div>物</div></h2>
</template>

<style lang="scss" scoped>
.title{
  position: relative;
  text-align: center;
  perspective-origin: 50% 0%;
  transform: rotateY(0deg);
  transform-style: preserve-3d;
  height: 90%;
  top: 50%;
  div{
    position: relative;
    display: inline-block;
    border-radius: 10px;
    font-size: 10vh;
    margin-right: 10px;
    padding: 10px 20px;
    color: #000;
    background-color: rgba($color: #000000, $alpha: 0);
    z-index: 1;
    text-shadow: 0 0 10px rgba($color: #000000, $alpha: 0.3);
    &:nth-of-type(1){
      transform: translateZ(-100px) scale(1.9);
    }
    &:nth-of-type(2) {
      transform: translateZ(-350px) scale(1);
    }
    &:nth-of-type(3) {
      transform: translateZ(-50px) scale(1);
    }
    &:nth-of-type(4) {
      transform: translateZ(100px) scale(1.3);
    }
    &:nth-of-type(5) {
      transform: translateZ(-10px) scale(1.01);
    }
  }
}
</style>