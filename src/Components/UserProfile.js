import React from 'react';
import { Link } from 'react-router-dom';
import EditUser from './EditUser'
import FollowContainer from './FollowContainer'


const UserProfile = (props) => {
    const { images, currentUser, users, showEdit, followContainer } = props
    const theUserId = currentUser._id
    const profileId = props.match.params.id

    function goBack(){
        const  { goBack } = props.history
        goBack();
       }

    function haveLogout(userFollowers){
        if(theUserId === profileId){
            return   <div className="buttons" >
            <button onClick={props.handleEditProfile} className='editUserProfileIcon'><i class="fas fa-user-edit"></i></button>
        </div>
        }else{
            console.log(userFollowers)
            console.log(userFollowers.indexOf(theUserId))
            if(userFollowers.indexOf(theUserId) >= 0){
return (<button className="btn btn-sm  btn-primary" onClick={e => props.handleFollow(profileId)}><i className="fa fa-user-minus followBtn"> Unfollow </i></button>)
        }else{
            return (<button className="btn btn-sm  btn-primary" onClick={e => props.handleFollow(profileId)}><i className="fa fa-user-plus followBtn"> Follow </i></button> )
        }
    }
    }

    function havePermission(thePostId){
        if(theUserId === profileId){
        return (
        <React.Fragment>
        <div className='editOrDeletePost'><i class="fas fa-edit editIcon" onClick={ e => {props.handleEdit(e, thePostId)}}></i> <i class="fas fa-trash-alt deleteIcon" onClick={e => props.confirmDelete()}></i></div>
    </React.Fragment>)
        }else{
            return;
        }
    }

    const pics = images.filter(image => image.owner._id === profileId)

    const userDetails = users.filter(theUser => theUser._id === profileId)[0]
    const classes = showEdit ? 'editUserFormContainer' : 'editUserFormContainer hide'
    if (userDetails) {
        console.log(userDetails)
        return (
            <div className='profileContainer'>
            {props.handleShowFollow}
            {followContainer && <div className='followUserContainer'> <FollowContainer users={users} following={userDetails.following} followers={userDetails.followers} listFollowers={props.listFollowers} listFollowing={props.listFollowing} exitContainer={e => props.handleShowFollow(e)} showFollowers={e => props.showFollowers(e)}/> </div>}
            {showEdit && <div className='editUserProfileContainer'>
            <EditUser exitEdit={props.handleEditProfile} handleUpdate={props.onChangeValue} currentUser={currentUser} submitUpdate={props.updateUser} changeFile={props.changeFile} styling={classes}/>
            </div>}
               
            {(theUserId !== profileId) ? <button onClick={goBack}>Go back</button> : ''}
                <div className="user-profile">
                   <span className="user-profile-img">{currentUser && <img src={userDetails.imageUrl} style={{ borderRadius: 70, width: "10vw", height: "20vh", marginBottom: 10}} alt="profile-img" />}
                   {haveLogout(userDetails.followers)}
                   </span> 
                  
                   <div>
                   <div className='user-profile-username'>{userDetails.username}</div>
                    <div className='user-profile-bio'>{userDetails.bio}</div>
                    </div>

                    <div className='userPostAndFollowers'>
                    <div className='userPostCounter'>
                    Posts: {pics.length}
                    </div>
                    <div className='userFollowersContainer'>
                    <div>
                    <Link to={`/followers/${profileId}`} style={{textDecoration: 'none', color: 'black'}}><span className="followUser">Followers: {userDetails.followers.length}</span></Link> 
                    </div>
                    <div>
                    <button onClick={e => props.handleShowFollow(e)}>Followers Here</button>
                  <Link to={`/following/${profileId}`} style={{textDecoration: 'none', color: 'black'}}> <span className="followUser">Following: {userDetails.following.length}</span></Link> 
                  </div>
                  </div>
                  </div>

                 </div>
                    <div className="profilePostContainer" >
                        {pics && pics.map(pic => {
                            return (
                            <div className="profilePost" key={pic._id} >
                                <div className="profileImgContainer">
                                    <img className="profileImg" src={pic.image} alt="worldPic" width="100%" height="300px" />
                                     <div className="profileOverlayContainer" >
                                        <div className="textOverlayProfile" id={pic._id}>
                                        {havePermission(pic._id)}

                                        <Link to={`/post/${pic._id}`} style={{ textDecoration: 'none', color:'white'}}>See the full Post</Link>
                                       </div>
                                    </div>
                                </div>

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
