<template>
  <div class="container" ref="container"></div>
</template>

<script setup lang="ts">
import { Vector3, type Object3D } from 'three';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as TWEEN from '@tweenjs/tween.js';
const points = [
  { x: 0, y: 0, z: 0 },
  { x: 0.5, y: 0.3, z: 0.1 },
  { x: 1, y: 0.4, z: 0.3 },
  { x: 1.5, y: 0.5, z: 0.5 },
  { x: 2, y: 0.6, z: 0.7 },
  { x: 3, y: 0.7, z: 0.9 },
  { x: 4, y: 0.8, z: 0.11 },
  { x: 5, y: 0.9, z: 0.22 },

]


const handlePoint = (cube: Object3D) => {
  let count = 0;
  const timer = setInterval(() => {
    const point = points[count]
    const temp = new Vector3(point.x, point.y, point.z);
    const tween = new TWEEN.Tween(cube.position)
      .to(temp, 1000)
      .onComplete(() => {
        tween.stop();
      })
      .start();
    
      count < points.length ? count++ : clearInterval(timer);;
    
  }, 1000)
}

const tweenPoint = (srcPoint: Vector3, point: Vector3) => {
  
}

const sceneInit = (dom: HTMLElement) => {
  // Set up the scene
  const scene = new THREE.Scene();

  // Set up the camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Set up the renderer
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // Add lighting to the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  // Add objects to the scene
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const axesHelper = new THREE.AxesHelper(1000);
  scene.add(axesHelper)

  // 点位拾取
  const mouse = new THREE.Vector2();
  function onMouseMove(event: MouseEvent) {
    event.preventDefault();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  }
  function onClick(event: MouseEvent) {
    event.preventDefault();
    // z用来确定深度，确保拾取的位置能被我们看到
    const vector = new THREE.Vector3(mouse.x, mouse.y, 0);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));
    cube.position.copy(pos);
    console.log(pos);
  }

  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('dblclick', onClick, false);

  // set control
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enablePan = false
  controls.enableDamping = true
  controls.autoRotate = false

  controls.autoRotateSpeed = 0.6
  controls.dampingFactor = 0.1

  controls.minDistance = 5
  controls.maxDistance = 55

  // handle Point 
   handlePoint(cube);
  // Render the scene
  function animate() {
    requestAnimationFrame(animate);
    controls.update()
    renderer.render(scene, camera);
    TWEEN.update();
  }

  animate();
}

const container = ref(null);
onMounted(() => {
  nextTick(() => {
    if (container.value) {
      sceneInit(container.value);
    }
  });
})

</script>

<style lang="scss" scoped>
.container {
  display: block;
  width: 100%;
  height: 100%;
}
</style>