import React from 'react';

let img = ''

const EditUser = (props) => {
    const { currentUser } = props
    
    function changePicture(e){
        if(img === ''){
           return <img src={currentUser.imageUrl} alt="Choose a file" className='editUserPicture'></img>
        }else{
            return <img src={img} alt="Choose a file" className='editUserPicture'></img>
        }
 
    }

    function seePreview(e){
        e.preventDefault();
        console.log(e.target.files[0]);
        if(e.target.files[0].size <= 10485760){
        let newImg = URL.createObjectURL(e.target.files[0])
        img = newImg;
        props.changeFile(e.target.files[0])
    }
        // this.setState({imageFile: e.target.files[0]})

    }

    return(
        <div className='editUserFormContainer'>
        <div className='editUserHeader'>
        <button onClick={e => {props.exitEdit(e)}} className='exitBtnEditUser'><i class="fas fa-times"></i></button>
        </div>
        <form onSubmit={ e => props.submitUpdate(e, currentUser)}>
        {changePicture()}
       
        <input type='file' onChange={seePreview} className='chooseFileUserEdit'></input>
        
        <textarea type="text" name="bio" placeholder={currentUser.bio} onChange={e => props.handleUpdate(e)} className='editUserCaption' />
        <button>Update profile</button>
        </form>
        </div>
    )
}

export default EditUser;