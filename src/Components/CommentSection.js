import React from 'react';

const CommentSection = (props) => {
    // console.log("LIST COMMENT")
    // console.log(props.allPostComments)
    return (
        <div>
        <input type='text' placeholder="Write a comment...." name='comment' className='commentInput' value={props.comment} onChange={e => {props.updateComment(e)}}></input>
        <button onClick={e => {props.handleComment(e, props.postId)}}>SEND</button>
        </div>
    )
}

export default CommentSection