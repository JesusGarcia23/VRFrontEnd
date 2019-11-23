import React from 'react'

let theImageId = ''
const Edit = (props) => {
    const { image } = props
    if(image){
        theImageId = image._id 
    }
    // console.log(theImageId)
return (
    <div className='editUserFormContainer'>
    <div className='editPostHeader'>
    <h2>Update your Post</h2>
    <button onClick={e => {props.exitEdit(e, theImageId)}} className='exitBtnEditUser'><i class="fas fa-times"></i></button>
    </div>
            <form onSubmit={e => props.submitUpdate(e, image)} >
               <h3>Caption</h3>
                <textarea type="text" name="caption" placeholder={image.caption} className='captionFormPost' value={props.caption} onChange={e => props.handleUpdate(e)} />
                <h2>Tags</h2>
                <input type="text" name="tags" placeholder={image.tags} className='tagsFormPost' value={props.tags} onChange={e => props.handleUpdate(e)} />
             
                <button className="btn btn-sm btn-success">Save Changes</button>
            </form>
        </div>
)
}

export default Edit