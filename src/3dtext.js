
import * as THREE from 'three';
import gsap from 'gsap';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import font from 'three/examples/fonts/helvetiker_regular.typeface.json'


const canvas = document.querySelector('canvas.webgl');
const gui = new GUI()
const scene = new THREE.Scene();

const fontLoader = new FontLoader()
fontLoader.load('../node_modules/three/examples/fonts/helvetiker_regular.typeface.json', (font) => {
    console.log("font loaded");
    
})
const geometry = new THREE.BoxGeometry(1, 1, 1 , 30, 30 , 30)
geometry.computeBoundingBox()
const material = new THREE.MeshBasicMaterial();
const mesh1 = new THREE.Mesh(
 geometry,
 material
);
scene.add(mesh1);




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