<template>
  <div class="flip-card">
    <div class="front">
      <slot name="front"></slot>
    </div>
    <div class="back">
      <slot name="back"></slot>
    </div>
  </div>
  
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@mixin cardshape($shadow: 0 0 10px 5px rgba($color: #000000, $alpha: 0.2)) {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: $shadow;
  padding: 20px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  row-gap: 20px;
  text-align: center;
  
}


.flip-card {
  position: relative; 
  display: inline-block;
  width: 20%;
  height: 20vw;
  perspective: 500px;
  transform-style: preserve-3d;
  transform-origin: 50% 50% 50%;
  transform: rotateY(45deg);
}

.front {
  @include cardshape;
  z-index: 2;
  backface-visibility: hidden
}

.back{
  @include cardshape(0 0 0 rgba(0,0,0,0));
  z-index: 3;
}
</style>