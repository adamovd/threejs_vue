<script setup lang="ts">
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Ref, computed, onMounted, ref, watch } from "vue";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import model from "../assets/aurora.glb?url";
import { lerp } from "three/src/math/MathUtils";

let iphone: THREE.Object3D;
const size = 10;
const divisions = 10;

let position: THREE.Vector3 = new THREE.Vector3();

const loader = new GLTFLoader();
loader.load(
  model,
  (gltf) => {
    const scale = 5.7;
    iphone = gltf.scene.children[0];
    iphone.scale.set(scale, scale, scale);
    iphone.rotation.set(0, -1.6, 0);
    position = iphone.position.set(0.3, -0.5, 0.2);
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

const light = new THREE.SpotLight(0x404040);
light.position.set(-2, 0, 2);

scene.add(light);

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
  iphone.rotation.y += 0.001;

  render();
};

onMounted(() => {
  renderer.value = new THREE.WebGLRenderer({
    canvas: experience.value as unknown as HTMLCanvasElement,
    antialias: true,
    alpha: true,
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
  <canvas ref="experience"> </canvas>
  <section>
    <h2>
      Aurora <br />
      Jewellery
    </h2>
  </section>
  <section></section>
  <section></section>
</template>

<style scoped>
canvas {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
}
section {
  display: flex;
  align-items: center;
  height: 100vh;
  position: relative;
  font-family: Georgia, "Times New Roman", Times, serif;
  color: #ffeded;
  text-transform: uppercase;
  font-size: 7vmin;
  padding-left: 10%;
  padding-right: 10%;
}
</style>
