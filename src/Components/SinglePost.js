import React from 'react';
import ThreeMap from './ThreeMap';
import Likebtn from './/Likebtn';
import CommentSection from './CommentSection';
import { Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert';
import Editpost from './Editpost'

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

        //CHECK USER WITH THE POST
        const checkOwner = (thePost, user) => {
          let thePostId = ''
          let userId = ''
          let thePostOwner = ''
          if(user)
          userId = user._id;
          if(thePost){
            thePostId = thePost._id
            thePostOwner = thePost.owner._id
          }
          if(userId === thePostOwner){
            return <div className='editOrDeletePost'><i className="fas fa-edit editIcon" onClick={ e => {props.handleEdit(e, thePostId)}}></i> <i className="fas fa-trash-alt deleteIcon" onClick={e => props.confirmDelete()}></i></div>
          }
        }

      //   console.log("PROPS!")
      // console.log(props)
      const id = props.match.params.id

      const theArr = props.postValues.filter(eachItem => {
        return eachItem._id === id
      })

      const thePost = theArr[0];

        if(thePost){
            return(
              <React.Fragment>
                <div className="singlePost">
                {thePost.modal && <Editpost image={thePost} handleUpdate={props.onChangeValue} submitUpdate={props.updatePost}></Editpost>}
                <div className="singlePostHeader">
                <button className='goBack-btn' onClick={goBack}><i class="fas fa-arrow-left"></i></button>
                <img src={thePost.owner.imageUrl}  style={{width:"65px", height:"65px", borderRadius:50, marginLeft:30, marginRight:30}} alt="miniProfilePic"></img>
            <Link style={{textDecoration: 'none'}} to={`/profile/${thePost.owner._id}`}>{thePost.owner.username}</Link>
                {checkOwner(thePost, props.currentUser)}
                </div>
                <div>
                <ThreeMap url={thePost.image} height={height} width={width}/>
                </div>
                <button onClick={fullScreen} className='expandBtn'><i class="fas fa-expand-arrows-alt expandIcon"></i><div className='expandText'>Expand</div></button>
                <div className="singleFooter">

                <div className="singleLikes">

                <div className='like-counter'>
                {isLiked(props.currentUser, thePost.likes, thePost._id)}
                <span className='likeCount'>{thePost.likes.length} Likes</span>
               </div>

               <div className='post-date'>
               {postTime(thePost.createdAt)}
               </div>
                </div>

                <div className='postCaption'>
                {thePost.caption}
                <div className='tagName'>
                {thePost.tags.map(eachTag => {
                  return <Link to='/world' style={{fontSize:20}} key={eachTag} onClick={e => props.updateQuery(eachTag)}>#{eachTag} </Link>
                }
                  )}
                </div>
                </div>

                <div>
                {<CommentSection currentUser={props.currentUser} comment={props.comment} allPostComments={thePost.comments} updateComment={props.onChangeValue} handleComment={props.handleComment} postId={thePost._id}/>}
                </div>

                </div>
            
                {props.showConfirm === true &&
                  <SweetAlert
                      warning
                      showCancel
                      confirmBtnText="Confirm!"
                      confirmBtnBsStyle="danger"
                      cancelBtnBsStyle="default"
                      confirmBtnCssClass="confirmDelete"
                      title="Are you sure?"
                      onConfirm={e => props.onDelete(thePost._id)}
                      onCancel={e => props.cancelDelete()}
                  >
                      Do you want to delete this post?
             </SweetAlert>
              }


                </div>
                </React.Fragment>
            )
        }
        return(
            <div>OH NO!</div>
        )
      
   

}

export default SinglePost;