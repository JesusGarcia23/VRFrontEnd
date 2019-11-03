import React from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../NavBar'
// import the service file since we need it to send (and get) the data to(from) server

let img = ""

class Signup extends React.Component{

 
     finished = false;


    seePreview = (e) => {
        e.preventDefault();
        console.log(e.target.files[0]);
        if(e.target.files[0].size <= 10485760){
        let newImg = URL.createObjectURL(e.target.files[0])
        img = newImg;
        this.props.changeFile(e.target.files[0])
    }
        // this.setState({imageFile: e.target.files[0]})

    }


    render(){
        console.log(this.props);
        const {username, email, password} = this.props.formValues
        if(this.finished || this.props.currentUser){
            return (
                <Redirect to="/profile"/>
            )
        }
        return(
            <div className="SignupForm">
            <section>
            <h2>Sign Up</h2>
            <form onSubmit={this.props.handleSubmit}>
            <label>Username: </label>
            <input type="text" name="username" value={username} onChange={ e => this.props.onChangeValue(e)}></input>
            <label>Email: </label>
            <input type="email" name="email" value={email} onChange={ e => this.props.onChangeValue(e)}></input>
            <label>Password </label>
            <input type="password" name="password" value={password} onChange={ e => this.props.onChangeValue(e)}></input>
            <label>Image </label>
            <input type="file" onChange={this.seePreview} name="imageFile"></input>
            <img src={img} alt="Choose a file"></img>
            <button>Submit</button>
            </form>
            </section>
            </div>
        )
    }

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