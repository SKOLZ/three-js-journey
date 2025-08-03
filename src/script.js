import * as THREE from "three";
import { gsap } from "gsap";
import GUI from "lil-gui";

// Initialize GUI
const gui = new GUI({
  width: 350,
  title: "Debug config",
});

// gui.hide();

window.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    gui.show(gui._hidden);
  }
});

const debugConfig = {
  boxColor: "#ff0000",
  boxWidthSegments: 1,
};

const box1Config = gui.addFolder("Box 1");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const canvas = document.getElementById("canvas");

const scene = new THREE.Scene();

// const axesHelper = new THREE.AxesHelper(5);
// scene.add(axesHelper);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: debugConfig.boxColor });
const mesh = new THREE.Mesh(geometry, material);

box1Config.add(mesh.material, "wireframe");
box1Config.addColor(debugConfig, "boxColor").onChange((color) => {
  mesh.material.color.set(color);
});
box1Config
  .add(debugConfig, "boxWidthSegments")
  .min(1)
  .max(20)
  .step(1)
  .onFinishChange((value) => {
    mesh.geometry.dispose();
    mesh.geometry = new THREE.BoxGeometry(1, 1, 1, value, value, value);
  });
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
camera.position.set(3, 3, 100);
camera.lookAt(mesh.position);
scene.add(camera);

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
});

const cursor = {
  x: 0,
  y: 0,
};

window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  cursor.y = -(event.clientY / sizes.height - 0.5);
  camera.position.x = cursor.x * 5;
  camera.position.y = cursor.y * 5;
  camera.lookAt(mesh.position);
});

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
// const clock = new THREE.Clock();
const tickClock = () => {
  // const elapsedTime = clock.getElapsedTime();
  // mesh.rotation.y = elapsedTime * 2;
  // mesh.position.x = Math.sin(elapsedTime) * 2;
  // mesh.position.y = Math.cos(elapsedTime) * 2;

  camera.position.x = Math.sin(cursor.x * Math.PI * 2) * -5;
  camera.position.z = Math.cos(cursor.x * Math.PI * 2) * -5;
  camera.position.y = cursor.y * 5;
  camera.lookAt(mesh.position);

  renderer.render(scene, camera);
  window.requestAnimationFrame(tickClock);
};
tickClock();

// using gsap
// gsap.to(mesh.position, { duration: 1, delay: 1, y: 2 });
// const tickGsap = () => {
//   renderer.render(scene, camera);
//   window.requestAnimationFrame(tickGsap);
// };

// tickGsap();
