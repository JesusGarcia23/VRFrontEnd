import React from 'react';

const CommentSection = (props) => {
    console.log(props.comment)
    return (
        <div>COMMENT SECTION
        <div className="listOfComments"></div>
        <input type='text' placeholder="Write a omment...." className='commentInput' value={props.comment}></input>
        <button>SEND</button>
        </div>
    )
}

export default CommentSection