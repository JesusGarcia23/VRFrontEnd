import React from 'react';

class WorldPost extends React.Component {

    displayAllPosts = () => {
        if(this.props.allPosts.length === 0){  
        this.props.allPosts.map(eachPost => {
            return <div className="worldPost">Heheh</div>
        })
    }else{
        return 0;
    }
    }

    render(){
        console.log(this.props)
     return(
         <div>
         <h1>World</h1>
         <div className="worldContainer">
         {this.props.allPosts && this.props.allPosts.map(images => {
             console.log(images)
            return <div className="col worldPost">
            <div>
            <img src={images.owner.imageUrl} width="50px" height="50px" alt="miniProfilePic"></img>
            
            {images.owner.username}</div>

            <div className="worldImgContainer" data-content="See Full Post">
            <img  className="worldImg" src={images.image}  alt="worldPic" width="100%" height="300px"></img>
            <div className="overlayContainer">
            <div className="textOverlay">See the full Post</div>
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