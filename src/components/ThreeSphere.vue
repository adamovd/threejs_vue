<script setup lang="ts">
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Ref, computed, onMounted, ref, watch } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import model from "../assets/lowpolygirl.glb?url";
import { lerp } from "three/src/math/MathUtils";
import Stats from "three/examples/jsm/libs/stats.module";

let iphone: THREE.Object3D;
const size = 10;
const divisions = 10;

const gridHelper = new THREE.GridHelper(size, divisions);

const loader = new GLTFLoader();
loader.load(
  model,
  (gltf) => {
    const scale = 0.7;
    iphone = gltf.scene;
    iphone.scale.set(scale, scale, scale);
    iphone.rotation.set(0, 0, 0);
    iphone.position.set(-0.5, -0.5, 0.2);
    iphone.castShadow = true;
    scene.add(iphone);
    console.log(iphone);
  },
  (xhr) => {
    const loading = ref((xhr.loaded / xhr.total) * 100 + "% loaded");
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  (error) => {
    console.error(error);
  }
);
let renderer: Ref<THREE.WebGLRenderer | null> = ref(null);
const experience = ref<HTMLCanvasElement | null>(null);
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const aspectRatio = computed(() => sizes.width / sizes.height);
const scene = new THREE.Scene();
scene.add(gridHelper);

let controls: OrbitControls;

const updateRenderer = () => {
  renderer.value?.setSize(sizes.width, sizes.height);
  renderer.value?.setPixelRatio(window.devicePixelRatio);
};

const updateCamera = () => {
  camera.aspect = aspectRatio.value;
  camera.updateProjectionMatrix();
};

watch(aspectRatio, updateRenderer);
watch(aspectRatio, updateCamera);

const light = new THREE.PointLight(0xf73aa9, 5, 2000);
light.position.set(-2, 0, 2);
const helper = new THREE.PointLightHelper(light, 5);
scene.add(light, helper);

const secondLight = new THREE.PointLight(0x3d85c6, 5, 2000);
secondLight.position.set(2, 0, 2);
scene.add(secondLight);

const camera = new THREE.PerspectiveCamera(45, aspectRatio.value, 0.1, 100);
camera.position.z = 2;
scene.add(camera);

const render = () => {
  renderer.value?.render(scene, camera);
};

const onWindowResize = () => {
  sizes.height = window.innerHeight;
  sizes.width = window.innerWidth;
  renderer.value?.setSize(sizes.width, sizes.height);
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
};
window.addEventListener("resize", onWindowResize, false);

const animate = () => {
  requestAnimationFrame(animate);

  render();
};

onMounted(() => {
  renderer.value = new THREE.WebGLRenderer({
    canvas: experience.value as unknown as HTMLCanvasElement,
    antialias: true,
  });
  controls = new OrbitControls(camera, renderer.value.domElement);
  controls.enableDamping = true;
  controls.target.set(0, 0, 0);
  updateRenderer();
  updateCamera();
  render();

  animate();
});
</script>

<template>
  <canvas ref="experience" />
</template>

<style scoped></style>
