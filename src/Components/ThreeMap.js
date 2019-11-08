import "../App.css";
import React, { Component } from "react";
import * as THREE from "three";
import Orbitcontrols from "three-orbitcontrols";


class ThreeMap extends Component {
  // state = {
  //   picture: ""
  // };

  async componentDidMount() {
	await this.getData()
	.then(()=>{
       this.initThree()
	})
  }

  // GETS DATA FROM STATE
  getData = async () => {
    const {url} = this.props
    if(url){
    // await axios.get("http://localhost:5000/api/upload").then(response => {
    //   this.setState({
    //     picture: response.data
    //   });
    //  });
    }
    return url
  };
  




  initThree() {
    const {url} = this.props
    console.log("MY URL");
    console.log(url);
   // let stats;
    let camera, scene, renderer;
   // let group;
    let container = document.getElementById("WebGL-output");
    let width = container.clientWidth,
      height = container.clientHeight;

   
    init();
    

    animate();

    function init() {
      scene = new THREE.Scene();
      // group = new THREE.Group();
      // scene.add( group );

      camera = new THREE.PerspectiveCamera(75, width / height, 1, 1000);
      // camera.position.x = -10;
      // camera.position.y = 15;
      camera.position.z = 1;
      camera.target = new THREE.Vector3(0, 0, 0);
      // camera.lookAt( scene.position );

      //TO CONTROL THE IMAGE MOVEMENT
      let orbitControls = new /*THREE.OrbitControls*/ Orbitcontrols(camera, container);
      orbitControls.autoRotate = false;
      // let clock = new THREE.Clock();
      //THE AMBIENT LIGHT
      let ambi = new THREE.AmbientLight(0x686868);
      scene.add(ambi);

      let spotLight = new THREE.DirectionalLight(0xffffff);
      spotLight.position.set(550, 100, 550);
      spotLight.intensity = 0.6;

      scene.add(spotLight);
      // Texture
      let loader = new THREE.TextureLoader();
      
   
      loader.load(url, function(texture) {
        // let geometry = new THREE.SphereGeometry( 200, 20, 20 );
        let geometry = new THREE.SphereGeometry(500, 60, Math.pi * 2);
        geometry.scale(-1, 1, 1);
        let material = new THREE.MeshBasicMaterial({ map: texture });
        let mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      });
    
      renderer = new THREE.WebGLRenderer();
      renderer.setClearColor(0xffffff);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(width, height);
      container.appendChild(renderer.domElement);
      // stats = new Stats();
      // container.appendChild( stats.dom );  //Increase status information
    }

    function animate() {
      requestAnimationFrame(animate);
      render();
      // stats.update();
    }
    function render() {
      renderer.render(scene, camera); 
    }
  }
  render() {
    return (
    
    <div>  

      {/* <h4>
      <Link href="/details">Details</Link>
      </h4> */}

        <div
          style={{
            height: this.props.height,
            width: this.props.width,
          }}
          id="WebGL-output"
         
        />
         
        

        </div>
       
    );
  }
}

export default ThreeMap;
