import React from 'react';
import {Link} from 'react-router-dom';
import Likebtn from './Likebtn';

const WorldPost = props => {

   console.log(props)
   let arrayOfPosts = []

   function isLiked(value, theArray, postId){
      console.log("LIST OF LIKES")
      console.log(theArray)
      if(value){
         const myId = value._id;
         if(theArray.findIndex(theId => theId._id === myId) >= 0){
           return( <Likebtn onLike={props.handleLike} postId={postId} theIcon="fas fa-heart likeIcon"/>)
         }else{
            return( <Likebtn onLike={props.handleLike} postId={postId} theIcon="far fa-heart likeIcon"/>)
         }
      }
   }
let {query} = props
// console.log(props.allPosts)


if(query !== ''){
   let theQuery = query.toLowerCase();
let queryList = props.allPosts.filter(eachPost => { return  eachPost.tags.join('').toLowerCase().includes(theQuery)})
arrayOfPosts = queryList
}else{
   if(props.allPosts.length > 0){
   arrayOfPosts = props.allPosts
   }
}

if(arrayOfPosts.length > 0){
     return(
        <React.Fragment>
         <div>
         <h1>World</h1>
         <div className="worldContainer">
         {arrayOfPosts && arrayOfPosts.map(image => {
            return <div className="worldPost" key={image._id} >
            <div>
            <img src={image.owner.imageUrl} style={{width:"50px", height:"50px", borderRadius:50}} alt="miniProfilePic"></img>
            
           <Link to={`/profile/${image.owner._id}`}> {image.owner.username}</Link>
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