import React from 'react';
import ThreeMap from './ThreeMap';
import { Redirect } from 'react-router-dom';


class PostForm extends React.Component{

    
     state = {
    imageUrl: "",
    imageFile: [],
    redirect: false,


    }

    componentDidMount(){
        setTimeout(() => {
            this.setState({redirect: true})}, 2000)
    }

    //STYLING 
    canvasStyle = {
        height: "200px",
        width: "600px"
    }

    height = "350px"
    width = "62vw"

    style = {
        "display": "block",
        "margin-top": "100px",
        "margin-left": "auto",
        "margin-right": "auto",
        "max-width": "600px",
        "height": "300px",
        alignText: "center",
        "border": "1px solid black"
    }

    textAreaStyle = {
        height: "100px",
        width: "40vw",
        "margin": "20px auto",
        'resize': 'none',
        fontSize: "20px",
        display: "block"
    }

    textTagsArea = {
        height: "50px",
        width: "40vw",
        'margin-right': '50px'
    }

    canvasContainer = {
        "display": "block",
        "border": "1px solid green", 
        "margin": "20px 18vw",
        height: "350px",
        width: "62vw"
    }

    createButton = {
        "display": "block",
        "margin": "auto"

    }

    formStyle = {
        justifyContent: "center",
        alignText: "center"
    }

    tagsContainer = {
        display: "flex",
        'justify-content': 'flex-start',
        'align-items': "center",
        border: "1px solid black",

    }
// END OF STYLING

    uploadPost = (e) => {
e.preventDefault();
console.log(e.target);
    }

    seePreview = (e) => {
        e.preventDefault();

        console.log(e.target.files);
        if(e.target.files[0] && e.target.files[0].size <= 10485760){
        let newImg = URL.createObjectURL(e.target.files[0])
        this.props.changeFile(e.target.files[0])
        this.props.changeUrl(newImg)
    
        this.setState({
            imageUrl: newImg,
            imageFile: e.target.files[0]})

        this.changePreview(newImg)
        
        let myInput = document.getElementById('myFileList')
        myInput.setAttribute('disabled', true);
        myInput.className = "inputDisabled"
    }else{
        this.props.changeFile(e.target.files[0])
    }
    }

    changePreview = (value) => {
    
        return (
            <div style={this.canvasStyle}>
            {this.state.imageUrl && <ThreeMap url={value} height={this.height} width={this.width}/>}
            </div>
        )
   
    }

    // changeText = (e) =>{
    //     this.setState({
    //         [e.currentTarget.name]: e.currentTarget.value
    //     })
    // }

    removePicture = (e) => {
       e.preventDefault();
        let myFileList = document.getElementById('myFileList');
        myFileList.removeAttribute('disabled');
        myFileList.value = null
        myFileList.className = "inputfile"
        this.setState({imageUrl: "",
        imageFile: []
    })
    }

    render(){
        const {caption, tags, currentUser, postMade} = this.props.formValues
        if(currentUser && !postMade){
        return(
            <div className="formPost">
            <h1>New Post</h1>
            {this.props.formValues.message}
            <form style={this.formStyle} onSubmit={this.props.handleSubmit}>

            <input type="file" onChange={this.seePreview} id="myFileList" className="inputfile"></input>
            <label for="myFileList">Choose a file</label>
            <label>(File size max 10 Mb)</label>

            <button onClick={this.removePicture} className="removeBtn">REMOVE</button>
          
            
            <div style={this.canvasContainer} id="myCanvasContainer">
            {this.changePreview(this.state.imageUrl)}
            </div>
           
           
            <textarea style={this.textAreaStyle} type="text" value={caption} onChange={ e => this.props.onChangeValue(e)} name="caption" placeholder="write a caption..."></textarea>
           <div style={this.tagsContainer}>
           <span className="tagTitleAndTextarea">
           <span className="tagsTitle">Tags: </span>
           <textarea style={this.textTagsArea} type="text" value={tags} onChange={ e => this.props.onChangeValue(e)} name="tags" placeholder="e.g: #Beach #Sun #Ocean"></textarea>
           </span>
           </div>

            <button style={this.createButton}>CREATE NEW EXPERIENCE</button>
            </form>

            <div>
          
            </div>
            </div>
        )
    }else if(currentUser && postMade){
       return( <Redirect to='/world'/> )
    }else if(this.state.redirect){
        return( <Redirect to='/login'/> )
    }else{
        return (<div>LOADING...</div>)
    }
    }

}
//<img src={this.state.imageUrl} alt="Choose a file" height="300px" width="500px"></img>
export default PostForm;