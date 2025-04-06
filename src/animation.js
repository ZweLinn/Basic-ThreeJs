import * as THREE from 'three';
import { blendBurn, log } from 'three/tsl';

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();
const mesh1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh1);

const mesh2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 32, 32),
  new THREE.MeshBasicMaterial({ color: "blue" })
);
scene.add(mesh2);
mesh2.position.x = 3;

//sizes
const sizes = {
  width: 1250,
  height: 550,
};

const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height)
scene.add(camera);
camera.position.z = 3;

const renderer = new THREE.WebGLRenderer({ canvas : canvas });
renderer.setSize(sizes.width, sizes.height);


//clock
const clock = new THREE.Clock();
//animation
const animate = () => {
   
    const elapsedTime = clock.getElapsedTime();
    mesh1.rotation.y = elapsedTime;
    mesh2.position.x = Math.sin(elapsedTime) * 1.5;
    mesh2.position.y = Math.cos(elapsedTime) * 1.5;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);


}

animate();