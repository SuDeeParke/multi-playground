<script setup lang="ts">
import MouseLight from "./components/MouseLight.vue";
import Descriplayer from "./components/Descriplayer.vue";
import Education from "./components/Education.vue";
import Worked from "./components/Worked.vue"
import Hobby from "./components/Hobby.vue";
import TweenAnimation from "./components/unuse/TweenAnimation.vue";

</script>

<template>

  <!-- <div class="group">
    <Descriplayer></Descriplayer>
    <MouseLight></MouseLight>
  </div>
  <div class="group">
    <Education></Education>
  </div>

  <div class="group">
    <Worked></Worked>
  </div>

  <Hobby></Hobby> -->


  <!-- <div class="group">
    <CarDIY></CarDIY>
  </div> -->

  <div class="group">
    <TweenAnimation></TweenAnimation>
  </div>
</template>

<style lang="scss" scoped>
.group{
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: hidden;
  overflow-x: hidden;
}

</style>

<style>
#app {
  position: relative;
  transform-style: preserve-3d;
  perspective: 1000px;
  width: 100%;
  height: 100%;
  border: 2px solid #000;
  overflow-y: auto;
}
</style>

