import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const loader = new GLTFLoader();
loader.load(
    'https://github.com/mateorey22/samsung-t7/blob/main/ImageToStl.com_samsung%2Bssd-samsung%2Bportable%2Bssd%2Bt7.glb',
    function (gltf) {
        scene.add(gltf.scene);
        gltf.scene.scale.set(2, 2, 2);  // Adjust scaling here
        animateOpening(); // Start the opening animation when the model is loaded
    },
    undefined,
    function (error) {
        console.error('An error happened during loading:', error);
    }
);

const controls = new OrbitControls(camera, renderer.domElement);
controls.autoRotate = true;  // Optional: automatically rotate the model
camera.position.set(0, 1, 2);
controls.update();

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);
const pointLight = new THREE.PointLight(0xffffff, 1);
pointLight.position.set(5, 3, 5);
scene.add(pointLight);

function animateOpening() {
    pointLight.intensity = 0;  // Start with the light off
    new TWEEN.Tween(pointLight).to({intensity: 1}, 3000).start();  // Light fades in
    new TWEEN.Tween(gltf.scene.rotation).to({y: Math.PI * 2}, 5000).start();  // Rotate the model
}

function animate() {
    requestAnimationFrame(animate);
    TWEEN.update();  // Update all TWEEN animations
    controls.update();
    renderer.render(scene, camera);
}

animate();
