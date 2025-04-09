
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const canvas = document.querySelector('canvas.webgl');

//texture
const loadingManager = new THREE.LoadingManager();

loadingManager.onStart = () => {
    console.log('onStart');
}
loadingManager.onLoad = () => {
    console.log('onLoad');
}
loadingManager.onProgress = () => {
    console.log('onProgress');
}
loadingManager.onError = () => {
    console.log('onError'); 
}
const textureLoader = new THREE.TextureLoader(loadingManager);
const texture = textureLoader.load('./texture/door.jpg')

// texture.repeat.x= 1;
// texture.repeat.y = 2;

// texture.offset.x = 0.5;
// texture.offset.y = 0.5;
texture.rotation = Math.PI/4
texture.center.set(0.5, 0.5)

texture.magFilter = THREE.NearestFilter


const scene = new THREE.Scene();
const geometry =  new THREE.BoxGeometry(1, 1, 1 , 30, 30 , 30);
const mesh1 = new THREE.Mesh(
   geometry,
  new THREE.MeshBasicMaterial({ map: texture })
);
scene.add(mesh1);
console.log('geo attribute', geometry.attributes.uv);


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
   
    const elapsedTime = clock.getElapsedTime();
    // camera.position.x = Math.sin(mouse.x * Math.PI) * 2;
    // camera.position.z = Math.cos(mouse.x * Math.PI) * 2;
    // camera.position.y = mouse.y * 2;
    // camera.lookAt(mesh1.position)
    controls.update()
    // mesh1.rotation.y = elapsedTime
    // mesh1.rotation.x = elapsedTime
  
    requestAnimationFrame(animate);
    renderer.render(scene, camera);


}

animate();