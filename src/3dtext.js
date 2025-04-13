
import * as THREE from 'three';
import gsap from 'gsap';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js'
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';
import { depth } from 'three/tsl';



const canvas = document.querySelector('canvas.webgl');
const gui = new GUI()
const scene = new THREE.Scene();

const mapcatTexture = new THREE.TextureLoader().load('./texture/matcaps/3.png')
const fontLoader = new FontLoader()
fontLoader.load('./fonts/helvetiker_regular.typeface.json ', (font) => {
  const geometry = new TextGeometry( 'Hello I am ZWE', {
		font: font,
		size: 0.7,
    depth: 0.1,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0.1,
		bevelSize: .01,
		bevelOffset: 0,
		bevelSegments: 5
	});
const textMaterial = new THREE.MeshMatcapMaterial(  );
textMaterial.matcap = mapcatTexture
const text = new THREE.Mesh( geometry, textMaterial );
text.geometry.center();
scene.add( text );

const donutGeometry = new THREE.TorusGeometry( 0.3, 0.2, 20, 45 );
const donutMaterial = new THREE.MeshMatcapMaterial({matcap: mapcatTexture}  );

const BoxGeometry = new THREE.BoxGeometry( 1, 1, 1 );
const BoxMaterial = new THREE.MeshMatcapMaterial({matcap: mapcatTexture}  );

for(let i = 0; i < 300; i++){

  const donut = new THREE.Mesh( donutGeometry, donutMaterial );


  donut.position.x = (Math.random() - 0.5) * 15;
  donut.position.y = (Math.random() - 0.5) * 15;
  donut.position.z = (Math.random() - 0.5) * 15;

  donut.rotation.x = Math.random() * Math.PI
  donut.rotation.y = Math.random() * Math.PI

  const scale = Math.random();
  donut.scale.set(scale, scale, scale)
   scene.add( donut );
}

for(let i = 0; i < 300; i++){

  const box = new THREE.Mesh( BoxGeometry, BoxMaterial );


  box.position.x = (Math.random() - 0.5) * 15;
  box.position.y = (Math.random() - 0.5) * 15;
  box.position.z = (Math.random() - 0.5) * 15;

  box.rotation.x = Math.random() * Math.PI
  box.rotation.y = Math.random() * Math.PI
  const scale = Math.random();
  box.scale.set(scale, scale, scale)
   scene.add( box );
}



})
// const geometry = new THREE.BoxGeometry(1, 1, 1, 30, 30, 30)
// geometry.computeBoundingBox()
// const material = new THREE.MeshBasicMaterial();
// const mesh1 = new THREE.Mesh(
//   geometry,
//   material
// );
// scene.add(mesh1);




//sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,

};

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
scene.add(camera);
camera.position.z = 3;
camera.position.y = 1;
camera.position.x = 1;


//controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true;


const renderer = new THREE.WebGLRenderer({ canvas: canvas });
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
  x: undefined,
  y: undefined
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