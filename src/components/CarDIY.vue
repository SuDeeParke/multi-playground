<template>
  <div class="UI">
    <ul>
      <li>
        <button><img class="carbody" :src="carbodyImg">车身</button>
      </li>
      <li>
        <button><img :src="wheelsImg">轮毂</button>
      </li>
      <li>
        <button><img :src="brakeImg">刹车</button>
      </li>
    </ul>
    <div class="colors">
      <span v-for="item in COLORs" :style="{ 'background-color': item }" @click="changeColor(item)"></span>
    </div>
  </div>
  
  <div class="car-diy" ref="container"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

import brakeImg from '@/assets/images/brake.png' 
import carbodyImg from '@/assets/images/carbody2.png' 
import wheelsImg from '@/assets/images/wheels.png' 
import { Color } from 'three';


const CAR = ref();
const BODY_COLOR = ref<THREE.Mesh>();
const WHEEL_COLOR = ref<THREE.Mesh>();
const BRACK_COLOR = ref<THREE.Mesh>();

// options 
const COLORs = ['#eff5f9', '#000000', '#252625', '#5e131d', '#8b7a82','#00194b']
const COLORs_wheels = ['#232323', '#FFCC66', '#819198', 'rgb(202, 227, 59)']
const COLORs_brack = ['rgb(202, 227, 59)', '#ebcb6a', '#f50', '', '#d6dfe3']


const container = ref()
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
const renderer = new THREE.WebGLRenderer({
  antialias: true
})
const controls = new OrbitControls(camera, renderer.domElement.)
controls.enablePan = false
controls.enableDamping = true
controls.autoRotate = true

controls.autoRotateSpeed = 0.6
controls.dampingFactor = 0.1

controls.minDistance = 5
controls.maxDistance = 55

const setting = () => {
  // camera
  camera.position.set(-41.4910845227641, 13.689872979215357,6.577843974217032)
  camera.rotation.setFromQuaternion(new THREE.Quaternion(0.04, 0.92, 0.11, -0.34))
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  

  (window as any).CAMERA = camera
  //renderer
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  pmremGenerator.compileEquirectangularShader()

  // environment
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture
  scene.background = new THREE.Color(0x333333)
  scene.translateY(-10)

  
}



const addLight = () => {
  const light = new THREE.SpotLight(0xffffff, 0.89, 190,(Math.PI * 45) / 180, 0.5, 0.2);
  light.position.set(50,50,50)
  light.castShadow = true;           
  scene.add(light);
  scene.add(light.target)
  return light
}



const addHelper = () => {
  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper)
}

const createPlane = () => {
  const geometry = new THREE.CircleGeometry(88, 50);
  const material = new THREE.MeshStandardMaterial({ color: 0x666666 });
  const circle = new THREE.Mesh(geometry, material);
  circle.receiveShadow = true;
  circle.rotation.set(-Math.PI / 2, 0, 0);
  scene.add(circle);
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
          item.castShadow = true; //default is false
          item.receiveShadow = false; //default
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
  setting()
  const light = addLight();
  // addHelper();
  loadModel();
  createPlane();
  let angle = 0
  container.appendChild(renderer.domElement);
  renderer.setAnimationLoop(() => {
    // angle += 0.005
    // if(angle>=360) {
    //   angle = 0
    // }
    // light.position.setX(Math.sin(angle) * 50)
    // light.position.setZ(Math.cos(angle) * 50)
    // scene.rotateY(-0.001)
    controls.update()
    renderer.render(scene, camera)
  })
}

// TODO 修改轮毂和刹车颜色

const changeColor = (HEX:string) => {
  if (BODY_COLOR){
    (BODY_COLOR.value as any).material.color = new THREE.Color(HEX)
  }
}


onMounted(() => {
  if(container.value){
    init(container.value);
  }
})

</script>

<style lang="scss" scoped>
.UI {
  position: absolute;
  top: 0;
  left:  0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  ul{
    width: 100%;
    display: flex;
    justify-content: center;
    gap: 20px;
    list-style: none;
    background-color: rgba($color: #000000, $alpha: 0);
    padding: 30px 0 10px;
    li {
      button{
        display: flex;
        height: 50px;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        border: none;
        background-color: rgba($color: #000, $alpha: 0);
        pointer-events: all;
        cursor: pointer;
        text-shadow: 0 0 10px rgba($color: #000, $alpha: 0.2);
        font-size: 10px;
        font-weight: bolder;
        color: #fff;
        img {
          width: 24px;
          filter:invert(100%) drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.6));
        }
        img.carbody{
          filter:invert(100%) drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.6));
          width: 44px;
        }
      }
    }
  }
    .colors {
      display: flex;
      width: 300px;
      justify-content: center;
      padding-top: 20px;
      filter: drop-shadow(0 0 5px rgba(255,255,255,0.2));
      transition: all 0.5s;
      pointer-events: all;
      gap: 0px;
      &:hover{
        gap: 10px;
      }
      span {
        pointer-events: all;
        display: inline-block;
        width: 20px;
        height: 50px;
        cursor: pointer;
        transition: all 0.2s;
        &:hover {
          transform: translate(0, -5px);
          box-shadow: 0 0 10px rgba($color: #ffffff, $alpha: 0.3);
        }
      }
  
      span.selected {
        box-shadow: 0 0 10px rgba($color: #ffffff, $alpha: 0.3);
      }
    }
}
.car-diy{
  width: 100%;
  height: 100%;
}
</style>