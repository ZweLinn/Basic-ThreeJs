
import * as THREE from 'three';

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

const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
scene.add(camera);
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = 1;
camera.lookAt(mesh1.position)


const renderer = new THREE.WebGLRenderer({ canvas : canvas });
renderer.setSize(sizes.width, sizes.height);


//clock
const clock = new THREE.Clock();

//mouse
const mouse = {
    x : undefined,
    y : undefined
}
window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / sizes.width) * 2 - 1;
    mouse.y = -(event.clientY / sizes.height) * 2 + 1;
})
//camera    

//animation
const animate = () => {
   
    const elapsedTime = clock.getElapsedTime();
    camera.position.x = Math.sin(mouse.x * Math.PI) * 2;
    camera.position.z = Math.cos(mouse.x * Math.PI) * 2;
    camera.position.y = mouse.y * 2;
    camera.lookAt(mesh1.position)
  
    requestAnimationFrame(animate);
    renderer.render(scene, camera);


}

animate();