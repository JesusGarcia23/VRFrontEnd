import React from 'react';
import { Link } from 'react-router-dom';
import EditUser from './EditUser'
import FollowContainer from './FollowContainer'

//{(theUserId !== profileId) ? <button className='goBackBtn' onClick={goBack}>Go back</button> : ''}

const UserProfile = (props) => {
    const { images, currentUser, users, showEdit, followContainer } = props
    const theUserId = currentUser._id
    const profileId = props.match.params.id

    // function goBack() {
    //     const { goBack } = props.history
    //     goBack();
    // }

    function haveLogout(userFollowers) {
        if (theUserId === profileId) {
            return <div className="buttons" >
                <button onClick={props.handleEditProfile} className='editUserProfileIcon'><i class="fas fa-user-edit"></i></button>
            </div>
        } else {
            if (userFollowers.indexOf(theUserId) >= 0) {
                return (<button className="btn btn-sm  btn-primary" onClick={e => props.handleFollow(profileId)}><i className="fa fa-user-minus followBtn"> Unfollow </i></button>)
            } else {
                return (<button className="btn btn-sm  btn-primary" onClick={e => props.handleFollow(profileId)}><i className="fa fa-user-plus followBtn"> Follow </i></button>)
            }
        }
    }

    function havePermission(thePostId) {
        if (theUserId === profileId) {
            return (
                <React.Fragment>
                    <div className='editOrDeletePost'><i class="fas fa-edit editIcon" onClick={e => { props.handleEdit(e, thePostId) }}></i> <i class="fas fa-trash-alt deleteIcon" onClick={e => props.confirmDelete()}></i></div>
                </React.Fragment>)
        } else {
            return;
        }
    }

    const pics = images.filter(image => image.owner._id === profileId)

    // const test = users.filter(theUser => theUser._id === profileId)
    // console.log("these are the test", test)

    const userDetails = users.filter(theUser => theUser._id === profileId)[0]

    const classes = showEdit ? 'editUserFormContainer' : 'editUserFormContainer hide'
    if (userDetails) {
        return (
            <div className='profileContainer'>

                {props.handleShowFollow}
                {followContainer && <div className='followUserContainer'> <FollowContainer users={users} currentUser={currentUser} handleFollow={props.handleFollow} following={userDetails.following} followers={userDetails.followers} listFollowers={props.listFollowers} listFollowing={props.listFollowing} exitContainer={e => props.handleShowFollow(e)} showFollowers={e => props.showFollowers(e)} /> </div>}
                {showEdit && <div className='editUserProfileContainer'>
                    <EditUser exitEdit={props.handleEditProfile} handleUpdate={props.onChangeValue} currentUser={currentUser} submitUpdate={props.updateUser} changeFile={props.changeFile} styling={classes} />
                </div>}
                <div className="user-profile">
                    <span className="user-profile-img">{currentUser && <img src={userDetails.imageUrl} className='userProfileImg' alt="profile-img" />}
                        {haveLogout(userDetails.followers)}
                    </span>

                    <div className='user-profile-nameAbio'>
                        <div className='user-profile-username'>{userDetails.username}</div>
                        <div className='user-profile-bio'>{userDetails.bio}</div>
                    </div>

                    <div className='userPostAndFollowers'>
                        <div className='userPostCounter'>
                            <div className='userPostCounterText'>Posts: {pics.length}</div>
                        </div>
                        <div className='userFollowersContainer'>
                            <div className='userFollowers'>
                                <span className="followUser"><button className='followBtnProfile' onClick={e => props.handleShowFollow(e)}>Followers:</button> {userDetails.followers.length}</span>
                            </div>
                            <div className='userFollowers'>
                                <span className="followUser"><button className='followBtnProfile' onClick={e => props.handleShowFollow(e)}>Following:</button> {userDetails.following.length}</span>
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

                                            <Link to={`/post/${pic._id}`} style={{ textDecoration: 'none', color: 'white' }}>See the full Post</Link>
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