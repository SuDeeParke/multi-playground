<template>
<div class="descript-layer">
  <h1>LookAt</h1>
  <h2>The David</h2>
  <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam quam qui repudiandae vitae id necessitatibus
    possimus voluptatibus odit ab, veritatis magni illo tempora, nulla iste facilis deserunt eveniet nisi voluptates.
  </p>
</div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.descript-layer {
  position: absolute;
  top: 0;
  left: 0;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 1;
  padding-left: 100px;

  h1 {
    background-color: #000;
    color: #fff;
    padding: 5px 30px;
  }

  h2 {
    background-color: #fff;
    color: #000;
    padding: 10px 30px;
    font-size: 50px;
  }

  p {
    color: #eee;
    margin-top: 30px;
    width: 500px;
  }
}
</style>