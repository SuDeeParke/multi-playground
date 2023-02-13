<template>
  <div class="op-wrap">
    <div class="flip-card">
      <div class="front">
        <slot name="front"></slot>
      </div>
      <div class="back">
        <slot name="back"></slot>
      </div>
    </div>
  </div>
  
  
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
@mixin cardshape($shadow: 0 0 10px 0px  rgba($color: #000000, $alpha: 0.2)) {
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
.op-wrap{
  width: 20%;
  height: 20vw;
  cursor: pointer;
  perspective: 500px;
  .flip-card {
      position: relative;
      display: inline-block;
      width: 100%;
      height: 100%;
      transform-origin: 50% 50% 50%;
      transform-style: preserve-3d;
      transform: rotateY(0);
      transition: all 0.3s;
  }
  &:hover {
    .flip-card{
      transform: rotateY(180deg);
    }
  }
}



.front {
  @include cardshape;
  z-index: 1;
}

.back{
  @include cardshape(0 0 0 rgba(0,0,0,0));
  transform:  translateZ(-1px) rotateY(180deg);
  z-index: 1;
}
</style>