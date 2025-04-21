import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import { Sky } from 'three/addons/objects/Sky.js'
import GUI from 'lil-gui'

/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')
//texture loader
const textureLoader = new THREE.TextureLoader()

//textures
//floor textures
const floorAlpha = textureLoader.load('../texture/floor/alpha.jpg')
const floorColor = textureLoader.load('../texture/floor/brown_mud_dry_diff_1k.jpg')
floorColor.repeat.set(8, 8)
floorColor.wrapS = THREE.RepeatWrapping
floorColor.wrapT = THREE.RepeatWrapping
floorColor.colorSpace = THREE.SRGBColorSpace

const floorDisp = textureLoader.load('../texture/floor/brown_mud_dry_disp_1k.jpg')
floorDisp.repeat.set(8, 8)
floorDisp.wrapS = THREE.RepeatWrapping
floorDisp.wrapT = THREE.RepeatWrapping

const floorARM = textureLoader.load('../texture/floor/brown_mud_dry_arm_1k.jpg')
floorARM.repeat.set(8, 8)
floorARM.wrapS = THREE.RepeatWrapping
floorARM.wrapT = THREE.RepeatWrapping

const floorNormal = textureLoader.load('../texture/floor/brown_mud_dry_nor_gl_1k.jpg')
floorNormal.repeat.set(8, 8)
floorNormal.wrapS = THREE.RepeatWrapping
floorNormal.wrapT = THREE.RepeatWrapping

//wall

const wallColor = textureLoader.load('../texture/wall/mossy_brick_diff_1k.jpg')
wallColor.colorSpace = THREE.SRGBColorSpace
const wallARM = textureLoader.load('../texture/wall/mossy_brick_arm_1k.jpg')
const wallNormal = textureLoader.load('../texture/wall/mossy_brick_nor_gl_1k.jpg')

//roof
const roofColor = textureLoader.load('../texture/roof/roof_slates_02_diff_1k.jpg')
roofColor.colorSpace = THREE.SRGBColorSpace
roofColor.repeat.set(3,1)
roofColor.wrapT = THREE.RepeatWrapping
roofColor.wrapS = THREE.RepeatWrapping

const roofARM = textureLoader.load('../texture/roof/roof_slates_02_arm_1k.jpg')
roofARM.repeat.set(3,1)
roofARM.wrapT = THREE.RepeatWrapping
roofARM.wrapS = THREE.RepeatWrapping
const roofNormal = textureLoader.load('../texture/roof/roof_slates_02_nor_gl_1k.jpg')
roofNormal.repeat.set(3,1)
roofNormal.wrapT = THREE.RepeatWrapping
roofNormal.wrapS = THREE.RepeatWrapping

//bushes
const bushColor = textureLoader.load('../texture/bushes/leaves_forest_ground_diff_1k.jpg')
bushColor.colorSpace = THREE.SRGBColorSpace
const bushARM = textureLoader.load('../texture/bushes/leaves_forest_ground_arm_1k.jpg')
const bushNormal = textureLoader.load('../texture/bushes/leaves_forest_ground_nor_gl_1k.jpg')

//graves
const graveColor = textureLoader.load('../texture/graves/plastered_stone_wall_diff_1k.jpg')
graveColor.colorSpace = THREE.SRGBColorSpace
const graveARM = textureLoader.load('../texture/grave/plastered_stone_wall_arm_1k.jpg')
const graveNormal = textureLoader.load('../texture/grave/plastered_stone_wall_nor_gl_1k.jpg')

//doors
const doorColor = textureLoader.load('../texture/door/color.jpg')
doorColor.colorSpace = THREE.SRGBColorSpace
const doorAlpha = textureLoader.load('../texture/door/alpha.jpg')
const doorNormal = textureLoader.load('../texture/door/normal.jpg')
const doorAo = textureLoader.load('../texture/door/ambientOcclusion.jpg')
const doorHeight = textureLoader.load('../texture/door/height.jpg')
const doorMetalness = textureLoader.load('../texture/door/metalness.jpg')
const doorRoughness = textureLoader.load('../texture/door/roughness.jpg')


// Scene
const scene = new THREE.Scene()

/**
 * House
 */
//house
const house = new THREE.Group()
scene.add(house)
//wall
const wall = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial({
        map: wallColor,
        aoMap: wallARM,
        metalnessMap: wallARM,
        roughnessMap: wallARM,
        normalMap: wallNormal,
    })
)
wall.position.y = 1.25
house.add(wall)

//roof 
const roof = new THREE.Mesh(
    new THREE.ConeGeometry(4, 1.7, 4),
    new THREE.MeshStandardMaterial({
        map: roofColor,
        aoMap: roofARM,
        metalnessMap: roofARM,
        roughnessMap: roofARM,
        normalMap: roofNormal,
    })
)
roof.position.y = 2.5 + .75
roof.rotation.y = Math.PI * 0.25
house.add(roof)

//door
const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2 , 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColor,
        alphaMap: doorAlpha,
        aoMap: doorAo,
        normalMap: doorNormal,
        metalnessMap: doorMetalness,
        roughnessMap: doorRoughness,
        displacementMap: doorHeight,
        displacementScale: 0.15,
        displacementBias: -0.05,
        
        
    })
)
door.position.y = 1
door.position.z = 2 + 0.01
house.add(door)

//bushes
const bushGeometry = new THREE.SphereGeometry(0.5, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    map: bushColor,
    aoMap: bushARM,
    metalnessMap: bushARM,
    roughnessMap: bushARM,
    normalMap: bushNormal,
    color: '#ccffcc',
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.7, 0.7, 0.7)
bush1.position.set(0.8, 0, 2.2)


const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.5, 0.5, 0.5)
bush2.position.set(1.2, 0, 2.1)


const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.6, 0.5, 0.5)
bush3.position.set(-1.2, 0.1, 2.1)


const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.3, 0.3, 0.3)
bush4.position.set(-1.2, 0.1, 2.35)
house.add(bush1, bush2, bush3, bush4)

//floor 
const floor = new THREE.Mesh(
    new THREE.PlaneGeometry(20, 20 ,100 , 100),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlpha,
        transparent: true,
        map: floorColor,
        aoMap: floorARM,
        roughnessMap: floorARM,
        metalnessMap: floorARM,
        normalMap: floorNormal,
        displacementMap: floorDisp,
        displacementScale: 0.2,
        displacementBias : -0.11
    })
)

//debug
gui.add(floor.material, 'displacementScale').min(-1).max(1).step(0.01).name('floor disp scale')
gui.add(floor.material, 'displacementBias').min(-1).max(1).step(0.01).name('floor ao intensity')

floor.rotation.x = - Math.PI * 0.5
scene.add(floor)

//gravestone
const graves = new THREE.Group()
scene.add(graves)
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColor,
    metalnessMap: graveARM,
    roughnessMap: graveARM,
    normalMap: graveNormal,
    
})

for (let i = 0; i < 30; i++) {
    const angle = Math.random() * Math.PI * 2
    const radius = 3 + Math.random() * 6
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius
    
    //mesh 
    const grave = new THREE.Mesh(graveGeometry, graveMaterial)
    grave.position.set(x, 0.3, z)
    grave.rotation.y = (Math.random() - 0.5) * 0.4 // random tilt
    grave.rotation.z = (Math.random() - 0.5) * 0.4
    grave.rotation.x = (Math.random() - 0.5) * 0.4
    grave.castShadow = true

    graves.add(grave)

}



/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.25)
scene.add(ambientLight)

// Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', .8) 
directionalLight.position.set(3, 2, -8)

scene.add(directionalLight)

//door light
const doorLight = new THREE.PointLight('#ff7d46', 5)
doorLight.position.set(0, 2, 2.5)
house.add(doorLight)

//ghost
const ghostLight = new THREE.PointLight('#8800ff', 6, 1, 2);
scene.add(ghostLight);
//ghost

//shadow
directionalLight.castShadow = true
//mapping
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 10
directionalLight.shadow.camera.right = 10
directionalLight.shadow.camera.bottom = -10
directionalLight.shadow.camera.left = -10
directionalLight.shadow.camera.far = 20
directionalLight.shadow.camera.near = 1


wall.castShadow = true
wall.receiveShadow = true
roof.castShadow = true
floor.receiveShadow = true

for(const grave of graves.children){
    grave.castShadow = true
    grave.receiveShadow = true
}

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({ canvas: canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

//sky
const sky = new Sky()
sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 10
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

sky.scale.set(200,200,200)
scene.add(sky)

//fog
scene.fog = new THREE.FogExp2("#02343f", 0.1)
/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 4
camera.position.y = 2
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true



/**
 * Animate
 */
const timer = new Timer()

const tick = () => {
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()