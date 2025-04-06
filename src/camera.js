
import * as THREE from 'three';
import { blendBurn, log } from 'three/tsl';

const canvas = document.querySelector('canvas.webgl');

const scene = new THREE.Scene();
const mesh1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
scene.add(mesh1);


//sizes
const sizes = {
  width: 1250,
  height: 550,
};

const camera = new THREE.OrthographicCamera(-1 * sizes.width / sizes.height,1,1,-1 , 0.1, 100)
scene.add(camera);
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = 1;
camera.lookAt(mesh1.position)


const renderer = new THREE.WebGLRenderer({ canvas : canvas });
renderer.setSize(sizes.width, sizes.height);


//clock
const clock = new THREE.Clock();
//animation
const animate = () => {
   
    const elapsedTime = clock.getElapsedTime();
    mesh1.rotation.y = elapsedTime;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);


}

animate();