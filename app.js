import * as THREE from 'https://unpkg.com/three@0.126.1/build/three.module.js';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Charger un modèle GLB
const loader = new GLTFLoader();
loader.load(
    'https://github.com/mateorey22/samsung-t7/blob/main/ImageToStl.com_samsung%2Bssd-samsung%2Bportable%2Bssd%2Bt7.glb',  // Remplace 'path_to_your_model/model.glb' par le chemin d'accès à ton modèle
    function (gltf) {
        scene.add(gltf.scene);
    },
    undefined,
    function (error) {
        console.error('An error happened', error);
    }
);

camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
