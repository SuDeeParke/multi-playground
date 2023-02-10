
<script setup lang="ts">
import FlipCard from './FlipCard.vue';


</script>

<template>
  <div class="Worked">
    <div class="title">
      <h2>工作经历</h2>
    </div>
    <section class="content">
      <FlipCard>
        <template #front>
          <div class="front-content">
            <p class="number">1<span class="unit">year</span></p>
            <p class="desc">参加工作时常</p>
          </div>
        </template>
        <template #back>
          <div class="back-content">
            hhh
          </div>
        </template>
      </FlipCard>
      
      <div class="middle">
        <p class="number">8<span class="unit">个</span></p>
        <p class="desc">大中型项目</p>
      </div>
      <div class="right">
        <p class="number">15<span class="unit">+</span></p>
        <p class="desc">笔记数量</p>
      </div>
    </section>
  </div>
</template>

<style  lang="scss" scoped>
.Worked{
  display: flex;
  width: 100%;
  height: auto;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  
  .title{
    display: block;
    background-image: url('../assets/images/school.jpg');
    background-attachment: fixed;
    background-size: 100%;
    background-clip: text;
    -webkit-background-clip: text;
    margin-top: 10vh;
    h2{
      font-size: 10vw;
      color: transparent;
      font-weight: bolder;
    }
  }
  .content {
    display: flex;
    width: 100%;
    column-gap: 5%;
    align-items: center;
    justify-content: center;
    padding: 5%;
    perspective: 500px;
    transform-style: preserve-3d;
  }
  .front-content {
    

    .number {
      font-size: 9vw;
      font-weight: bolder;
    }

    .unit {
      margin-left: 10px;
      font-size: 2vw;
    }
  }
}
</style>