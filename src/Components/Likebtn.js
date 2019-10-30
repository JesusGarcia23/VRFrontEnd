import React from 'react';

const Likebtn = (props) => {
    return (
        <button className="likeBtn" onClick={() => props.onLike(props.postId)}><i className={props.theIcon}></i></button>
    )
}

export default Likebtn

