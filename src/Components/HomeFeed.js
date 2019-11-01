import React from 'react';
import PostCard from './PostCard';
import { Redirect, Link } from 'react-router-dom';

const HomeFeed = props => {

const {currentUser} = props

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