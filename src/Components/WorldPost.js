import React from 'react';
import {Link} from 'react-router-dom';
import Likebtn from './Likebtn';

const WorldPost = props => {


   function isLiked(value, theArray, postId){
      if(value){
         const myId = value._id;
         if(theArray.indexOf(myId) >= 0){
           return( <Likebtn onLike={props.handleLike} postId={postId} theIcon="fas fa-heart likeIcon"/>)
         }else{
            return( <Likebtn onLike={props.handleLike} postId={postId} theIcon="far fa-heart likeIcon"/>)
         }
      }
   }
console.log(props)
if(props.allPosts.length > 0){
     return(
        <React.Fragment>
         <div>
         <h1>World</h1>
         <div className="worldContainer">
         {props.allPosts && props.allPosts.map(image => {
            return <div className="col col-s-12 worldPost" key={image._id} >
            <div>
            <img src={image.owner.imageUrl} width="50px" height="50px" alt="miniProfilePic"></img>
            
            {image.owner.username}
            </div>

            <div className="worldImgContainer">
            <img  className="worldImg" src={image.image}  alt="worldPic" width="100%" height="300px"></img>

            <Link to={`/post/${image._id}`}> <div className="overlayContainer" >
            <div className="textOverlay" id={image._id}>See the full Post</div>
            </div>
            </Link>
            </div>
            <p>{image.likes.length} Likes</p>
            {isLiked(props.currentUser, image.likes, image._id)}
            </div>
         })}
         
         </div>
         </div>
        </React.Fragment>
     )
   }else{
      return (
         <div>NO POSTS!</div>
      )
   }

}

export default WorldPost;