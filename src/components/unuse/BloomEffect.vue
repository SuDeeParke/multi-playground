<template>
  <div class="container" ref="container">
  </div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass';

const sceneInit = (dom: HTMLElement) => {
  // Set up the scene
  const scene = new THREE.Scene();

  // Set up the camera
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 5;

  // Set up the renderer
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const unrealBloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1, 0.5, 0.5);
  unrealBloomPass.renderToScreen = true;
  const composer = new EffectComposer(renderer);
  
  composer.addPass(new RenderPass(scene, camera));
  composer.addPass(unrealBloomPass);



  // Add lighting to the scene
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 0);
  scene.add(directionalLight);

  // Add objects to the scene
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshPhongMaterial({ color: 0x00ff00, emissive: 0xff0000 });
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


  // Render the scene
  function animate() {
    requestAnimationFrame(animate);
    controls.update()
    composer.render();
  }

  setInterval(()=>{
    unrealBloomPass.strength += unrealBloomPass.strength % 2 === 0 ? -1 : 1;
  }, 1000)
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