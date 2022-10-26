<script setup lang="ts">
import { onMounted, ref } from 'vue'

import * as THREE from 'three'
const scene = new THREE.Scene();

// setup camera
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.x = -5
camera.position.y = 5
camera.position.z = 25
// camera.lookAt(new THREE.Vector3(0,0,0))

// setup render
const renderer = new THREE.WebGLRenderer({ 
  antialias: true, 
  alpha: false, 
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;


const generaterPlane = () => {
  const planeGeometry = new THREE.PlaneGeometry(200, 200, 320, 320);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.position.set(0, 0, -10);
  scene.add(plane);
}


const Davie = ref<THREE.Object3D>()
// 加载模型
const loadModel = () => {
  const loader = new THREE.ObjectLoader()
  loader.load(
    '/model_davie/model.json', 
    (obj)=> {
      console.log('obj', obj);
      obj.position.set(0,0,10)
      obj.scale.set(10,10,10)
      Davie.value = obj
      scene.add(obj)
    }, 
    undefined,
    (err) => {
      console.log('err', err);
    }
  )
}


// 灯光
const light = new THREE.PointLight(0xffffff, 1, 100);
const createPointLight = () => {
  light.position.set(0, 0, 0);
  light.castShadow = true; // default false
  scene.add(light);
}
 
const addHelper = () => {
  // 灯光
  const helper = new THREE.CameraHelper(light.shadow.camera);
  scene.add(helper);

  // 原点辅助
  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);
}

// 计算鼠标位置
const pointer = new THREE.Vector2();
const onPointerMove = (event: any) =>  {
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
  light.position.set(pointer.x*40 , pointer.y* 40 ,20)
}

const container = ref<HTMLElement>() 
onMounted(() => {
  (container.value as HTMLElement).appendChild(renderer.domElement);
  generaterPlane();
  createPointLight();
  loadModel();
  renderer.setAnimationLoop(() => {
    renderer.render(scene, camera)
    Davie.value && Davie.value.rotateZ(-0.001)

  })
  
  window.addEventListener('pointermove', onPointerMove);
})

</script>

<template>
  <div id="container" ref="container"></div>
</template>


<style scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>