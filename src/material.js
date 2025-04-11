
import * as THREE from 'three';
import GUI from 'lil-gui';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
const gui = new GUI()
const canvas = document.querySelector('canvas.webgl');




const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const texture = textureLoader.load('./texture/door.jpg')
const matcapTexture = textureLoader.load('./texture/matcaps/3.png')
const aoTexture = textureLoader.load('./texture/ambientOcclusion.jpg')
const heightTexture = textureLoader.load('./texture/height.jpg')
const metalTexture = textureLoader.load('./texture/metalness.jpg')
const roughnessTexture = textureLoader.load('./texture/roughness.jpg')
const normalTexture = textureLoader.load('./texture/normal.jpg')    

const enviromentMapTexture = cubeTextureLoader.load([
    './texture/environmentMap/1/nx.png',
    './texture/environmentMap/1/ny.png',
    './texture/environmentMap/1/nz.png',
    './texture/environmentMap/1/px.png',
    './texture/environmentMap/1/ny.png',
    './texture/environmentMap/1/nz.png',
])

//objects
//normal
// const material = new THREE.MeshNormalMaterial();
// material.flatShading = true;

//matcap
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture


//Dept
// const material = new THREE.MeshDepthMaterial();

// const material = new THREE.MeshPhongMaterial()
// material.shininess = 3

// const material = new THREE.MeshToonMaterial()

const material = new THREE.MeshStandardMaterial()
material.roughness = 1
material.metalness = 1


material.envMap = enviromentMapTexture

// material.map = texture
// material.displacementMap = heightTexture
// material.displacementScale = 0.07
// material.metalnessMap = metalTexture
// material.roughnessMap = roughnessTexture
// material.normalMap = normalTexture

gui.add(material, 'metalness').min(0).max(3).step(0.001)
gui.add(material, 'roughness').min(0).max(3).step(0.001)


const mesh1 = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
);
mesh1.geometry.setAttribute('uv2', new THREE.BufferAttribute(mesh1.geometry.attributes.uv.array, 2));
const mesh2 = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1 , 100, 100),
    material
);
mesh2.geometry.setAttribute('uv2', new THREE.BufferAttribute(mesh2.geometry.attributes.uv.array, 2));
const mesh3 = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2 , 16, 32),
    material
);
mesh3.geometry.setAttribute('uv2', new THREE.BufferAttribute(mesh3.geometry.attributes.uv.array, 2));

scene.add(mesh1);
scene.add(mesh2);
scene.add(mesh3);
mesh1.position.x = -2;
mesh3.position.x = 2;


//light 

const ambientLigh = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLigh)

const pointLight = new THREE.PointLight(0xffffff, 90);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight)



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
camera.lookAt(mesh1.position)

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

    const elapsedTime = clock.getElapsedTime();
    // camera.position.x = Math.sin(mouse.x * Math.PI) * 2;
    // camera.position.z = Math.cos(mouse.x * Math.PI) * 2;
    // camera.position.y = mouse.y * 2;
    // camera.lookAt(mesh1.position)
    controls.update()
    mesh1.rotation.y = .7 * elapsedTime;

    mesh3.rotation.y = .2 * elapsedTime;

    requestAnimationFrame(animate);
    renderer.render(scene, camera);


}

animate();