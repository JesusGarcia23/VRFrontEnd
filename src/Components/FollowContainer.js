import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const FollowContainer = (props) => {
//console.log(props)
const {users, following, followers, listFollowing, listFollowers, currentUser } = props
let followingList = [];
// let followerList = [];

let followingClasses = listFollowing ? 'followingContainerHeaderDark' : 'followingContainerHeader'
let followerClasses = listFollowers ? 'followerContainerHeaderDark' : 'followerContainerHeader'

function isFollowing(myUser, eachUser){
if(eachUser._id !== myUser._id){
    if(myUser.following.indexOf(eachUser._id) >= 0){
        return <button className="btn btn-sm  btn-primary" onClick={e => props.handleFollow(eachUser._id)}><i className="fa fa-user-minus followBtn"> Unfollow </i></button>
    }else{
        return   <button className="btn btn-sm  btn-primary" onClick={e => props.handleFollow(eachUser._id)}><i className="fa fa-user-plus followBtn"> Follow </i></button>
    }
   
}else{
    return <div></div>;
}
}

function displayFollowingUsers(theArray, theUser){
if(theArray.length > 0 && users.length > 0){
    followingList = users.filter(eachUser => {
        return theArray.indexOf(eachUser._id) >= 0
    })
return followingList.map(eachUser => {
    return <div key={eachUser._id} className='userMiniFollowBox'>
    <span className='followThumbImgName'>
    <img src={eachUser.imageUrl} alt='thumbFollowing' className='pictureFollowList'></img>
    <span onClick={e => {props.exitContainer(e)}}><Link to={`/profile/${eachUser._id}`} className='pictureFollowName' >{eachUser.username}</Link></span>
    </span>
    {theUser && isFollowing(theUser, eachUser)}
    </div>
})
}else{
    return <div>NO USERS!</div>
}
}

    return (
  
            <div className='editUserFormContainer'>
            <div className='FollowHeader'>
            <span className={followerClasses} onClick={e => props.showFollowers(e, 'followers')}>Followers</span><span className={followingClasses} onClick={e => props.showFollowers(e, 'following')}><span className='followingText'>Following</span> <button onClick={e => {props.exitContainer(e)}} className='exitBtnFollow'><i class="fas fa-times"></i></button> </span>        
            </div>
            <div className='followListContainer'>
            {listFollowing && displayFollowingUsers(following, currentUser)}
            {listFollowers && displayFollowingUsers(followers, currentUser)}
            </div>

                </div>
  
    )
}

export default FollowContainer