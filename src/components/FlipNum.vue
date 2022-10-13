<template>
  <div class="flip-numb">
    <div class="num-group" ref="numbGroup">
      <div class="top">{{ count }}</div>
      <div class="top_next">{{ count + 1 }}</div>
      <div class="bottom">{{ count }}</div>
      <div class="bottom_next">{{ count + 1  }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
const count = ref(0)


</script>

<style lang="scss" scoped>
$bgColor: #3b3e3b;

@mixin flipStyle() {
  position: absolute;
  width: 100%;
  height: 50%;
  color: #eee;
  background-color: $bgColor;
  text-align: center;
  font-size: 10rem;
  font-weight: bold;
  overflow: hidden;
  transform-style: preserve-3d;
}

.flip-clock {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #eee;

  .hour {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 10rem;
    height: 10rem;
    background-color: $bgColor;
    border: none;
    border-radius: 1rem;
    transition: all 0.4s ease-in;
    box-shadow: 0.4rem 0.4rem 0.6rem #00000040;
    color: #eee;
    font-size: 10rem;
    font-weight: bold;
    z-index: 0;
    perspective: 16rem;
    transform-style: preserve-3d;
    transform: rotateY(0deg) translateZ(100px);

    .top {
      @include flipStyle();
      top: 0;
      background-color: darkgoldenrod;
      z-index: 1;
      line-height: 10rem;
      transform-origin: bottom;
      border-bottom: 2px solid $bgColor;
      transform: rotateX(0deg);
    }

    .top_next {
      @include flipStyle();
      top: 0;
      background-color: darkgoldenrod;
      z-index: 1;
      line-height: 10rem;
      transform-origin: bottom;
      border-bottom: 2px solid $bgColor;
      transform: rotateX(-90deg);
    }

    .bottom {
      @include flipStyle();
      top: 50%;
      background-color: darkgreen;
      z-index: 2;
      line-height: 0;
      transform-origin: top;
      border-top: 2px solid $bgColor;
      transform: rotateX(0deg);
    }

    .bottom_next {
      @include flipStyle();
      top: 50%;
      background-color: darkgreen;
      line-height: 0;
      transform-origin: top;
      border-top: 2px solid $bgColor;
      transform: rotateX(0deg);
    }
  }
}

@keyframes ani_top {
  0% {
    transform: rotateX(0deg);
  }

  100% {
    transform: rotateX(90deg);
  }
}

.deg-positive {
  transform: rotateX(90deg);
}

.deg-negative {
  transform: rotateX(-90deg);
}

@keyframes ani_top_part {
  0% {
    transform: rotateX(-90deg);
  }

  100% {
    transform: rotateX(0deg);
  }
}

@keyframes ani_bottom {
  0% {
    transform: rotateX(0deg);
  }

  100% {
    transform: rotateX(90deg);
  }
}

@keyframes ani_bottom_part {
  0% {
    transform: rotateX(-90deg);
  }

  100% {
    transform: rotateX(0deg);
  }
}
</style>