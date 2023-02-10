<template>
  <div class="flip-clock">
    <div class="hour" ref="number">
      <div class="top"></div>
      <div class="top_part"></div>
      <div class="bottom"></div>
      <div class="bottom_part"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const count = ref(1);

const flipAnimation = (parts: HTMLCollection | undefined, value: number) => {
  if(parts) {
    (parts[0] as HTMLElement).innerText = value.toString();
    (parts[1] as HTMLElement).innerText = (value + 1).toString();
    (parts[2] as HTMLElement).innerText = value.toString();
    (parts[3] as HTMLElement).innerText = (value + 1).toString();
    setTimeout(() => {
      // 控制动画
      (parts[1] as HTMLElement).style.transition = 'all 1s linear 1s';
      (parts[1] as HTMLElement).style.transform = "rotateX(0deg)";
      (parts[2] as HTMLElement).style.transition = 'all 1s linear 0s';
      (parts[2] as HTMLElement).style.transform = "rotateX(90deg)";

    }, 1000)
    setTimeout(() => {
      (parts[0] as HTMLElement).innerText = `${parseInt((parts[0] as HTMLElement).innerText) + 1}`;
      (parts[1] as HTMLElement).style.transition = 'all 0s linear 0s';
      (parts[1] as HTMLElement).style.transform = "rotateX(-90deg)";
      (parts[1] as HTMLElement).innerText = `${parseInt((parts[1] as HTMLElement).innerText) + 1}`;
      (parts[2] as HTMLElement).style.transition = 'all 0s linear 0s';
      (parts[2] as HTMLElement).style.transform = "rotateX(0deg)";
      (parts[2] as HTMLElement).innerText = `${parseInt((parts[2] as HTMLElement).innerText) + 1}`;
      (parts[3] as HTMLElement).innerText = `${parseInt((parts[3] as HTMLElement).innerText) + 1}`;

    }, 3000)
  }
 
}

const number = ref<HTMLElement>();
onMounted(() => {

  setInterval(() => {
    flipAnimation(number.value && number.value.children, count.value ++)
  }, 3000)
})


</script>

<style lang="scss" scoped>
$bgColor:  #3b3e3b;

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
      transform: rotateX(0deg);
      border-bottom: 2px solid $bgColor;
    }

    .top_part {
      @include flipStyle();
      top: 0;
      background-color: darkgoldenrod;
      z-index: 1;
      line-height: 10rem;
      transform-origin: bottom;
      transform: rotateX(-90deg);
      border-bottom: 2px solid $bgColor;
    }

    .bottom {
      @include flipStyle();
      top: 50%;
      background-color: darkgreen;
      z-index: 2;
      line-height: 0;
      transform-origin: top;
      transform: rotateX(0deg);
      border-top: 2px solid $bgColor;
    }

    .bottom_part {
      @include flipStyle();
      top: 50%;
      background-color: darkgreen;
      line-height: 0;
      transform-origin: top;
      transform: rotateX(0deg);
      border-top: 2px solid $bgColor;
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