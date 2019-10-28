import React from 'react';
import ThreeMap from './ThreeMap';
import axios from 'axios'

let height = "70vh"
let width = "100vw"
var requestFullscreen = function (ele) {
	if (ele.requestFullscreen) {
		ele.requestFullscreen();
	} else if (ele.webkitRequestFullscreen) {
		ele.webkitRequestFullscreen();
	} else if (ele.mozRequestFullScreen) {
		ele.mozRequestFullScreen();
	} else if (ele.msRequestFullscreen) {
		ele.msRequestFullscreen();
	} else {
		console.log('Fullscreen API is not supported.');
	}
};


var exitFullscreen = function () {
       let theCanvas = document.getElementsByTagName('canvas')[0];
          console.log(theCanvas);
          if(theCanvas.style.height === "100vh"){
            theCanvas.style.height = "70vh"
          }else{
            theCanvas.style.height ="100vh"
          }
};

window.addEventListener('fullscreenchange', exitFullscreen);
window.addEventListener('webkitfullscreenchange', exitFullscreen);
window.addEventListener('mozfullscreenchange', exitFullscreen);
window.addEventListener('MSFullscreenChange', exitFullscreen);

class SinglePost extends React.Component {

        state = {
            images: null,
            height: "70vh"
        }

      async  componentDidMount(){
        await this.getData();
        }

        getData = async() => { 
            // return this.props.myUrl
            try {
                await axios.get(`http://localhost:5000${this.props.match.url}`).then(response => {
                  this.setState({
                    images: response.data
                  });
                });
              } catch (err) {
                console.log(err);
              }
        }

        fullScreen = (e) => {
          e.preventDefault();
          let myDiv = document.getElementById('WebGL-output');
         requestFullscreen(myDiv)
        }


    render(){
      console.log(this.props)
      console.log(this.state)
        if(this.state.images){
            return(
                <div className="singlePost">
                <div></div>
                <ThreeMap url={this.state.images.image} height={height} width={width}/>
                <div>{}</div>
                <button onClick={this.fullScreen}>GO FULLSCREEN</button>
                </div>
            )
        }
        return(
            <div>OH NO!</div>
        )
      
    }

}

export default SinglePost;