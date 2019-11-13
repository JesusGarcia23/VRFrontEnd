import React, { Component } from "react";
import {Switch, Route, Redirect } from 'react-router-dom'
import SinglePost from './Components/SinglePost';
import PostForm from './Components/PostForm';
import Signup from './Components/user-pages/Signup'
import Login from './Components/user-pages/Login'
import UserProfile from './Components/UserProfile';
import Home from './Components/Home';
import FollowerList from './Components/FollowerList'
import FollowingList from './Components/FollowingList'
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import HomeFeed from './Components/HomeFeed';
import WorldPost from './Components/WorldPost';
import NavBar from "./Components/NavBar";
//CLOUDINARY
import service from './api/service';


class App extends Component {

    state = {
      users: [],
      currentUser: null,
      username: "",
      email: "",
      password: "",
      imageUrl: "",
      bio: "",
      imagePost: "",
      caption: "",
      tags: [],
      imageFile: [],
      comment: '',
      notifications: [],
      showConfirm: false,
      url: "http://localhost:5000/api/things",
      postImgUrl: "http://localhost:5000/api/upload",
      newPostUrl: 'http://localhost:5000',
      lastUrl: '/world',
      images: [],
      profileImgDefault: 'https://res.cloudinary.com/thejacex/image/upload/v1572846104/emptyImage_qqqtqp.png',
      selectedFile: null,
      postMade: false,
      message: "",
      singlePost: null,
      showEdit: false,
      queryInput: ''
    };
  
  async componentDidMount() {
    await this.get_data_torender() 

    axios.get('http://localhost:5000/auth/loggedin', {withCredentials: true})
    .then(responseFromBackend => {
      const { userDoc } = responseFromBackend.data
      console.log(userDoc)
      this.syncCurrentUser(userDoc);
      setTimeout(() => {this.get_notifications(userDoc._id) }, 500)
    })
    .catch(err => console.log("Error while getting the user from the loggedin route ", err))
  }

  syncCurrentUser(user){
    this.setState({ currentUser: user})
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
 .then(theNewPost => {
     console.log("NEW POST!")
     console.log(theNewPost.data)
     const newPost = theNewPost.data
     const clone = [...this.state.images]
     clone.push(newPost);
     this.setState({postMade: true,
    caption: "",
  images: clone})

     setTimeout(
       this.setState({postMade: false}), 2000)
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

    axios.get("http://localhost:5000/users").then(response => {
      console.log(response)

      this.setState({users: response.data})
    })



  };
  //END OF GET ALL THE POSTS TO RENDER FROM DB

  //GET ALL NOTIFICATIONS FROM DB
get_notifications = async (userId) => {
  try{

    await axios.get(`http://localhost:5000/getNotifications/${userId}`).then(response => {
      const notificationList = response.data;
      this.setState({
        notifications: notificationList
      })
    }).catch(err => console.log(err))

    
  } catch (err){
    console.log(err)
  }
}

  //END OF GET ALL NOTIFICATIONS FROM DB


  //uPDATE FORMS VALUES
  updateForm = (e) => {
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
//END OF UPDATE FORM VALUES


  //START OF SIGN UP
  makeNewUser = (e) => {
    e.preventDefault();
    if(this.state.imageFile.length !== 0){
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
    setTimeout(() => {this.get_notifications(userDoc._id) }, 500)
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
window.location = `/`
}
//END OF LOG OUT USER

//LIKE POST
handleLike = (e) => {
  axios.post(`http://localhost:5000/updateLikes/${e}`, this.state.currentUser, {withCredentials: true})
  .then(responseFromBack => {
    console.log(responseFromBack.data)
  //  console.log(responseFromBack.data.thePost)
    const newPost = responseFromBack.data
    const clone = [...this.state.images]
    const theIndex = clone.findIndex(postToFind => postToFind._id === newPost._id)
   console.log(clone[theIndex]);
    clone[theIndex].likes = newPost.likes
this.setState({images: clone}, () => {
  console.log(this.state.images)
})
  })
  .catch(err => console.log(err));
}
//END OF LIKE POST



//DELETING POSTS
handleDelete = (thePostId) => {
console.log(thePostId)
const postArray = [...this.state.images]
const theIndex = postArray.findIndex(postToFind => postToFind._id === thePostId)
console.log(theIndex)
 postArray.splice(theIndex, 1)
 this.setState({
   images: postArray,
   showConfirm: false
 })

 axios.post(`http://localhost:5000/delete/${thePostId}`)
 .then(responseFromBackend => console.log(responseFromBackend))
 .catch(err => console.log(err))
}

confirmDelete = e => {
  this.setState({
    showConfirm: true
  })
}

cancelDelete = e => {
  this.setState({
    showConfirm: false
  })
}
// END OF DELETING POSTS

//EDIT POSTS
editPost = (e, theValue) => {
  e.preventDefault();
  const postList = [...this.state.images]
  const theIndex = postList.findIndex(thePost => thePost._id === theValue)
 let postToEdit = postList[theIndex]
 postToEdit.modal = !postList[theIndex].modal
 this.setState({
   images: postList
 })
}

updatePost = (e, thePost) => {
  e.preventDefault();
const {caption, tags} = this.state
console.log(caption)
const imageList = [...this.state.images];
const theIndex = imageList.indexOf(thePost)
let captionToUse = '';
let tagToUse = []
tagToUse = tags
captionToUse = caption

if(captionToUse.length === 0){
  console.log("THERE IS NOTHING!")
  captionToUse = imageList[theIndex].caption
}if(tagToUse.length === 0){
  tagToUse = imageList[theIndex].tags 
}else{
imageList[theIndex].caption = caption
imageList[theIndex].tags = [tags]
}

console.log(tagToUse)
console.log(captionToUse)
imageList[theIndex].modal = !imageList[theIndex].modal

this.setState({images: imageList}, () => 
axios.put(`http://localhost:5000/updatePost/${thePost._id}`, {caption: captionToUse, tags: tagToUse})
.then(theValues => {
  this.setState({
    caption: '',
    tags: []
  })
}).catch(err => console.log("A problem happened getting the values!"))
)
}

//END OF EDIT POST

//EDIT USER BIO/PICTURE
showEditUser = () => {
  this.setState({
    showEdit: !this.state.showEdit
  }, () => {
    console.log(this.state.showEdit)
  }) 
}

updateUser = (e, theUser) => {
  e.preventDefault();
  const { bio, imageFile, currentUser} = this.state
  console.log(this.state.bio)
  console.log(this.state.imageFile)
  if(this.state.imageFile.length !== 0){

    //UPLOAD TO CLOUDINARY
    const uploadData = new FormData();
    uploadData.append("imageUrl", this.state.imageFile);

    service.handleUpload(uploadData)
    .then(response => {
        console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
        this.setState({ imagePost: response.imageUrl }, () => {
         //CALL TO THE SIGNUP ROUTE
         axios.put(`http://localhost:5000/auth/updateUser/${currentUser._id}`, { bio, imageFile: this.state.imagePost, currentUser}, {withCredentials: true})
         .then(theData => {
             console.log("PROFILE UPDATED!")
             console.log(theData.data)
             const listUsers = [...this.state.users]
             const {bio, imageUrl} = theData.data
             const theIndex = listUsers.findIndex(theUser => theUser._id === currentUser._id)
             listUsers[theIndex].bio = bio
             listUsers[theIndex].imageUrl = imageUrl

             this.setState({
              users: listUsers,
                imageUrl: "",
                imageFile: [],
                showEdit: !this.state.showEdit
         })

         window.location = `/profile/${currentUser._id}`
         })
         .catch(err => console.log(err));


       })
       
  }).catch(err => {
   console.log("Error while uploading the file: ", err);
 })   
     }else{
      axios.put(`http://localhost:5000/auth/updateUser/${currentUser._id}`, { bio, imageFile, currentUser}, {withCredentials: true})
      .then(theData => {
          console.log("PROFILE UPDATED!")
          console.log(theData.data)
          const listUsers = [...this.state.users]
          const {bio} = theData.data
          const theIndex = listUsers.findIndex(theUser => theUser._id === currentUser._id)
          listUsers[theIndex].bio = bio
          
          this.setState({
            users: listUsers,
              imageUrl: "",
              imageFile: [],
              showEdit: !this.state.showEdit
       })
       window.location.reload(); 
      })
      .catch(err => console.log(err));

     }

}

//END OF EDIT USER BIO/PICTURE


//FOLLOWING FUNCTIONALITY
handleFollow = userToFollow => {
console.log(userToFollow)
const { currentUser } = this.state

axios.post(`http://localhost:5000/follow/${userToFollow}`, currentUser)
.then(responseFromBackend => {
  console.log(responseFromBackend.data)
  console.log(currentUser._id)
  const userList = [...this.state.users]
  const users = responseFromBackend.data
  const user1 = users[users.findIndex(theUser => theUser._id === currentUser._id)]
  const user2 = users[users.findIndex(theUser => theUser._id === userToFollow)]
console.log(user1)
console.log(user2)
  const theIndex1 = userList.findIndex(userToFind => userToFind._id === user1._id)
  console.log(theIndex1)
  const theIndex2 = userList.findIndex(userToFind => userToFind._id === user2._id)
  console.log(theIndex2)
  userList[theIndex1].followers = user1.followers
  userList[theIndex1].following = user1.following
  userList[theIndex2].followers = user2.followers
  userList[theIndex2].following = user2.following
  console.log("NEW USER LIST")
  console.log(userList)
  this.setState({users: userList})
})

}
//END OF FOLLOWING FUNCTIONALITY

// ADD COMMENTS
handleComment = (e, postId) => {
  e.preventDefault();
  console.log(this.state.comment)
  console.log(postId)
  const newComment = {
    owner: this.state.currentUser,
    message: this.state.comment
  }
  const clone = [...this.state.images]
  console.log(clone.findIndex(thePost => thePost._id === postId))
  const theIndex = clone.findIndex(thePost => thePost._id === postId)
if(theIndex >= 0){
  clone[theIndex].comments.push({user: {
    _id: this.state.currentUser._id,
    username: this.state.currentUser.username,
    imageUrl: this.state.currentUser.imageUrl
  }, comment: this.state.comment})
}

this.setState({
  images: clone,
  comment: ''
})

  axios.put(`http://localhost:5000/addComment/${postId}`, newComment)
  .then(responseFromBackend => console.log(responseFromBackend))
  
  .catch(err => console.log(err))

}

//END OF ADD COMMENTS


//CHANGE QUERY WITH TAGS
updateQueryBar = (theTag) => {
  console.log(theTag)
  this.setState({
    queryInput: theTag 
  })
}


  render() {
    console.log("LIST OF ALL NOTIFICATIONS")
    console.log(this.state.notifications)
    return (
      <div className="App">
       
        <NavBar currentUser={this.state.currentUser} notifications={this.state.notifications} logoutUser={this.logoutUser} lastUrl={this.state.lastUrl} queryInput={this.state.queryInput} onChangeValue={this.updateForm}/>
          
        <Switch>
        <Route exact path="/" component={Home}/>
        <Route exact path="/world" render={(props) => <WorldPost {...props} allPosts={this.state.images} renderPosts={this.worldRender} handleLike={this.handleLike} currentUser={this.state.currentUser} query={this.state.queryInput}/>}/>
        <Route exact path="/theImg" render={(props) => <SinglePost {...props} myUrl={this.state.images} />}/>
        <Route exact path="/home" render={(props) => (<HomeFeed {...props} allPosts={this.state.images} currentUser={this.state.currentUser} handleLike={this.handleLike} />) }/>
        <Route exact path="/newPost" render={(props) => <PostForm {...props} handleSubmit={this.postNewExp} changeFile={this.changeFile} changeUrl={this.changeImgUrl} onChangeValue={this.updateForm} formValues={this.state}/>}/>
        <Route exact path="/signup" render={(props) => <Signup {...props} onChangeValue={this.updateForm} changeFile={this.changeFile} handleSubmit={this.makeNewUser} currentUser = {this.state.currentUser} onUserChange = { userDoc => this.syncCurrentUser(userDoc)} formValues={this.state}/>}></Route>
        <Route exact path="/login" render={(props) => <Login {...props} onChangeValue={this.updateForm}  handleSubmit={this.loginUser} currentUser = {this.state.currentUser} formValues={this.state} />}></Route>
        <Route exact path="/post/:id" render={(props) => <SinglePost {...props} postValues={this.state.images} handleLike={this.handleLike} currentUser={this.state.currentUser} onChangeValue={this.updateForm} comment={this.state.comment} handleComment={this.handleComment} updateQuery={this.updateQueryBar}/>}></Route>
        <Route exact path='/followers/:id' render={(props) => <FollowerList {...props} allUsers={this.state.users}/>}/>
        <Route exact path='/following/:id' render={(props) => <FollowingList {...props} allUsers={this.state.users}/>}/>
        <Route exact path="/profile/:id" render={(props) => 
          this.state.currentUser ? 
          (<UserProfile {...props} 
            images = {this.state.images} 
            currentUser = {this.state.currentUser} 
            users={this.state.users}
            showEdit={this.state.showEdit}
            confirmDelete={this.confirmDelete}
            onLogout={this.logoutUser}
            onDelete={this.handleDelete}
            cancelDelete={this.cancelDelete}
            showConfirm={this.state.showConfirm}
            handleFollow={this.handleFollow}
            handleEdit={this.editPost}
            onChangeValue={this.updateForm}
            handleEditProfile={this.showEditUser}
            changeFile={this.changeFile}
            updateUser={this.updateUser}
            updatePost={this.updatePost}
            />) : 
          (<Redirect to="/login"/>)}/>
        
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