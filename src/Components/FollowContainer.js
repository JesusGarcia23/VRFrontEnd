import React from 'react';
import { Link, Redirect } from 'react-router-dom';

const FollowContainer = (props) => {
console.log(props)
const {users, following, followers } = props
let followingList = [];
let followerList = [];
let goToUser = false;
let userId = ''

function goToUserProfile(e, theId){
    e.preventDefault()
   goToUser = true
   userId = theId
}
//onClick={e => {goToUserProfile(e, eachUser._id)}}

function displayFollowingUsers(){
if(following.length > 0 && users.length > 0){
    followingList = users.filter(eachUser => {
        return following.indexOf(eachUser._id) >= 0
    })
}
return followingList.map(eachUser => {
    return <div key={eachUser._id} className='userMiniFollowBox'>
    <img src={eachUser.imageUrl} alt='thumbFollowing' className='pictureFollowList'></img>
    <Link to={`/profile/${eachUser._id}`} className='pictureFollowName' >{eachUser.username}</Link>
    </div>
})
}

if(goToUser){
    return <Redirect to={`/profile/${userId}`}></Redirect> 
}

    return (
  
            <div className='editUserFormContainer'>
            <div className='FollowHeader'>
            <span className='followerContainerHeader' onClick={e => props.showFollowers(e, 'followers')}>Followers</span><span className='followingContainerHeader' onClick={e => props.showFollowers(e, 'following')}>Following</span>
            <button onClick={e => {props.exitContainer(e)}} className='exitBtnFollow'><i class="fas fa-times"></i></button>          
            </div>
            <div className='followListContainer'>
            {props.listFollowing && displayFollowingUsers()}
            {props.listFollowers && <div>THIS IS FOLLOWERS LIST</div>}
            </div>

                </div>
  
    )
}

export default FollowContainer