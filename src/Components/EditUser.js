import React from 'react';

//let img = ''

const EditUser = (props) => {
    const { currentUser } = props

    function changeFile(e){
        if(e.target.files[0].size <= 10485760){
            // let newImg = URL.createObjectURL(e.target.files[0])
           // img = newImg;
            props.changeFile(e.target.files[0])
        }
    }

    return(
        <div>
        <form onSubmit={ e => props.submitUpdate(e, currentUser)}>
        <input type='file' onChange={e => changeFile(e)}></input>
        <textarea type="text" name="bio" placeholder={currentUser.bio} onChange={e => props.handleUpdate(e)} />
        <button>Update profile</button>
        </form>
        </div>
    )
}

export default EditUser;