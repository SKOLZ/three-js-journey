import * as THREE from "three";
import { gsap } from "gsap";

const sizes = {
  width: 800,
  height: 600,
};

const canvas = document.getElementById("canvas");

const scene = new THREE.Scene();

const axesHelper = new THREE.AxesHelper(5);
scene.add(axesHelper);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh = new THREE.Mesh(geometry, material);
// mesh.scale.x = 2;
// mesh.scale.y = 2;
// mesh.rotation.reorder("XZY");
// mesh.rotation.z = Math.PI / 4;
// mesh.rotation.y = Math.PI / 2;
// mesh.rotation.x = Math.PI / 2;
// mesh.position.normalize();
// scene.add(mesh);

const mesh2 = new THREE.Mesh(geometry, material);
mesh2.position.set(-2, 0, 0);
// scene.add(mesh2);

const mesh3 = new THREE.Mesh(geometry, material);
mesh3.position.set(2, 0, 0);
// scene.add(mesh3);

const group = new THREE.Group();
group.add(mesh);
group.add(mesh2);
group.add(mesh3);
group.scale.y = 2;
scene.add(group);

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.set(3, 3, 10);
camera.lookAt(mesh.position);
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

renderer.setSize(sizes.width, sizes.height);

// without framerate independence
const tickFramerateDependent = () => {
  mesh.rotation.y += 0.01;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tickFramerateDependent);
};

// tickFramerateDependent();

// framerate independant
let time = Date.now();
const tickFramerateIndependent = () => {
  const currentTime = Date.now();
  const deltaTime = currentTime - time;
  mesh.rotation.y += 0.01 * deltaTime * 0.1;
  renderer.render(scene, camera);
  time = currentTime;
  window.requestAnimationFrame(tickFramerateIndependent);
};

// tickFramerateIndependent();

// using clock
const clock = new THREE.Clock();
const tickClock = () => {
  const elapsedTime = clock.getElapsedTime();
  mesh.rotation.y = elapsedTime * 2;
  mesh.position.x = Math.sin(elapsedTime) * 2;
  mesh.position.y = Math.cos(elapsedTime) * 2;
  renderer.render(scene, camera);
  window.requestAnimationFrame(tickClock);
};
// tickClock();

// using gsap
gsap.to(mesh.position, { duration: 1, delay: 1, y: 2 });
const tickGsap = () => {
  renderer.render(scene, camera);
  window.requestAnimationFrame(tickGsap);
};

tickGsap();
