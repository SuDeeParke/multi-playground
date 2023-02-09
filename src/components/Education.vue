
<script setup lang="ts">
import school from '@/assets/images/school.jpg'
</script>

<template>
  <section class="education">
    <div class="description">
      <h1>教育经历</h1>
      <h2>毕业于广西科技大学</h2>
      <p>
        大学坐落在螺蛳粉的故乡，它是一所本科院校。主修软件工程。
      </p>
      <p>
        主要课程有Web开发，软件工程导论，面向对象程序设计。
      </p>
    </div>
    <!-- <img :src="school" alt=""> -->
  </section>
</template>


<style  lang="scss" scoped>
.education {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-image: url('../assets/images/school.jpg');
  background-attachment: fixed;
  background-size: 100%;
  background-repeat: no-repeat;
  background-clip: content-box;
  .description {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    width: 100%;
    height: 100%;
    padding: 25px;
    z-index: 1;
    background-color: rgba($color: #000, $alpha: 0.2);
    backdrop-filter: blur(2px);
    -webkit-backdrop-filter: blur(5px);
    // background-image: linear-gradient(to bottom, rgba(0,0,0, 0.7) 0%, rgba(0, 0, 0, 0) 100%);
    color: #fff;
    h1{
      background-color: #000;
      color: #fff;
      padding: 5px 30px;
    }
    h2{
      background-color: #fff;
      color: #000;
      padding: 10px 30px;
      font-size: 50px;
    }
    p{
      margin-top: 20px;
    }
  }
}
</style>