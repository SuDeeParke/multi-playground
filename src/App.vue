<script setup lang="ts">
import MouseLight from "./components/MouseLight.vue";
import Descriplayer from "./components/Descriplayer.vue";
import FlipClock from "./components/FlipClock.vue";
import FlipNum from "./components/FlipNum.vue";
import CarDIY from "./components/CarDIY.vue";
</script>

<template>

  <div class="group">
    <Descriplayer></Descriplayer>
    <MouseLight></MouseLight>
  </div>


  <!-- <div class="group">
    <CarDIY></CarDIY>
  </div> -->

</template>

<style lang="scss" scoped>
.group{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
