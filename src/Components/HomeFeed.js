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
         return( 
             <div className='likeContainerHome'> 
             <Likebtn onLike={props.handleLike} postId={postId} theIcon="fas fa-heart likeIconHome"/> 
             <span>{theArray.length} Likes</span>
             </div>
            )
       }else{
          return(
              <div className='likeContainerHome'>
            <Likebtn onLike={props.handleLike} postId={postId} theIcon="far fa-heart likeIconHome"/>
            <span>{theArray.length} Likes</span>
            </div>)
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
                return <div className="col-s-12 feedPost" key={eachPost._id} >
            <div className='homePostHeader'>
            <img src={eachPost.owner.imageUrl} style={{width:"50px", height:"50px", borderRadius:50}} alt="miniProfilePic"></img>
            
           <Link style={{textDecoration: 'none', fontSize:20, marginLeft:15}} to={`/profile/${eachPost.owner._id}`}> {eachPost.owner.username}</Link>
            </div>

            <div className="homeImgContainer">
            <img  className="worldImg" src={eachPost.image}  alt="worldPic" width="100%" height="300px"></img>

            <div className="overlayContainer" >
            <div className="textOverlay" id={eachPost._id}>
            <div>
            
            </div>
            {isLiked(props.currentUser, eachPost.likes, eachPost._id)}
            <div className='commentlength-container'>{eachPost.comments.length} Comments</div>
            <Link style={{textDecoration: 'none', color:'white'}} to={`/post/${eachPost._id}`}> 
            <div className='fullPostText'>See the full Post</div>
            </Link>
            </div>
            </div>
           
            </div>
            <div className='homePostFoot'>
            
            <p>{eachPost.caption}</p>
            <p>{postTime(eachPost.createdAt)}</p>
            </div>
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