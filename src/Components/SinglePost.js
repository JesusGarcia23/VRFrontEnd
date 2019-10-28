import React from 'react';
import ThreeMap from './ThreeMap';
import axios from 'axios'

let height = "50vh"
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

const SinglePost = props => {

      

        // getData = async() => { 
        //     // return this.props.myUrl
        //     try {
        //         await axios.get(`http://localhost:5000${this.props.match.url}`).then(response => {
        //           this.setState({
        //             images: response.data
        //           });
        //         });
        //       } catch (err) {
        //         console.log(err);
        //       }
        // }

        const fullScreen = (e) => {
          e.preventDefault();
          let myDiv = document.getElementById('WebGL-output');
         requestFullscreen(myDiv)
        }


        console.log("PROPS!")
      console.log(props)
      const id = props.match.params.id

      const theArr = props.postValues.filter(eachItem => {
        return eachItem._id === id
      })

      const thePost = theArr[0];
        if(thePost){
            return(
              <React.Fragment>
                <div className="singlePost">
                <div className="singlePostHeader">
                <img src={thePost.owner.imageUrl} width="50px" height="50px" alt="miniProfilePic"></img>
            
                {thePost.owner.username}
                </div>
                <ThreeMap url={thePost.image} height={height} width={width}/>
                <div>{}</div>
                <button onClick={fullScreen}>GO FULLSCREEN</button>
                <div className="singleFooter">
                <div className="singleLikes">
                {thePost.likes.length} Likes
                </div>
                {thePost.caption}
                </div>
                </div>
                </React.Fragment>
            )
        }
        return(
            <div>OH NO!</div>
        )
      
   

}

export default SinglePost;