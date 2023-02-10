<template>
  <div class="UI">
    <div class="group"> <button @click="changeTexture('/image/wood.jpg')">
        <div class="textuere">
          <img src="/image/wood.jpg" alt="材质1">
        </div>
      </button>
      <button @click="changeTexture('/image/weathered.jpg')">
        <div class="textuere">
          <img src="/image/weathered.jpg" alt="材质2">
        </div>
      </button>
    </div>

  </div>
  <div class="change-texture" ref="container"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

window.THREE = THREE

/**  必要变量声明 */
//容器
const container = ref()
// 场景
const scene = new THREE.Scene();
// 摄像机
const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
// 渲染器
const renderer = new THREE.WebGLRenderer({
  antialias: true
})
// 控制器
const controls = new OrbitControls(camera, renderer.domElement)

/** 数据 */
const targetModel = ref<THREE.Mesh>()


/**
 * @description: 创建基本场景
 * @return {*}
 */
const setting = () => {
  // 控制器配置 
  controls.enablePan = false
  controls.enableDamping = true
  controls.autoRotate = true
  controls.autoRotateSpeed = 0.6
  controls.dampingFactor = 0.1
  controls.minDistance = 5
  controls.maxDistance = 55
  // camera配置
  camera.position.set(-41.4910845227641, 13.689872979215357, 6.577843974217032)
  camera.rotation.setFromQuaternion(new THREE.Quaternion(0.04, 0.92, 0.11, -0.34))
  camera.lookAt(new THREE.Vector3(0, 0, 0));
  (window as any).CAMERA = camera
  //renderer配置
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const pmremGenerator = new THREE.PMREMGenerator(renderer)
  pmremGenerator.compileEquirectangularShader()
  // environment配置
  scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture
  scene.background = new THREE.Color(0x333333)
  scene.translateY(-10)
}


/**
 * @description: 添加灯光
 * @return {*}
 */
const addLight = () => {
  const light = new THREE.SpotLight(0xffffff, 0.89, 190, (Math.PI * 45) / 180, 0.5, 0.2);
  light.position.set(50, 50, 50)
  light.castShadow = true;
  scene.add(light);
  scene.add(light.target)
  return light
}



/**
 * @description: 添加辅助线
 * @return {*}
 */
const addHelper = () => {
  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper)
}

/**
 * @description: 添加平面
 * @return {THREE.Mesh} 平面
 */
const createPlane = () => {
  const geometry = new THREE.CircleGeometry(88, 50);
  const material = new THREE.MeshStandardMaterial({ color: 0x666666 });
  const circle = new THREE.Mesh(geometry, material);
  circle.receiveShadow = true;
  circle.rotation.set(-Math.PI / 2, 0, 0);
  scene.add(circle);
  return circle
}



/**
 * @description: 加载模型
 * @param {*} url 模型文件路径
 * @return {*} 
 */
const loadModel = (url: string) => {
  const loader = new THREE.ObjectLoader()
  loader.load(
    url,
    (obj) => {
      scene.add(obj)
    },
    undefined,
    (err) => {
      console.log('err', err);
    }
  )
}

/**
 * @description: 改变材质
 * @return {*}
 */


const changeTexture = (url: string) => {
  if (targetModel.value) {
    const texture = new THREE.TextureLoader().load(url);
    const newMatarial = new THREE.MeshStandardMaterial({ map: texture })
    targetModel.value.material = newMatarial
  }

}

/**
 * @description: 初始化
 * @param {*} container
 * @return {*}
 */
const init = (container: HTMLElement) => {
  setting()
  const light = addLight();
  addHelper();
  createPlane();
  container.appendChild(renderer.domElement);
  renderer.setAnimationLoop(() => {
    controls.update()
    renderer.render(scene, camera)
  })
}

onMounted(() => {
  if (container.value) {
    init(container.value);
    setTimeout(() => {
      const geometry = new THREE.SphereGeometry(15, 32, 16);
      const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
      const sphere = new THREE.Mesh(geometry, material);
      targetModel.value = sphere
      scene.add(sphere);
    })
  }
})

</script>

<style lang="scss" scoped>
.UI {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding-top: 40px;
  pointer-events: none;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .group {
    display: flex;
    column-gap: 20px;
  }
  button {
    background-color: #fff;
    border-radius: 10px;
    border-style: none;
    box-shadow: rgba(0, 0, 0, .2) 0 3px 5px -1px, rgba(0, 0, 0, .14) 0 6px 10px 0, rgba(0, 0, 0, .12) 0 1px 18px 0;
    box-sizing: border-box;
    color: #3c4043;
    font-size: 14px;
    font-weight: 500;
    font-family: inherit;
    letter-spacing: .25px;
    line-height: normal;
    padding: 5px;
    pointer-events: all;
    cursor: pointer;
    
  }

  .textuere {
    display: block;
    overflow: hidden;
    border-radius: 5px;
    width: 50px;
    height: 50px;

    img {
      width: 100%;
    }
  }
}

.change-texture {
  width: 100%;
  height: 100%;
}
</style>