import React from 'react';
import ThreeMap from './ThreeMap';
import Likebtn from './/Likebtn';
import CommentSection from './CommentSection';
import { Link } from 'react-router-dom'

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
            theCanvas.style.height = "50vh"
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
        function goBack(){
          const  { goBack } = props.history
          goBack();
         }

        function isLiked(value, theArray, postId){
          if(value){
             const myId = value._id;
            //  console.log(theArray)
            //  console.log(theArray.findIndex(theId => theId._id === myId))
             if(theArray.findIndex(theId => theId._id === myId) >= 0){
               return( <Likebtn onLike={props.handleLike} postId={postId} theIcon="fas fa-heart likeIcon"/>)
             }else{
                return( <Likebtn onLike={props.handleLike} postId={postId} theIcon="far fa-heart likeIcon"/>)
             }
          }
       }

        const fullScreen = (e) => {
          e.preventDefault();
          let myDiv = document.getElementById('WebGL-output');
         requestFullscreen(myDiv)
        }

        //GET THE POST CREATION DATE
        const postTime = (e) => {
          return new Date(e).toDateString()
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
              <button onClick={goBack}>Go back</button>
                <div className="singlePost">
                <div className="singlePostHeader">
                <img src={thePost.owner.imageUrl} width="50px" height="50px" alt="miniProfilePic"></img>
            <Link to={`/profile/${thePost.owner._id}`}>{thePost.owner.username}</Link>
                
                </div>
                <ThreeMap url={thePost.image} height={height} width={width}/>
                <div>{}</div>
                <button onClick={fullScreen}>GO FULLSCREEN</button>
                <div className="singleFooter">
                <div className="singleLikes">
                {thePost.likes.length} Likes
                {isLiked(props.currentUser, thePost.likes, thePost._id)}
                </div>
                {thePost.caption}
                <div className='tagName'>
                {thePost.tags.map(eachTag => {
                  return <Link>#{eachTag} </Link>
                }
                  )}
                </div>
                </div>
               <p>{postTime(thePost.createdAt)}</p>
               {props.currentUser && <CommentSection comment={props.comment} allPostComments={thePost.comments} updateComment={props.onChangeValue} handleComment={props.handleComment} postId={thePost._id}/>}
               
                </div>
                </React.Fragment>
            )
        }
        return(
            <div>OH NO!</div>
        )
      
   

}

export default SinglePost;