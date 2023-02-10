<script setup lang="ts">
import MouseLight from "./components/MouseLight.vue";
import Descriplayer from "./components/Descriplayer.vue";
import Education from "./components/Education.vue";
import Worked from "./components/Worked.vue"
</script>

<template>

  <div class="group">
    <Descriplayer></Descriplayer>
    <MouseLight></MouseLight>
  </div>
  <div class="group">
    <Education></Education>
  </div>

  <div class="group">
    <Worked></Worked>
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
  overflow-y: hidden;
  overflow-x: hidden;
}
.group-extend {
  height: auto;
  overflow-y: unset;
}
</style>

