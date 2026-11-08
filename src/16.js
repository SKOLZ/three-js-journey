import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { Timer } from "three/addons/misc/Timer.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.getElementById("canvas");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();
const floorAlphaMapTexture = textureLoader.load("./textures/floor/alpha.jpg");
const floorColorTexture = textureLoader.load(
  "./textures/floor/brown_mud_03_1k/brown_mud_03_diff_1k.jpg",
);
const floorARMTexture = textureLoader.load(
  "./textures/floor/brown_mud_03_1k/brown_mud_03_arm_1k.jpg",
);
const floorNormalTexture = textureLoader.load(
  "./textures/floor/brown_mud_03_1k/brown_mud_03_nor_gl_1k.jpg",
);
const floorDisplacementTexture = textureLoader.load(
  "./textures/floor/brown_mud_03_1k/brown_mud_03_disp_1k.jpg",
);
const floorSpecTexture = textureLoader.load(
  "./textures/floor/brown_mud_03_1k/brown_mud_03_spec_1k.jpg",
);
const floorBumpTexture = textureLoader.load(
  "./textures/floor/brown_mud_03_1k/brown_mud_03_bump_1k.jpg",
);

const wallsColorTexture = textureLoader.load(
  "./textures/walls/mossy_brick_1k/mossy_brick_diff_1k.jpg",
);
const wallsARMTexture = textureLoader.load(
  "./textures/walls/mossy_brick_1k/mossy_brick_arm_1k.jpg",
);
const wallsNormalTexture = textureLoader.load(
  "./textures/walls/mossy_brick_1k/mossy_brick_nor_gl_1k.jpg",
);

floorColorTexture.repeat.set(8, 8);
floorColorTexture.wrapS = THREE.RepeatWrapping;
floorColorTexture.wrapT = THREE.RepeatWrapping;
floorColorTexture.colorSpace = THREE.SRGBColorSpace;

floorARMTexture.repeat.set(8, 8);
floorARMTexture.wrapS = THREE.RepeatWrapping;
floorARMTexture.wrapT = THREE.RepeatWrapping;

floorNormalTexture.repeat.set(8, 8);
floorNormalTexture.wrapS = THREE.RepeatWrapping;
floorNormalTexture.wrapT = THREE.RepeatWrapping;

floorDisplacementTexture.repeat.set(8, 8);
floorDisplacementTexture.wrapS = THREE.RepeatWrapping;
floorDisplacementTexture.wrapT = THREE.RepeatWrapping;

floorSpecTexture.repeat.set(8, 8);
floorSpecTexture.wrapS = THREE.RepeatWrapping;
floorSpecTexture.wrapT = THREE.RepeatWrapping;

floorBumpTexture.repeat.set(8, 8);
floorBumpTexture.wrapS = THREE.RepeatWrapping;
floorBumpTexture.wrapT = THREE.RepeatWrapping;

wallsColorTexture.colorSpace = THREE.SRGBColorSpace;
wallsColorTexture.repeat.set(2, 2);
wallsColorTexture.wrapS = THREE.RepeatWrapping;
wallsColorTexture.wrapT = THREE.RepeatWrapping;

wallsARMTexture.repeat.set(2, 2);
wallsARMTexture.wrapS = THREE.RepeatWrapping;
wallsARMTexture.wrapT = THREE.RepeatWrapping;

wallsNormalTexture.repeat.set(2, 2);
wallsNormalTexture.wrapS = THREE.RepeatWrapping;
wallsNormalTexture.wrapT = THREE.RepeatWrapping;

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(20, 20, 100, 100),
  new THREE.MeshPhysicalMaterial({
    transparent: true,
    alphaMap: floorAlphaMapTexture,
    map: floorColorTexture,
    aoMap: floorARMTexture,
    roughnessMap: floorARMTexture,
    metalnessMap: floorARMTexture,
    normalMap: floorNormalTexture,
    displacementMap: floorDisplacementTexture,
    specularIntensityMap: floorSpecTexture, // Controls reflectivity (grayscale)
    specularIntensity: 0.2,
    bumpMap: floorBumpTexture,
    displacementScale: 0.2,
    displacementBias: -0.08,
  }),
);
floor.rotation.x = -Math.PI / 2;
scene.add(floor);

gui.add(floor.material, "displacementScale").min(0).max(1).step(0.01);
gui.add(floor.material, "displacementBias").min(-1).max(1).step(0.01);

gui.add(floor.material, "specularIntensity").min(-1).max(2).step(0.01);

/**
 * House
 */
const house = new THREE.Group();
scene.add(house);

const walls = new THREE.Mesh(
  new THREE.BoxGeometry(4, 2.5, 4),
  new THREE.MeshStandardMaterial({
    map: wallsColorTexture,
    aoMap: wallsARMTexture,
    roughnessMap: wallsARMTexture,
    metalnessMap: wallsARMTexture,
    normalMap: wallsNormalTexture,
  }),
);
walls.position.y += 1.25;

const roof = new THREE.Mesh(
  new THREE.ConeGeometry(3.5, 1.5, 4),
  new THREE.MeshStandardMaterial(),
);
roof.position.y += 2.5 + 0.75;
roof.rotation.y = Math.PI / 4;

const door = new THREE.Mesh(
  new THREE.PlaneGeometry(2.2, 2.2),
  new THREE.MeshStandardMaterial(),
);
door.position.y += 1;
door.position.z += 2 + 0.001;

house.add(walls, roof, door);

/**
 * Bushes
 */
const bushGeometry = new THREE.SphereGeometry(1, 16, 16);
const bushMaterial = new THREE.MeshStandardMaterial();

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial);
bush1.scale.set(0.5, 0.5, 0.5);
bush1.position.set(0.8, 0.2, 2.2);

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial);
bush2.scale.set(0.25, 0.25, 0.25);
bush2.position.set(1.4, 0.1, 2.1);

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial);
bush3.scale.set(0.4, 0.4, 0.4);
bush3.position.set(-0.8, 0.1, 2.2);

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial);
bush4.scale.set(0.15, 0.15, 0.15);
bush4.position.set(-1, 0.05, 2.6);

house.add(bush1, bush2, bush3, bush4);

/**
 * Graves
 */

const graves = new THREE.Group();
scene.add(graves);

const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2);
const graveMaterial = new THREE.MeshStandardMaterial();

for (let i = 0; i < 30; i++) {
  const grave = new THREE.Mesh(graveGeometry, graveMaterial);
  const angle = Math.random() * Math.PI * 2;
  const radius = 3 + Math.random() * 4;
  const x = Math.sin(angle);
  const z = Math.cos(angle);
  grave.position.x = x * radius;
  grave.position.y = Math.random() * 0.4;
  grave.position.z = z * radius;
  grave.rotation.x = (Math.random() - 0.5) * 0.4;
  grave.rotation.y = (Math.random() - 0.5) * 0.4;
  grave.rotation.z = (Math.random() - 0.5) * 0.4;
  graves.add(grave);
}

/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight("#ffffff", 0.5);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight("#ffffff", 1.5);
directionalLight.position.set(3, 2, -8);
scene.add(directionalLight);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const timer = new Timer();

const tick = () => {
  // Timer
  timer.update();
  const elapsedTime = timer.getElapsed();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
