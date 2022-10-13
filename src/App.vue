<script setup lang="ts">
import MouseLight from "./components/MouseLight.vue";
import Descriplayer from "./components/Descriplayer.vue";
import FlipClock from "./components/FlipClock.vue";
</script>

<template>
  <div class="group">
    <FlipClock></FlipClock>
  </div>

  <!-- <div class="group">
    <Des criplayer></Des>
    <MouseLight></MouseLight>
  </div> -->
</template>

<style lang="scss" scoped>
.group{
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
