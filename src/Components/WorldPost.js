import React from 'react';
import {Link} from 'react-router-dom';

class WorldPost extends React.Component {


    
//SINGLE POST
showSinglePost = (e) => {
    console.log(e.target);
    let parent = e.target.firstChild;
    let postId = parent.id;
    console.log(this.props.history)
    this.props.history.push(`/post/${postId}`)
  }
  
  // END OF SINGLE POST

    render(){
        console.log(this.props)
     return(
         <div>
         <h1>World</h1>
         <div className="worldContainer">
         {this.props.allPosts && this.props.allPosts.map(images => {
             console.log(images)
            return <div className="col col-s-12 worldPost" key={images._id} >
            <div>
            <img src={images.owner.imageUrl} width="50px" height="50px" alt="miniProfilePic"></img>
            
            {images.owner.username}
            </div>

            <div className="worldImgContainer">
            <img  className="worldImg" src={images.image}  alt="worldPic" width="100%" height="300px"></img>

            <div className="overlayContainer" onClick={(e) => this.showSinglePost(e)}>
            <div className="textOverlay" id={images._id}>See the full Post</div>
            </div>
            </div>
            <p>{images.caption}</p>
           
            
            
            </div>
         })}
         
         </div>
         </div>
     )
}
}

export default WorldPost;