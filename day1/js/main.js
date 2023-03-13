import * as THREE from 'three';
import {OrbitControls} from './orbit.js'
//step-1 create scene
const scene = new THREE.Scene();

//add camera to scene

const camera = new THREE.PerspectiveCamera(75,2,0.1,1000)

//here 75 is fov-field of view
// 2 is aspect ratio  and it should be window.innerHeight/window.innerWidth
//0.1 near- nearest zoom level for camera 
// 1000 far - farest zoom level for camera

// step-2 render the scene to  webpage 
scene.fog= new THREE.Fog("gray", 0.015, 50)

const render = new THREE.WebGLRenderer()
//set the canvas size 

render.setSize(window.innerWidth,window.innerHeight)
document.body.appendChild(render.domElement);

//create a 3d shape 

const createRect = (positionX,positionY,positionZ,color) => {
    const geometry = new THREE.BoxGeometry( positionX, positionY, positionZ );

//width along x-axis 
//height along y axis 
//depth along z-axis

// step-3
//now add material to geometry


const material = new THREE.MeshStandardMaterial({color:color})

//cretae shape using geometry and material 

const box = new THREE.Mesh(geometry,material);
return box
}

let  box= createRect(1,1,1,'red')
let  box1= createRect(0.5,10,0.5,'yellow')
//step-4 add shape to scene


//group two shape 

const group = new THREE.Group();
group.add( box );
group.add( box1);
scene.add(group)

//now add camera position

// camera.position.z=10;
// camera.position.y=2;
//we can set camera position 
camera.position.set(-10,2,10)



//width along x-axis 
//height along y axis 
//depth along z-axis

// step-3
//now add material to geometry
// /add axisHelper

const axisHelper = new THREE.AxesHelper(5)

scene.add(axisHelper)
//add mouse event to camera like zoomin zoomout  rotate

const orbit = new OrbitControls(camera,render.domElement)
orbit.update()

const planeGeometry = new THREE.PlaneGeometry(30,30);
const plainMaterial = new THREE.MeshStandardMaterial({color:0xffffff,side:THREE.DoubleSide});
const plane = new THREE.Mesh(planeGeometry,plainMaterial);
scene.add(plane)

//rotate the palne to match grid 

plane.rotation.x=-0.5 *Math.PI
const gridPlane = new THREE.GridHelper(30);
scene.add(gridPlane)


//add sphere 

const SphereGeometry= new THREE.SphereGeometry(4,50,50);
const sphereMaterial= new THREE.MeshStandardMaterial({color:0xff0000,wireframe:false});
const sphere = new THREE.Mesh(SphereGeometry ,sphereMaterial);
sphere.position.set(-10,5,10)
scene.add(sphere);
let step=0;
let speed=0.01

//add ambient light 


const ambientLight = new THREE.DirectionalLight(0x0000ff,0.5)


scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight('red',1)
directionalLight.position.set(-10,-5,10)
scene.add(directionalLight)
function animate() {
	requestAnimationFrame( animate );
    group.rotation.x += 0.01;
	group.rotation.y += 0.01;
	step= step+speed;
	sphere.position.y= 10*Math.abs(Math.sin(step))
	render.render( scene, camera );
}
animate();