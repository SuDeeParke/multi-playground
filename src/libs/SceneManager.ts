import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment';

window.THREE = THREE


export default class SceneManager {
  /**  必要变量声明 */
  scene: THREE.Scene
  camera: THREE.Camera
  renderer: THREE.WebGLRenderer
  controls: OrbitControls
  constructor() {
    // 场景
    this.scene = new THREE.Scene();
    // 摄像机
    this.camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    // 渲染器
    this.renderer = new THREE.WebGLRenderer({
      antialias: true
    })
    // 控制器
    this.controls = new OrbitControls(this.camera, this.renderer.domElement)
  }


  /**
   * @description: 创建基本场景
   * @return {*}
   */
  setting = () => {
    // 控制器配置 
    this.controls.enablePan = false
    this.controls.enableDamping = true
    this.controls.autoRotate = true
    this.controls.autoRotateSpeed = 0.6
    this.controls.dampingFactor = 0.1
    this.controls.minDistance = 5
    this.controls.maxDistance = 55
    // camera配置
    this.camera.position.set(-41.4910845227641, 13.689872979215357, 6.577843974217032)
    this.camera.rotation.setFromQuaternion(new THREE.Quaternion(0.04, 0.92, 0.11, -0.34))
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    //renderer配置
   this.renderer.setPixelRatio(window.devicePixelRatio);
   this.renderer.setSize(window.innerWidth, window.innerHeight);
   this.renderer.shadowMap.enabled = true
   this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer)
    pmremGenerator.compileEquirectangularShader()
    // environment配置
    this.scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture
    this.scene.background = new THREE.Color(0x333333)
    this.scene.translateY(-10)
  }


  /**
   * @description: 添加灯光
   * @return {*}
   */
  addLight = () => {
    const light = new THREE.SpotLight(0xffffff, 0.89, 190, (Math.PI * 45) / 180, 0.5, 0.2);
    light.position.set(50, 50, 50)
    light.castShadow = true;
    this.scene.add(light);
    this.scene.add(light.target)
    return light
  }



  /**
   * @description: 添加辅助线
   * @return {*}
   */
  addHelper = () => {
    const axesHelper = new THREE.AxesHelper(1000);
    this.scene.add(axesHelper)
  }

  /**
   * @description: 添加平面
   * @return {*}
   */
  createPlane = () => {
    const geometry = new THREE.CircleGeometry(88, 50);
    const material = new THREE.MeshStandardMaterial({ color: 0x666666 });
    const circle = new THREE.Mesh(geometry, material);
    circle.receiveShadow = true;
    circle.rotation.set(-Math.PI / 2, 0, 0);
    this.scene.add(circle);
  }



  /**
   * @description: 加载模型
   * @param {*} url 模型文件路径
   * @return {*} 
   */
  loadModel = (url: string) => {
    const loader = new THREE.ObjectLoader()
    loader.load(
      url,
      (obj) => {
        this.scene.add(obj)
      },
      undefined,
      (err) => {
        console.log('err', err);
      }
    )
  }



  /**
   * @description: 初始化
   * @param {*} container
   * @return {*}
   */
  init = (container: HTMLElement) => {
    this.setting()
    const light = this.addLight();
    this.addHelper();
    this.createPlane();
    let angle = 0
    container.appendChild(this.renderer.domElement);
    this.renderer.setAnimationLoop(() => {
      this.controls.update()
      this.renderer.render(this.scene, this.camera)
    })
  }
}
