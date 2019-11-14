import React from 'react';
import {Link} from 'react-router-dom'

const CommentSection = (props) => {
    // console.log("LIST COMMENT")
    // console.log(props.allPostComments)
    
    const commentList = (allComments) => {
        console.log(allComments)
        if(allComments.length !== 0){
        return (
          <div className="CommentsContainer">
          {allComments.map(eachComment => {
            return (
              <div className='single-comment'>
              <Link style={{textDecoration: 'none'}} to={`/profile/${eachComment.user._id}`}>
              <span className='userCommentName'><img src={`${eachComment.user.imageUrl}`} style={{width:"30px", height:"30px", borderRadius:50, 'margin-left':'20px'}} alt='commentPicUser' ></img> {eachComment.user.username} </span>
              </Link>
              <span className='the-comment'>{eachComment.comment}</span>
              </div>
              )
          })}
          </div>
        )
    }else{
        return (<div>THERE ARE NOT COMMENTS YET</div>)
    }
      }

    return (
        <div>
        {props.allPostComments && commentList(props.allPostComments)}
        {props.currentUser && 
            <div>
            <input type='text' placeholder="Write a comment...." name='comment' className='commentInput' value={props.comment} onChange={e => {props.updateComment(e)}}></input>
        <button onClick={e => {props.handleComment(e, props.postId)}}>Post</button>
            </div> }
     
        </div>
    )
}

export default CommentSection