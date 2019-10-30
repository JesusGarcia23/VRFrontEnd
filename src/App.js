import React, { Component } from "react";
import {Switch, Link, Route, Redirect } from 'react-router-dom'
import ThreeMap from "./Components/ThreeMap";
import SinglePost from './Components/SinglePost';
import PostForm from './Components/PostForm';
import Signup from './Components/user-pages/Signup'
import Login from './Components/user-pages/Login'
import Profile from './Components/Profile';
import Home from './Components/Home'
import "./index.css";
import axios from "axios";
import HomeFeed from './Components/HomeFeed';
import WorldPost from './Components/WorldPost';

//CLOUDINARY
import service from './api/service';
import Navbar from "./Components/Navbar";

class App extends Component {

    state = {
      currentUser: null,
      username: "",
      email: "",
      password: "",
      imageUrl: "",
      imagePost: "",
      caption: "",
      // imageFile: [],
      url: "http://localhost:5000/api/things",
      postImgUrl: "http://localhost:5000/api/upload",
      newPostUrl: 'http://localhost:5000',
      images: [],
      selectedFile: null,
      postMade: false,
      message: "",
      singlePost: null
    };
  
  // state = {
  //   url: "http://localhost:5000/api/things",
  //   images: []
  // };

  async componentDidMount() {
    await this.get_data_torender() 

    axios.get('http://localhost:5000/auth/loggedin', {withCredentials: true})
    .then(responseFromBackend => {

      const { userDoc } = responseFromBackend.data
      this.syncCurrentUser(userDoc);
    })
    .catch(err => console.log("Error while getting the user from the loggedin route ", err))
  }

  syncCurrentUser(user){
    this.setState({ currentUser: user })
  }

  file_upload_change = e => {
    const formData = new FormData();
    formData.append("imageUrl", e.target.files[0]);
    if(!formData === ""){
      this.setState({
        selectedFile: formData
      });
    }
  };

  // MAKE A NEW POST

  
  postNewExp = async(e) => {
    e.preventDefault();
//UPLOAD TO CLOUDINARY
if(this.state.imageFile !== []){
const uploadData = new FormData();
await uploadData.append("imageUrl", this.state.imageFile);

 service.handleUpload(uploadData)
.then(response => {
    console.log('response is: ', response);
    // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
    this.setState({imagePost: response.imageUrl }, () => {

 //CALL TO THE NEW POST ROUTE
 axios.post('http://localhost:5000/createNewPost', this.state, {withCredentials: true})
 .then(theData => {
     console.log("NEW POST!")
     console.log(theData)
     
     this.setState({postMade: true,
    caption: ""})

     setTimeout(
       this.setState({postMade: false}), 5000)
 })
 .catch(err => console.log(err));


})
      
    })
    .catch(err => {
      console.log("Error while uploading the file: ", err);
      console.log(err)
    });
   
  }
}


  // GET ALL THE POSTS TO RENDER FROM DB
  get_data_torender = async () => {
    try {
      // const {url} = this.state
      await axios.get("http://localhost:5000/createNewPost").then(response => {
        console.log(response)
        this.setState({
          images: response.data
        });
      })
    } catch (err) {
      console.log(err);
    }
  };

  //uPDATE FORMS VALUES
  updateForm = (e) => {
    console.log(e.currentTarget)
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })
  }

  //CHANGE IMAGE URL
  changeImgUrl = (e) => {
this.setState({imageUrl: e})
  }

  //CHANGE IMAGE FILES
  changeFile = (e) => {
    console.log(e)
    if(e.size <= 10485760){
    this.setState({imageFile: e,
    message: ""})
  }else{
    this.setState({message: "File size is too big!"})
  }
  }

  //START OF SIGN UP
  makeNewUser = (e) => {
    e.preventDefault();
    if(this.state.imageFile){
               //UPLOAD TO CLOUDINARY
               const uploadData = new FormData();
               uploadData.append("imageUrl", this.state.imageFile);
       
               service.handleUpload(uploadData)
               .then(response => {
                   console.log('response is: ', response);
                   // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
                   this.setState({ imagePost: response.imageUrl }, () => {
                    //CALL TO THE SIGNUP ROUTE
                    axios.post('http://localhost:5000/auth/signup', this.state, {withCredentials: true})
                    .then(theData => {
                        console.log("NEW USER!")
                        console.log(theData)
                        this.setState({finished: true,
                          username: "",
                            email: "",
                            password: "",
                            imageUrl: "",
                            imageFile: [],
                     })

                    })
                    .catch(err => console.log(err));


                  })
                  
             }).catch(err => {
              console.log("Error while uploading the file: ", err);
            })   
                }else{
                   
                   //CALL TO THE SIGNUP ROUTE
                   axios.post('http://localhost:5000/auth/signup', this.state, {withCredentials: true})
                   .then(theData => {
                       console.log("NEW USER!")
                       console.log(theData)
                       this.setState({finished: true,
                        username: "",
                          email: "",
                          password: "",
                          imageUrl: "",
                          imageFile: [],
                   })
                  })
                   .catch(err => console.log(err));
            
                }

                // this.setState({
                //   username: "",
                //   email: "",
                //   password: "",
                //   imageUrl: "",
                //   imageFile: [],
                // })

         
}
// END OF SIGN UP

//LOGIN USER
loginUser = (e) => {
e.preventDefault();
axios.post('http://localhost:5000/auth/login', this.state, {withCredentials: true})
.then(responseFromServer => {
    console.log(responseFromServer.data.userDoc)
    const { userDoc } = responseFromServer.data;
    this.syncCurrentUser(userDoc);
    this.setState({
      username: "",
      password: ""
    })
  
    alert("You are logged in.")
    // return <Redirect to='/profile'/>
})
.catch(err => {
    console.log(err)
    // if(err.response.data) return this.setState({message: err.response.data.message})
})
}


// END OF LOGIN


// LOG OUT USER
logoutUser = () => {
axios.delete('http://localhost:5000/auth/logout', {withCredentials: true})
.then(theUser => {
  console.log("DISCONNECTED!")
  console.log(theUser)
  this.syncCurrentUser(null)
  this.setState({currentUser: null})
})
}

//LIKE POST
handleLike = (e) => {
  console.log(e)

  axios.post(`http://localhost:5000/update/${e}`, this.state.currentUser)
  .then(thePost => {
    console.log(thePost)
  })
  .catch(err => console.log(err));
}


  // {this.state.images && this.renderImages()}
  render() {
    console.log("My USER")
    console.log(this.state);
    // console.log(this.match)
    return (
      <div className="App">
       
        <Navbar currentUser={this.state.currentUser} logoutUser={this.logoutUser}/>
          
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/world" render={(props) => <WorldPost {...props} allPosts={this.state.images} renderPosts={this.worldRender} handleLike={this.handleLike} currentUser={this.state.currentUser}/>}/>
        <Route exact path="/theImg" render={(props) => <SinglePost {...props} myUrl={this.state.images} />}/>
        <Route exact path="/public" render={(props) => <HomeFeed {...props} allPosts={this.state.images} />}/>
        <Route exact path="/newPost" render={(props) => <PostForm {...props} handleSubmit={this.postNewExp} changeFile={this.changeFile} changeUrl={this.changeImgUrl} onChangeValue={this.updateForm} formValues={this.state}/>}/>
        <Route exact path="/signup" render={(props) => <Signup {...props} onChangeValue={this.updateForm} changeFile={this.changeFile} handleSubmit={this.makeNewUser} currentUser = {this.state.currentUser} onUserChange = { userDoc => this.syncCurrentUser(userDoc)} formValues={this.state}/>}></Route>
        <Route exact path="/login" render={(props) => <Login {...props} onChangeValue={this.updateForm}  handleSubmit={this.loginUser} currentUser = {this.state.currentUser} formValues={this.state}/>}></Route>
        <Route exact path="/profile" render={(props) => <Profile {...props} currentUser = {this.state.currentUser}/>}/>
       <Route exact path="/post/:id" render={(props) => <SinglePost {...props} postValues={this.state.images} />}></Route>
        </Switch>
        
        
      </div>
    );
  }
}
//<Route exact path="/">{this.state.images && this.renderImages()}</Route>

export default App;



//OLD CODE 
 // renderImages = () => {
  //   const {images} = this.state.images
  //   return images.map(image => {
  //     return (
  //       <div>
  //       <div>
  //       <ThreeMap 
  //         key={image._id}
  //         {...image}
  //         url={image.imageUrl}
  //       />
  //       </div>
  //       <div>HELLO MY NAME IS JESUS </div>
  //       </div>
  //     )
  //   })
  // };

  //SINGLE POST
// getData = async() => { 
//   // return this.props.myUrl
//   try {
//       await axios.get(`http://localhost:5000${this.props.match.url}`).then(response => {
//         this.setState({
//           images: response.data
//         });
//       });
//     } catch (err) {
//       console.log(err);
//     }
// }

//END SINGLE POST

 //OLD WAY OF MAKE A NEW POST
  // post_new_experience = async e => {
  //   try{
  //   e.preventDefault();
  //   const { postImgUrl } = this.state;
  //   const clone = [...this.state.images];
  //   await axios.post(postImgUrl, this.state.selectedFile)
  //   .then(response => {
  //     clone.push(response.data);
  //     this.setState({
  //       images: clone
  //     });
  //   });
  // }catch(err){
  //   console.log(err)
  // }  
  // };

  // END OF MAKE A NEW POST