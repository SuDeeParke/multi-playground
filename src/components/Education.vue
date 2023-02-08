
<script setup lang="ts">
import school from '@/assets/images/school.jpg'
</script>

<template>
  <section class="education">
    <div class="description">
      <h2>教育经历</h2>
      <p>
        毕业于广西科技大学，大学坐落在螺蛳粉的故乡，它是一所本科院校。主修软件工程。主要课程有Web开发，软件工程导论，面向对象程序设计。
      </p>
    </div>
    <img :src="school" alt="">
  </section>
</template>


<style  lang="scss" scoped>
.education {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  .description {
    position: relative;
    width: 50%;
    height: auto;
    padding: 25px;
    z-index: -1;
    background-color: rgba($color: #000000, $alpha: 0.6);
    // background-image: linear-gradient(to bottom, rgba(0,0,0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
    color: #fff;
  }
  img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    z-index: -2;
  }
}
</style>