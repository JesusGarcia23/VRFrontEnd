import React from 'react';
import {Link } from 'react-router-dom'
const FollowingList = props => {
    const allUsers = props.allUsers
    const theId = props.match.params.id
    const followingList = allUsers.filter(eachUser => {return eachUser.followers.indexOf(theId) >= 0})

   function goBack(){
    const  { goBack } = props.history
    goBack();
   }


        return (
            <div>
            <button onClick={goBack}>Go back</button>
            <div>FOLLOWING LIST</div>
            {followingList.map(eachUser => {
                return <div key={eachUser.username}>
                    <div>
                    <img src={eachUser.imageUrl} style={{ borderRadius: 70, width: "80px", height: "80px"}} alt="profile-img" />
                    </div>
                    <Link style={{textDecoration: 'none'}} to={`/profile/${eachUser._id}`}>{eachUser.username}</Link>
                    </div>
            })}
            </div>
        )
}

export default FollowingList