import React from 'react'

const Edit = (props) => {
    const { image } = props
return (
    <div>
            <h5>Welcome to the edit Form</h5>
            <form onSubmit={e => props.submitUpdate(e, image)} >
                <label htmlFor="tags"> Tags </label>
                <input type="text" name="tags" placeholder={image.tags} value={props.tags} onChange={e => props.handleUpdate(e)} />
                <textarea type="text" name="caption" placeholder={image.caption} value={props.caption} onChange={e => props.handleUpdate(e)} />
                <button className="btn btn-sm btn-success">Save</button>
            </form>
        </div>
)
}

export default Edit