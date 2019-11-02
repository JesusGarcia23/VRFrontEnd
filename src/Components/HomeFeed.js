import React from 'react';
import PostCard from './PostCard';
import { Redirect, Link } from 'react-router-dom';

const HomeFeed = props => {
    let feedList = []
    let userList = []
const {currentUser, allPosts} = props
if(currentUser){
     userList = currentUser.following
    if(allPosts.length){
        feedList = allPosts.filter(eachPost => { return userList.indexOf(eachPost.owner._id) >= 0 || eachPost.owner._id === currentUser._id })
    }
}

console.log(feedList)


    if(currentUser !== null){
        return(
            <div>
            <h1>HELLO HOME FEED</h1>
            
            </div>
        )
    }else{
        return  <div>LOADING...</div>
    }

}

export default HomeFeed