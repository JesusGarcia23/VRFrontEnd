import React from 'react';
import { Redirect } from 'react-router-dom';
// import the service file since we need it to send (and get) the data to(from) server

let img = ""

const Signup = (props) => {

 
    let finished = false;


  function seePreview(e) {
        e.preventDefault();
        console.log(e.target.files[0]);
        if(e.target.files[0].size <= 10485760){
        let newImg = URL.createObjectURL(e.target.files[0])
        img = newImg;
        props.changeFile(e.target.files[0])
    }
        // this.setState({imageFile: e.target.files[0]})

    }
   
        console.log(props);
        const {username, email, password} = props.formValues
        if(finished || props.currentUser){
            return (
                <Redirect to={`/profile/${props.currentUser._id}`}/>
            )
        }
        return(
            <div className={props.styling}>
        <div className='signupFormContainer'>
        
        <div className='signupContainerForm'>
            <div className='signupFormHeader'>
            <div className='signupTitleForm'>
            <h1> Sign up </h1>
            </div>
            <button onClick={e => {props.exitSignup(e)}} className='exitBtnEditUser exitSignup'><i class="fas fa-times"></i></button>
            </div>

            <form onSubmit={props.handleSubmit} className='signupFormBody'>

            <div className='signupPicContainer'>
            <img src={img} alt="Choose a file" className='signupPic'></img>
            </div>
            
            <div className='signupFormInput'>
            <label>Username: </label>
            <input type="text" name="username" value={username} onChange={ e => props.onChangeValue(e)}></input>
            </div>

            <div className='signupFormInput'>
            <label>Email: </label>
            <input type="email" name="email" value={email} onChange={ e => props.onChangeValue(e)}></input>
            </div>

            <div className='signupFormInput'>
            <label>Password: </label>
            <input type="password" name="password" value={password} onChange={ e => props.onChangeValue(e)}></input>
            </div>

            <div className='signupFormInput'>
            <label>Profile Picture </label>
            <input type="file" onChange={seePreview} name="imageFile"></input>
            </div>
            <button className='signupFormBtn'>Join</button>
            </form>

        </div>
        </div>
        {props.message  && <div> { props.message } </div> }
        </div> 

        )
  
}

export default Signup;

   // constructor(props){
    //     super(props);

    //     this.state={
    //         username: "",
    //         email: "",
    //         password: "",
    //         imageUrl: "",
    //         imageFile: [],
    //         finished: false
    //     }
    // }

    
    // updateValueField = (e) => {
    //     console.log(e.target)
    //     this.setState({
    //         [e.target.name]: e.target.value
    //     })
    // }

    // makeNewUser = (e) => {
    //     e.preventDefault();
    //     if(this.state.imageFile.length > 0){
    //                //UPLOAD TO CLOUDINARY
    //                const uploadData = new FormData();
    //                uploadData.append("imageUrl", this.state.imageFile);
           
    //                service.handleUpload(uploadData)
    //                .then(response => {
    //                    // console.log('response is: ', response);
    //                    // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
    //                    this.setState({ imageUrl: response.secure_url });

    //                    //CALL TO THE SIGNUP ROUTE
    //                    axios.post('http://localhost:5000/auth/signup', this.state, {withCredentials: true})
    //                    .then(theData => {
    //                        console.log("NEW USER!")
    //                        console.log(theData)
    //                        this.setState({finished: true})
    //                    })
    //                    .catch(err => console.log(err));
               
               
    //                  })
    //                  .catch(err => {
    //                    console.log("Error while uploading the file: ", err);
    //                  });
    //                 }else{
                       
    //                    //CALL TO THE SIGNUP ROUTE
    //                    axios.post('http://localhost:5000/auth/signup', this.state, {withCredentials: true})
    //                    .then(theData => {
    //                        console.log("NEW USER!")
    //                        console.log(theData)
    //                        this.setState({finished: true})
    //                    })
    //                    .catch(err => console.log(err));
                
    //                 }

             
    // }