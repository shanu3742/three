import * as THREE from 'three';
//step-1 create scene
const scene = new THREE.Scene();

//add camera to scene

const camera = new THREE.PerspectiveCamera(75,2,0.1,1000)

//here 75 is fov-field of view
// 2 is aspect ratio  and it should be window.innerHeight/window.innerWidth
//0.1 near- nearest zoom level for camera 
// 1000 far - farest zoom level for camera

// step-2 render the scene to  webpage 

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

const material = new THREE.MeshBasicMaterial({color:color})

//cretae shape using geometry and material 

const box = new THREE.Mesh(geometry,material);
return box
}

let  box= createRect(1,1,1,'red')
let  box1= createRect(0.5,2,0.5,'yellow')
//step-4 add shape to scene

scene.add(box)
scene.add(box1)



//now add camera position

camera.position.z=5;






function animate() {
	requestAnimationFrame( animate );
    box.rotation.x += 0.01;
	box.rotation.y += 0.01;
    box1.rotation.x +=0.01;
    box1.rotation.y +=0.01;
	render.render( scene, camera );
}
animate();