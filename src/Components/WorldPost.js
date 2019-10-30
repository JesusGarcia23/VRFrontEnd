import React from 'react';
import {Link} from 'react-router-dom';
import Likebtn from './Likebtn';

const WorldPost = props => {


        console.log(props)
     return(
        <React.Fragment>
         <div>
         <h1>World</h1>
         <div className="worldContainer">
         {props.allPosts && props.allPosts.map(images => {
             console.log(images)
            return <div className="col col-s-12 worldPost" key={images._id} >
            <div>
            <img src={images.owner.imageUrl} width="50px" height="50px" alt="miniProfilePic"></img>
            
            {images.owner.username}
            </div>

            <div className="worldImgContainer">
            <img  className="worldImg" src={images.image}  alt="worldPic" width="100%" height="300px"></img>

            <Link to={`/post/${images._id}`}> <div className="overlayContainer" >
            <div className="textOverlay" id={images._id}>See the full Post</div>
            </div>
            </Link>
            </div>
            <p>{images.likes.length} Likes</p>
            <Likebtn onLike={props.handleLike} postId={images._id}/>
           
            
            
            </div>
         })}
         
         </div>
         </div>
        </React.Fragment>
     )

}

export default WorldPost;