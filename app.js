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
    'https://github.com/mateorey22/samsung-t7/blob/main/ImageToStl.com_samsung%2Bssd-samsung%2Bportable%2Bssd%2Bt7.glb',  // Replace with the path to your model
    function (gltf) {
        scene.add(gltf.scene);
        gltf.scene.position.set(0, -1, 0);  // Adjust position based on model specifics
        gltf.scene.scale.set(2, 2, 2);  // Scale your model appropriately
    },
    undefined,
    function (error) {
        console.error('An error happened', error);
    }
);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 1, 2);  // Set a nice view angle
controls.update();

const ambientLight = new THREE.AmbientLight(0x404040, 1.5);  // Soft white light
scene.add(ambientLight);

function animate() {
    requestAnimationFrame(animate);
    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    renderer.render(scene, camera);
}

animate();
