import React from 'react';
import Likebtn from './Likebtn'
import { Link } from 'react-router-dom';

const HomeFeed = props => {
    let feedList = []
    let userList = []
const {currentUser, allPosts} = props
if(currentUser){
     userList = currentUser.following
    if(allPosts.length){
        feedList = allPosts.filter(eachPost => { return userList.indexOf(eachPost.owner._id) >= 0 || eachPost.owner._id === currentUser._id })
    }
}

function isLiked(value, theArray, postId){
    if(value){
       const myId = value._id;
       if(theArray.findIndex(theId => theId._id === myId) >= 0){
         return( <Likebtn onLike={props.handleLike} postId={postId} theIcon="fas fa-heart likeIcon"/>)
       }else{
          return( <Likebtn onLike={props.handleLike} postId={postId} theIcon="far fa-heart likeIcon"/>)
       }
    }
 }

  //GET THE POST CREATION DATE
  const postTime = (e) => {
    return new Date(e).toDateString()
  }

 //SORT ALL THE IMAGES FROM THE RECENT TO THE OLDEST ONE
const sortedList = feedList.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt)
})

    if(currentUser !== null){
        return(
            <div>

            <div>
            {feedList.length > 0 ? sortedList.map(eachPost => {
                return <div className=" col-s-12 feedPost" key={eachPost._id} >
            <div>
            <img src={eachPost.owner.imageUrl} style={{width:"50px", height:"50px", borderRadius:50}} alt="miniProfilePic"></img>
            
           <Link to={`/profile/${eachPost.owner._id}`}> {eachPost.owner.username}</Link>
            </div>

            <div className="worldImgContainer">
            <img  className="worldImg" src={eachPost.image}  alt="worldPic" width="100%" height="300px"></img>

            <Link to={`/post/${eachPost._id}`}> <div className="overlayContainer" >
            <div className="textOverlay" id={eachPost._id}>See the full Post</div>
            </div>
            </Link>
            </div>
            <p>{eachPost.likes.length} Likes</p>
            {isLiked(props.currentUser, eachPost.likes, eachPost._id)}
            <p>{eachPost.caption}</p>
            <p>{postTime(eachPost.createdAt)}</p>
            </div>
            }): <div>START FOLLOWING PEOPLE <Link to='/world'>(SEE WORLD) </Link>OR UPLOAD YOUR OWN EXPERIENCES!</div>}
            </div>
            </div>
        )
    }else{
        return  <div>LOADING...</div>
    }

}

export default HomeFeed