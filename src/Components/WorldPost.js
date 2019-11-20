import React from 'react';
import {Link} from 'react-router-dom';
import Likebtn from './Likebtn';

const WorldPost = props => {

   console.log(props)
   let arrayOfPosts = []

   function isLiked(value, theArray, postId){
      if(value){
         const myId = value._id;
         if(theArray.findIndex(theId => theId._id === myId) >= 0){
           return( 
              <div className='likeContainerWorld'>
            <Likebtn onLike={props.handleLike} postId={postId} theIcon="fas fa-heart likeIconWorld"/>
            <span>{theArray.length} Likes</span>
            </div>)
         }else{
            return(
               <div className='likeContainerWorld'>
               <Likebtn onLike={props.handleLike} postId={postId} theIcon="far fa-heart likeIconWorld"/>
               <span>{theArray.length} Likes</span>
               </div>)
         }
      }
   }
let {query, currentUser} = props
// console.log(props.allPosts)


if(query !== ''){
   let theQuery = query.toLowerCase();
let queryList = props.allPosts.filter(eachPost => { return  eachPost.tags.join('').toLowerCase().includes(theQuery)})
arrayOfPosts = queryList
}else{
   arrayOfPosts = props.allPosts
   }


if(currentUser && arrayOfPosts.length > 0){
     return(
    
         <div>
         <input type="text" placeholder="Search" onChange={ e => {props.onChangeValue(e)}} name='queryInput' className="mr-sm-2 worldSearchInput" />
         <h1>Explore the World</h1>
         <div className="worldContainer">
         {arrayOfPosts && arrayOfPosts.map(image => {
            return <div className="worldPost" key={image._id} >
            <div className="worldImgContainer">
            <img  className="worldImg" src={image.image}  alt="worldPic" width="100%" height="300px"/>
            
            
            <div className="overlayContainer" >
            <div className="textOverlayWorld" id={image._id}>
            <div className='worldUserOverlay'>
            <img src={image.owner.imageUrl} style={{width:"70px", height:"70px", borderRadius:50, marginRight:'1vw'}} alt="miniProfilePic"/>
            <Link to={`/profile/${image.owner._id}`} style={{textDecoration: 'none', color:'white', fontSize:20}}> {image.owner.username}</Link> 
            <div className='overlayTextWorld'>
            {isLiked(props.currentUser, image.likes, image._id)} 
            <div className='Worldcommentlength-container'>{image.comments.length} Comments</div>
            </div>
            <Link to={`/post/${image._id}`} style={{textDecoration: 'none', color:'white'}}><div className='fullPostText'> See the full Post</div></Link>
           </div>
            </div> 
            </div>
         
            </div>
            </div>
           
         })}
         
         </div>
         </div>
     )
   }else if(currentUser && arrayOfPosts.length === 0 && query ){
      return (
         <div>
         <input type="text" placeholder="Search" onChange={ e => {props.onChangeValue(e)}} name='queryInput' className="mr-sm-2" />
         <h1>Explore the World</h1>
         <div>OH NO! THERE ARE NO POSTS!</div>
         </div>
      )
   }else{
      return (
         <div>PLEASE LOG IN</div>
      )
   }
}


export default WorldPost;
