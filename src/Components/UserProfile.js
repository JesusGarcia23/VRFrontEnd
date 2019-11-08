import React from 'react';
import { Link } from 'react-router-dom';
import EditUser from './EditUser'
import Editpost from '../Components/Editpost'
import SweetAlert from 'react-bootstrap-sweetalert'


const UserProfile = (props) => {
    const { images, currentUser, users, showEdit } = props
    const theUserId = currentUser._id
    const profileId = props.match.params.id

    function goBack(){
        const  { goBack } = props.history
        goBack();
       }

    function haveLogout(userFollowers){
        if(theUserId === profileId){
            return   <div className="buttons" >
            <button
                onClick={props.onLogout}
                className="btn btn-sm btn-danger">
                Logout
            </button>
            <button onClick={props.handleEditProfile}>Edit Profile</button>

        </div>
        }else{
            if(userFollowers.indexOf(theUserId) >= 0){
return (
    <button
                    className="btn btn-sm  btn-primary"
                    onClick={e => props.handleFollow(profileId)}
                >
                    <i className="fa fa-user-minus"> Unfollow </i>
                </button>
)
        }else{
            return (
                <button
                                className="btn btn-sm  btn-primary"
                                onClick={e => props.handleFollow(profileId)}
                            >
                                <i className="fa fa-user-plus"> Follow </i>
                            </button>
            )
        }
    }
    }

    function havePermission(thePostId){
        if(theUserId === profileId){
        return (
        <React.Fragment>
        <button className="btn btn-sm btn-danger" onClick={e => props.confirmDelete()} >
        Delete
        </button>
        <button onClick={ e => {props.handleEdit(e, thePostId)}}>Edit</button>
    </React.Fragment>)
        }else{

        }
    }

    const pics = images.filter(image => image.owner._id === profileId)

    const userDetails = users.filter(theUser => theUser._id === profileId)[0]
    if (currentUser && userDetails) {
        return (
            <div>
            <button onClick={goBack}>Go back</button>
                <div className="user-profile">
                    {currentUser && <img src={userDetails.imageUrl} style={{ borderRadius: 70, width: "150px", height: "150px"}} alt="profile-img" />}
                    <p>{userDetails.username}</p>
                    <p>{userDetails.bio}</p>
                    <Link to={`/followers/${profileId}`}><span className="followUser">Followers: {userDetails.followers.length}</span></Link> 
                  <Link to={`/following/${profileId}`}> <span className="followUser">Following: {userDetails.following.length}</span></Link> 
                  
                  {haveLogout(userDetails.followers)}
                  {showEdit && <EditUser handleUpdate={props.onChangeValue} currentUser={currentUser} submitUpdate={props.updateUser} changeFile={props.changeFile}/>}
                </div>
                    <div className="worldContainer" >
                        {pics && pics.map(pic => {
                            return (
                            <div className="col col-s-12 worldPost" key={pic._id} >
                                <div className="worldImgContainer">
                                    <img className="worldImg" src={pic.image} alt="worldPic" width="100%" height="300px" />
                                    <Link to={`/post/${pic._id}`}> <div className="overlayContainer" >
                                        <div className="textOverlay" id={pic._id}>See the full Post</div>
                                    </div>
                                    </Link>
                                </div>
                                {havePermission(pic._id)}
                                {pic.modal && <Editpost image={pic} handleUpdate={props.onChangeValue} submitUpdate={props.updatePost}></Editpost>}


                                {props.showConfirm === true &&
                                    <SweetAlert
                                        warning
                                        showCancel
                                        confirmBtnText="Confirm!"
                                        confirmBtnBsStyle="danger"
                                        cancelBtnBsStyle="default"
                                        confirmBtnCssClass="confirmDelete"
                                        title="Are you sure?"
                                        onConfirm={e => props.onDelete(pic._id)}
                                        onCancel={e => props.cancelDelete()}
                                    >
                                        Do you want to delete this post?
                               </SweetAlert>
                                }

                            </div>
                            )
                        })
                        }       
                        </div>
                {!pics.length && <p>You dont have any posts </p>}
            </div>

        )
    } else {
        return (
            <div>LOADING...</div>
        )
    }

}

export default UserProfile;

// class Profile extends React.Component{
  

// render(){
//     const { currentUser } = this.props
//     if(currentUser !== null){
//         return (
//             <div>
//             <h1> HELL YEAH! PROFILE PAGE!</h1>
//            </div>
//         )
//     }else{
//     return (
//         <div>GO TO LOGING PAGE!</div>
//     )
// }
// }
    
// }

// export default Profile;