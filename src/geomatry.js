
import * as THREE from 'three';
import gsap from 'gsap';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector('canvas.webgl');
const gui = new GUI()

const scene = new THREE.Scene();

// const positionArray = new Float32Array([
//     0, 0, 0,
//     0, 1, 0,
//     1, 0, 0,
//     1, 1, 0,    
//     0, 0, 1,
//     0, 1, 1,
//     1, 0, 1,
// ]);

// const positionAttribute = new THREE.BufferAttribute(positionArray, 3);

// const geometry = new THREE.BufferGeometry();
// geometry.setAttribute('position', positionAttribute);
const geometry = new THREE.BoxGeometry(1, 1, 1 , 4 , 4 , 3)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const mesh1 = new THREE.Mesh(
 geometry,
 material
);
scene.add(mesh1);

//Debug
gui.add(mesh1.position, 'x').min(-3).max(3).step(0.01)
gui.add(mesh1.position, 'y').min(-3).max(3).step(0.01)
gui.add(mesh1.position, 'z').min(-3).max(3).step(0.01)

gui.add(material, 'wireframe')

gui.add(material, 'opacity').min(0).max(1).step(0.01)
gui.add(material, 'visible')    
gui.addColor(material, 'color').onChange(() => {
    console.log('color changed');
})



//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,

};

const camera = new THREE.PerspectiveCamera(75,sizes.width/sizes.height,0.1,100)
scene.add(camera);
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = 1;
camera.lookAt(mesh1.position)

//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;


const renderer = new THREE.WebGLRenderer({ canvas : canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//double click to fullscree
window.addEventListener('dblclick', () => {
  if (!document.fullscreenElement) {
    canvas.requestFullscreen();
  }
  else {
    document.exitFullscreen();
  }
})




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
   
    // const elapsedTime = clock.getElapsedTime();
    // camera.position.x = Math.sin(mouse.x * Math.PI) * 2;
    // camera.position.z = Math.cos(mouse.x * Math.PI) * 2;
    // camera.position.y = mouse.y * 2;
    // camera.lookAt(mesh1.position)
    controls.update()

  
    requestAnimationFrame(animate);
    renderer.render(scene, camera);


}

animate();