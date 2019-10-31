import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import SweetAlert from 'react-bootstrap-sweetalert'


const UserProfile = (props) => {
    console.log("PROFILE")
    console.log(props)
    const { images, currentUser, users } = props
    const theUserId = currentUser._id
    const profileId = props.match.params.id

    function haveLogout(){
        if(theUserId === profileId){
            return   <div className="buttons" >
            <button
                onClick={props.onLogout}
                className="btn btn-sm btn-danger">
                Logout
            </button>


        </div>
        }else{

        }
    }

    function havePermission(){
        if(theUserId === profileId){
        return <button className="btn btn-sm btn-danger" onClick={e => props.confirmDelete()} >
        Delete
    </button>
        }else{

        }
    }

    const pics = images.filter(image => image.owner._id === profileId)
    console.log(pics)

    const userDetails = users.filter(theUser => theUser._id === profileId)[0]
    console.log(userDetails)
    if (currentUser) {
        return (
            <div>
                <div className="user-profile">
                    {currentUser && <img src={userDetails.imageUrl} style={{ borderRadius: 70, width: "150px", height: "150px"}} alt="profile-img" />}
                    <p>{userDetails.username}</p>
                  {haveLogout()}
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
                                {havePermission()}


                                {props.showConfirm === true &&
                                    <SweetAlert
                                        warning
                                        showCancel
                                        confirmBtnText="Confirm!"
                                        confirmBtnBsStyle="danger"
                                        cancelBtnBsStyle="default"
                                        title="Are you sure?"
                                        onConfirm={e => props.onDelete(pic._id)}
                                        onCancel={e => props.cancelDelete()}
                                    >
                                        Do you want to delete this post?
                               </SweetAlert>
                                }

                            </div>
                            )})
                        }       
                    }
                        </div>
                {!pics.length && <p>You dont have any posts </p>}
            </div>

        )
    } else {
        return (
            <Redirect to='/login' />
        )
    }
    return(<div></div>)

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