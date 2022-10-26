<template>
  <div class="UI">
    <ul>
      <li>
        <button>车身</button>
        <div class="colors">
          <span v-for="(item, index) in COLORs" :style="{ 'background-color': item }" @click="changeColor(item)"></span>
        </div>
      </li>
    </ul>
  </div>
  <div class="car-diy" ref="container"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const CAR = ref();
const BODY_COLOR = ref<THREE.Mesh>();
const WHEEL_COLOR = ref<THREE.Mesh>();
const BRACK_COLOR = ref<THREE.Mesh>();

const COLORs = ['#eff5f9', '#000000', '#252625', '#5e131d', '#8b7a82','#00194b']

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa)
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.x = 40
camera.position.y = 40
camera.position.z = 25
camera.lookAt(new THREE.Vector3(0,0,0))

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const controls = new OrbitControls(camera, renderer.domElement)


const addLight = () => {
  const light = new THREE.AmbientLight(0xf3f3f3, 0.2); // soft white light
  scene.add(light);
  const pinteLight = new THREE.PointLight(0xffffff, 1, 1000);
  pinteLight.position.set(0, 50, 0);
 
  pinteLight.castShadow = true;
  scene.add(pinteLight);
 
}



const addHelper = () => {
  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper)
}

const createPlane = () => {
  const planeGeometry = new THREE.PlaneGeometry(200, 200, 320, 300);
  const planeMaterial = new THREE.MeshStandardMaterial({ color: 0xeeeeee })
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.receiveShadow = true;
  plane.rotation.set(-Math.PI/2,0, 0);
  scene.add(plane);
}


// 加载模型
const loadModel = () => {
  const loader = new THREE.ObjectLoader()
  loader.load(
    '/model/model_BMW.json',
    (obj) => {
      (window as any).CAR = obj
      // 筛选 需要的材质
      CAR.value = obj;
      obj.traverse((item) => {
        if(item instanceof THREE.Mesh){
          switch (item.name) {
            case 'WHEEL_COLOR':
              WHEEL_COLOR.value = item
              break;
            case 'BRACK_COLOR':
              BRACK_COLOR.value = item
              break;
            case 'BODY_COLOR':
              BODY_COLOR.value = item
              break;
            default:
              break;
          }
        }

      })
      scene.add(obj)
    },
    undefined,
    (err) => {
      console.log('err', err);
    }
  )
}



const init = (container: HTMLElement) => {
  container.appendChild(renderer.domElement);
  addLight();
  addHelper();
  createPlane();
  loadModel();
  renderer.setAnimationLoop(() => {
    controls.update()
    renderer.render(scene, camera)
  })
}


const changeColor = (HEX:string) => {
  if (BODY_COLOR){
    (BODY_COLOR.value as any).material.color = new THREE.Color(HEX)
  }
}


const container = ref()
onMounted(() => {
  init(container.value);
})


</script>

<style lang="scss" scoped>
.UI {
  display: flex;
  position: absolute;
  top: 0;
  left:  0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  .colors{
    span{
      pointer-events: all;
      display: inline-block;
      width: 20px;
      height: 50px;
      cursor: pointer;
      margin-right: 20px;
      transform: all 0.5s;
      &:hover {
        box-shadow: 5px 5px 20px rgba($color: #fdffe7, $alpha: 0.5);
      }
    }
  }
}
.car-diy{
  width: 100%;
  height: 100%;
}
</style>