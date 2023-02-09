
<script setup lang="ts">

</script>

<template>
  <div class="Worked">
    <div class="title">
      <h2>工作经历</h2>
    </div>
    <section class="content">

    </section>
  </div>
</template>

<style  lang="scss" scoped>
.Worked{
  display: flex;
  width: 100%;
  height: auto;
  justify-content: center;
  align-items: center;
  
  .title{
      background-image: url('../assets/images/school.jpg');
      background-attachment: fixed;
      background-size: 100%;
      background-clip: text;
      -webkit-background-clip: text;
      margin-top: 10vh;
    h2{
      font-size: 15vw;
      color: transparent;
      font-weight: bolder;
    }
  }
}
</style>