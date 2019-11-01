import React from 'react';
import { Link } from 'react-router-dom';

const FollowerList = props => {
const allUsers = props.allUsers
const theId = props.match.params.id
const followerList = allUsers.filter(eachUser => {return eachUser.following.indexOf(theId) >= 0})
console.log(props)

function goBack(){
    const  { goBack } = props.history
    goBack();
   }


    return (
        <div>
        <button onClick={goBack}>Go back</button>
        <div>FOLLOWER LIST</div>
        {followerList.map(eachUser => {
            return <div key={eachUser.username}>
                <div>
                <img src={eachUser.imageUrl} style={{ borderRadius: 70, width: "80px", height: "80px"}} alt="profile-img" />
                </div>
                <Link to={`/profile/${eachUser._id}`}>{eachUser.username}</Link>
                </div>
        })}
        </div>
    )
}

export default FollowerList