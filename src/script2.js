import * as THREE from "three";
import { gsap } from "gsap";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";

// texture loader
const textureLoader = new THREE.TextureLoader();

const doorColorTexture = textureLoader.load("./textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./textures/door/alpha.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./textures/door/ambientOcclusion.jpg",
);
const doorHeightTexture = textureLoader.load("./textures/door/height.jpg");
const doorNormalTexture = textureLoader.load("./textures/door/normal.jpg");
const doorMetalnessTexture = textureLoader.load(
  "./textures/door/metalness.jpg",
);
const doorRoughnessTexture = textureLoader.load(
  "./textures/door/roughness.jpg",
);
const matcapTexture = textureLoader.load("./textures/matcaps/7.png");
const gradientTexture = textureLoader.load("./textures/gradients/3.jpg");

// base setup
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.getElementById("canvas");

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;

  renderer.setSize(sizes.width, sizes.height);
});

// scene setup
const scene = new THREE.Scene();

// debug
const gui = new GUI();

// light setup
// const ambientLight = new THREE.AmbientLight(0xffffff, 1);
// scene.add(ambientLight);

// const pointLight = new THREE.PointLight(0xffffff, 30);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
// scene.add(pointLight);

// Environment map
const rgbeLoader = new RGBELoader();
rgbeLoader.load("./textures/environmentMap/2k.hdr", (environmentMap) => {
  environmentMap.mapping = THREE.EquirectangularReflectionMapping;
  scene.background = environmentMap;
  scene.environment = environmentMap;
});

// axes helper setup
// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

// scene content
// -- Lambert
// const material = new THREE.MeshLambertMaterial();

// -- Phong
// const material = new THREE.MeshPhongMaterial();
// material.shininess = 100;
// material.specular = new THREE.Color(0x1188ff);

// -- Toon
// const material = new THREE.MeshToonMaterial();
// gradientTexture.minFilter = THREE.NearestFilter;
// gradientTexture.magFilter = THREE.NearestFilter;
// gradientTexture.generateMipmaps = false;
// material.gradientMap = gradientTexture;

// -- Standard
// const material = new THREE.MeshStandardMaterial();
// material.metalness = 1;
// material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;

// material.side = THREE.DoubleSide;

// gui.add(material, "metalness").min(0).max(1).step(0.0001);
// gui.add(material, "roughness").min(0).max(1).step(0.0001);

// -- Physical
const material = new THREE.MeshPhysicalMaterial();
material.metalness = 1;
material.roughness = 1;
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture;
// material.aoMapIntensity = 1;
// material.displacementMap = doorHeightTexture;
// material.displacementScale = 0.1;
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
//clearcoat
// material.clearcoat = 1;
// material.clearcoatRoughness = 0;
// gui.add(material, "clearcoat").min(0).max(1).step(0.0001);
// gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.0001);
//sheen
// material.sheen = 1;
// material.sheenRoughness = 0;
// material.sheenColor.set(1, 1, 1);
// gui.add(material, "sheen").min(0).max(1).step(0.0001);
// gui.add(material, "sheenRoughness").min(0).max(1).step(0.0001);
// gui.addColor(material, "sheenColor");
//iridescence
// material.iridescence = 1;
// material.iridescenceIOR = 1;
// material.iridescenceThicknessRange = [100, 800];
// gui.add(material, "iridescence").min(0).max(1).step(0.0001);
// gui.add(material, "iridescenceIOR").min(1).max(2.333).step(0.001);
// gui.add(material.iridescenceThicknessRange, "0").min(100).max(1000).step(1);
// gui.add(material.iridescenceThicknessRange, "1").min(100).max(1000).step(1);
//transmission
material.transmission = 1;
material.ior = 1;
material.thickness = 1;
gui.add(material, "transmission").min(0).max(1).step(0.0001);
gui.add(material, "ior").min(0).max(10).step(0.0001);
gui.add(material, "thickness").min(0).max(1).step(0.0001);

material.side = THREE.DoubleSide;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material);
sphere.position.set(-2, 0, 0);
const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128),
  material,
);
torus.position.set(2, 0, 0);

const figureGroup = new THREE.Group();
figureGroup.add(sphere);
figureGroup.add(plane);
figureGroup.add(torus);

scene.add(figureGroup);

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(3, 3, 100);
camera.lookAt(plane.position);

scene.add(camera);

// mouse tracker setup
const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  camera.position.x = cursor.x * 5;
  camera.position.y = cursor.y * 5;
  camera.lookAt(plane.position);
});

// render capture (4 types)

//-- framerate dependent
// const tickFramerateDependent = () => {
//   plane.rotation.y += 0.01;
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tickFramerateDependent);
// };
// tickFramerateDependent();

//-- framerate independent
// let time = Date.now();
// const tickFramerateIndependent = () => {
//   const currentTime = Date.now();
//   const deltaTime = currentTime - time;
//   plane.rotation.y += 0.01 * deltaTime *0.1;
//   renderer.render(scene, camera);
//   time = currentTime;
//   window.requestAnimationFrame(tickFramerateDependent);
// }
// tickFramerateIndependent();

//-- clock based
const clock = new THREE.Clock();
const tickClock = () => {
  const elapsedTime = clock.getElapsedTime();
  sphere.rotation.y = 0.1 * elapsedTime;
  plane.rotation.y = 0.1 * elapsedTime;
  torus.rotation.y = 0.1 * elapsedTime;

  sphere.rotation.x = 0.15 * elapsedTime;
  plane.rotation.x = 0.15 * elapsedTime;
  torus.rotation.x = 0.15 * elapsedTime;
  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * -5;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * -5;
  camera.position.y = cursor.y * 5;
  camera.lookAt(plane.position);
  renderer.render(scene, camera);
  window.requestAnimationFrame(tickClock);
};
tickClock();

//-- GSAP clock
// gsap.to(plane.position, { duration: 1, delay: 1, y, 2 });
// const tickGsap = () => {
//   renderer.rendr(scene, camera);
//   window.requestAnimationFrame(tickGsap);
// }
// tickGsap();
