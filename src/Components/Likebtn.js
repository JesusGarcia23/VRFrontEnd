import React from 'react';

const Likebtn = (props) => {

    return (
        <button onClick={() => props.onLike(props.postId)}>Like</button>
    )
}

export default Likebtn