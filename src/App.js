import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
import SinglePost from './Components/SinglePost';
import PostForm from './Components/PostForm';
import UserProfile from './Components/UserProfile';
import Home from './Components/Home';
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import HomeFeed from './Components/HomeFeed';
import WorldPost from './Components/WorldPost';
//CLOUDINARY
import service from './api/service';
import NavBar from './Components/Navbar';
import { Header } from "./Components/Header";
import { socket } from "./Components/Header";

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
    notifications_collection: [],
    showConfirm: false,
    url: "http://localhost:5000/api/things",
    postImgUrl: "http://localhost:5000/api/upload",
    lastUrl: '/world',
    images: [],
    profileImgDefault: 'https://res.cloudinary.com/thejacex/image/upload/v1572846104/emptyImage_qqqtqp.png',
    selectedFile: null,
    postMade: false,
    message: "",
    singlePost: null,
    showSignup: false,
      showLogin: false,
    showEdit: false,
    queryInput: '',
    followContainer: false,
    listFollowers: false,
    listFollowing: false
  };

  componentDidMount() {
    socket.emit('initial_data')
    socket.on('get_data', this.get_data_torender)
    socket.on('get_users', this.get_user_data)
    socket.on('get_notifications', this.get_public_notifications)
    socket.on('change_data', this.changingData)
    // socket.on('loggedin', this.syncCurrentUser)

    axios.get(`${process.env.REACT_APP_HEROKU}/auth/loggedin`, { withCredentials: true })
      .then(responseFromBackend => {
        console.log(responseFromBackend.data)
        const { userDoc } = responseFromBackend.data
        if(userDoc !== undefined){
          this.syncCurrentUser(userDoc)
        }
      })
      .catch(err => console.log("Error while getting the user from the loggedin route ", err))
  }

  syncCurrentUser = (user) => {
    this.setState({ currentUser: user })
  }

  file_upload_change = e => {
    const formData = new FormData();
    formData.append("imageUrl", e.target.files[0]);
    if (!formData === "") {
      this.setState({
        selectedFile: formData
      });
    }
  };


  postNewExp = async (e) => {
    e.preventDefault();
    //UPLOAD TO CLOUDINARY
    if (this.state.imageFile !== []) {
      const uploadData = new FormData();
      await uploadData.append("imageUrl", this.state.imageFile);

      service.handleUpload(uploadData)
        .then(response => {
          console.log('response is: ', response);
          // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
          this.setState({ imagePost: response.imageUrl }, () => {

            //CALL TO THE NEW POST ROUTE
            axios.post(`${process.env.REACT_APP_HEROKU}/createNewPost`, this.state, { withCredentials: true })
              .then(theNewPost => {
                const newPost = theNewPost.data
                const clone = [...this.state.images]
                clone.push(newPost);
                this.setState({
                  postMade: true,
                  caption: "",
                  images: clone,
                  imagePost: '',
                  tags: [],
                  imageFile: []
                })

                setTimeout(
                  this.setState({ postMade: false }), 1000)
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


  get_user_data = (users) => {
    this.setState({
      users: users
    })
  }

  // logoutUser = () => {
  //   axios.delete(`${process.env.REACT_APP_HEROKU}/auth/logout`, { withCredentials: true })
  //     .then(theUser => {
  //       this.syncCurrentUser(null)
  //       this.setState({ currentUser: null })
  //     })
  //   window.location = `${process.env.REACT_APP_HEROKU}`
  // }
  //END OF LOG OUT USER	

  //LIKE POST	
  handleLike = (e) => {
    console.log(e)
    
    axios.post(`${process.env.REACT_APP_HEROKU}/updateLikes/${e}`, this.state.currentUser, { withCredentials: true })
      .then(responseFromBack => {
         console.log(responseFromBack.data.thePost)	
        const newPost = responseFromBack.data
        const clone = [...this.state.images]
        const theIndex = clone.findIndex(postToFind => postToFind._id === newPost._id)
        clone[theIndex].likes = newPost.likes
        this.setState({ images: clone }, () => {
        })
      })
      .catch(err => console.log(err));
  }

  get_data_torender = (listOfPosts) => {
    console.log(listOfPosts)
  }

  get_public_notifications = (notification) => {
    this.setState({
      notifications_collection: notification
    })
  }


  changingData = () => socket.emit('initial_data')


  get_data_torender = (posts) => {

    this.setState({
      images: posts,
    })
  };


  //uPDATE FORMS VALUES
  updateForm = (e) => {
   // console.log(e)
    this.setState({
      [e.currentTarget.name]: e.currentTarget.value
    })

  }

  //CHANGE IMAGE URL
  changeImgUrl = (e) => {
    this.setState({ imageUrl: e })
  }

  //CHANGE IMAGE FILES
  changeFile = (e) => {
    if (e.size <= 10485760) {
      this.setState({
        imageFile: e,
        message: ""
      })
    } else {
      this.setState({ message: "File size is too big!" })
    }
  }
  //END OF UPDATE FORM VALUES


  //START OF SIGN UP
  makeNewUser = (e) => {
    e.preventDefault();
    if (this.state.imageFile.length !== 0) {
      //UPLOAD TO CLOUDINARY
      const uploadData = new FormData();
      uploadData.append("imageUrl", this.state.imageFile);

      service.handleUpload(uploadData)
        .then(response => {
          // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
          this.setState({ imagePost: response.imageUrl }, () => {
            //CALL TO THE SIGNUP ROUTE
            axios.post(`${process.env.REACT_APP_HEROKU}/auth/signup`, this.state, { withCredentials: true })
              .then(theData => {
                this.setState({
                  finished: true,
                  username: "",
                  email: "",
                  password: "",
                  imageUrl: "",
                  imageFile: [],
                })
                window.location = `${process.env.REACT_APP_HEROKU}`
              })
              .catch(err => console.log(err));


          })

        }).catch(err => {
          console.log("Error while uploading the file: ", err);
        })
    } else {

      //CALL TO THE SIGNUP ROUTE
      axios.post(`${process.env.REACT_APP_HEROKU}/auth/signup`, this.state, { withCredentials: true })
        .then(theData => {
          this.setState({
            finished: true,
            username: "",
            email: "",
            password: "",
            imageUrl: "",
            imageFile: [],
          })
          window.location = `${process.env.REACT_APP_HEROKU}`
        })
        .catch(err => console.log(err));

    }
  }
  // END OF SIGN UP

  //LOGIN USER
  loginUser = (e) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_HEROKU}/auth/login`, this.state, { withCredentials: true })
      .then(responseFromServer => {
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


  updatePost = (e, thePost) => {
    e.preventDefault();
    let { caption, tags } = this.state

    if (tags.length !== 0) {
      tags = tags.split(/[.,\/ -#]/)
    }

    const imageList = [...this.state.images];
    const theIndex = imageList.indexOf(thePost)
    let captionToUse = '';
    let tagToUse = []
    let tagsArray = []
    let finalArray = []
    tagToUse = tags
    captionToUse = caption
    if (captionToUse.length === 0) {
      captionToUse = imageList[theIndex].caption
    } if (tagToUse.length === 0) {
      tagToUse = imageList[theIndex].tags
    } else {
      tagsArray = tagToUse
      finalArray = tagsArray.filter(eachTag => { return eachTag !== "" })

      imageList[theIndex].caption = captionToUse
      imageList[theIndex].tags = finalArray
      imageList[theIndex].modal = !imageList[theIndex].modal

      this.setState({ images: imageList }, () =>
        axios.put(`${process.env.REACT_APP_HEROKU}/updatePost/${thePost._id}`, { caption: captionToUse, tags: tagToUse })
          .then(theValues => {
            this.setState({
              caption: '',
              tags: []
            })
            //() => {
            //   window.location = `/post/${thePost._id}`
            // }
          }).catch(err => console.log("A problem happened getting the values!"))
      )
    }
  }

  //DELETING POSTS
  handleDelete = (thePostId) => {

    const postArray = [...this.state.images]
    const theIndex = postArray.findIndex(postToFind => postToFind._id === thePostId)
    postArray.splice(theIndex, 1)
    this.setState({
      images: postArray,
      showConfirm: false
    })

    axios.post(`${process.env.REACT_APP_HEROKU}/delete/${thePostId}`)
      .then(responseFromBackend => console.log(responseFromBackend))
      .catch(err => console.log(err))
    // window.location = '/home'
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
    // e.preventDefault();
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
    const { caption, tags } = this.state
    const imageList = [...this.state.images];
    const theIndex = imageList.indexOf(thePost)
    let captionToUse = '';
    let tagToUse = []
    let tagsArray = []
    let finalArray = []
    tagToUse = tags
    captionToUse = caption
    if (captionToUse.length === 0) {
      captionToUse = imageList[theIndex].caption
    } if (tagToUse.length === 0) {
      tagToUse = imageList[theIndex].tags
    } else {

    }

    if (typeof tagsArray === "string") {
      tagsArray = tagToUse.split(/[.,\/ -#]/)
    }

    finalArray = tagsArray.filter(eachTag => { return eachTag !== "" })

    imageList[theIndex].caption = captionToUse
    imageList[theIndex].tags = finalArray
    imageList[theIndex].modal = !imageList[theIndex].modal

    this.setState({ images: imageList }, () =>
      axios.put(`${process.env.REACT_APP_HEROKU}/updatePost/${thePost._id}`, { caption: captionToUse, tags: tagToUse })
        .then(theValues => {
          this.setState({
            caption: '',
            tags: []
          })
          //() => {
          //   window.location = `/post/${thePost._id}`
          // }
        }).catch(err => console.log("A problem happened getting the values!"))
    )
  }

  //END OF EDIT POST

  //EDIT USER BIO/PICTURE
  showEditUser = () => {
    this.setState({
      showEdit: !this.state.showEdit
    })
  }

  updateUser = (e, theUser) => {
    e.preventDefault();
    const { bio, imageFile, currentUser } = this.state
    if (this.state.imageFile.length !== 0) {

      //UPLOAD TO CLOUDINARY
      const uploadData = new FormData();
      uploadData.append("imageUrl", this.state.imageFile);

      service.handleUpload(uploadData)
        .then(response => {
          console.log('response is: ', response);
          // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
          this.setState({ imagePost: response.imageUrl }, () => {
            //CALL TO THE SIGNUP ROUTE
            axios.put(`${process.env.REACT_APP_HEROKU}/auth/updateUser/${currentUser._id}`, { bio, imageFile: this.state.imagePost, currentUser }, { withCredentials: true })
              .then(theData => {
                const listUsers = [...this.state.users]
                const { bio, imageUrl } = theData.data
                const theIndex = listUsers.findIndex(theUser => theUser._id === currentUser._id)
                listUsers[theIndex].bio = bio
                listUsers[theIndex].imageUrl = imageUrl

                this.setState({
                  users: listUsers,
                  imageUrl: "",
                  imageFile: [],
                  showEdit: !this.state.showEdit
                })

                // window.location = `/profile/${currentUser._id}`
              })
              .catch(err => console.log(err));


          })

        }).catch(err => {
          console.log("Error while uploading the file: ", err);
        })
    } else {
      axios.put(`${process.env.REACT_APP_HEROKU}/auth/updateUser/${currentUser._id}`, { bio, imageFile, currentUser }, { withCredentials: true })
        .then(theData => {
          const listUsers = [...this.state.users]
          const { bio } = theData.data
          const theIndex = listUsers.findIndex(theUser => theUser._id === currentUser._id)
          listUsers[theIndex].bio = bio

          this.setState({
            users: listUsers,
            imageUrl: "",
            imageFile: [],
            showEdit: !this.state.showEdit
          })
          // window.location.reload();
        })
        .catch(err => console.log(err));

    }

  }

  //END OF EDIT USER BIO/PICTURE


  //FOLLOWING FUNCTIONALITY
  handleFollow = userToFollow => {
    console.log(userToFollow)
    const { currentUser } = this.state

    axios.post(`${process.env.REACT_APP_HEROKU}/follow/${userToFollow}`, currentUser)
      .then(responseFromBackend => {
        const userList = [...this.state.users]
        const myUser = this.state.currentUser
        const users = responseFromBackend.data
        const user1 = users[users.findIndex(theUser => theUser._id === currentUser._id)]
        const user2 = users[users.findIndex(theUser => theUser._id === userToFollow)]
        const theIndex1 = userList.findIndex(userToFind => userToFind._id === user1._id)
        const theIndex2 = userList.findIndex(userToFind => userToFind._id === user2._id)
        myUser.followers = user1.followers
        myUser.following = user1.following
        userList[theIndex1].followers = user1.followers
        userList[theIndex1].following = user1.following
        userList[theIndex2].followers = user2.followers
        userList[theIndex2].following = user2.following
        this.setState({
          users: userList,
          currentUser: myUser
        })
      })

  }
  //END OF FOLLOWING FUNCTIONALITY

  // ADD COMMENTS
  handleComment = (e, postId) => {
    e.preventDefault();
    const newComment = {
      owner: this.state.currentUser,
      message: this.state.comment
    }
    const clone = [...this.state.images]
    console.log(clone.findIndex(thePost => thePost._id === postId))
    const theIndex = clone.findIndex(thePost => thePost._id === postId)
    if (theIndex >= 0) {
      clone[theIndex].comments.push({
        user: {
          _id: this.state.currentUser._id,
          username: this.state.currentUser.username,
          imageUrl: this.state.currentUser.imageUrl
        }, comment: this.state.comment
      })
    }

    this.setState({
      images: clone,
      comment: ''
    })

    axios.put(`${process.env.REACT_APP_HEROKU}/addComment/${postId}`, newComment)
      .then(responseFromBackend => console.log(responseFromBackend))

      .catch(err => console.log(err))

  }

  //END OF ADD COMMENTS

  //DISPLAY FOLLOWING FOLLOWERS LIST CONTAINER
  showFollow = (e) => {
    e.preventDefault();
    console.log(e.currentTarget.innerHTML)
    let theChoice = e.currentTarget.innerHTML
    if (theChoice === 'Followers:') {
      this.setState({
        followContainer: !this.state.followContainer,
        listFollowers: true,
        listFollowing: false
      })
    } else {
      this.setState({
        followContainer: !this.state.followContainer,
        listFollowers: false,
        listFollowing: true
      })
    }


  }
  //DISPLAY FOLLOWER/FOLLOWING LIST
  showFollowers = (e, theValue) => {
    e.preventDefault()
    let theChoice = e.target.innerHTML
    console.log(theValue)
    if (theChoice === 'Followers') {
      this.setState({
        listFollowers: true,
        listFollowing: false
      })
    } else {
      console.log("FOLLOWING!")
      this.setState({
        listFollowers: false,
        listFollowing: true
      })
    }
  }

  //DISPLAY LOGIN FORM
showLoginForm = (e) => {
  e.preventDefault();
  this.setState({
    showLogin: !this.state.showLogin
  })
}

//DISPLAY SIGNUP FORM
showSignupForm = (e) => {
  e.preventDefault();
  this.setState({
    showSignup: !this.state.showSignup
  })
}

//EXIT LOGIN FORM
exitLogin = (e) => {
  e.preventDefault();
  this.setState({
    showLogin: false
  })
}

// EXIT SIGNUP FORM
exitSignup = (e) => {
  e.preventDefault();
  this.setState({
    showSignup: false
  })
}


  //CHANGE QUERY WITH TAGS
  updateQueryBar = (theTag) => {
    console.log(theTag)
    this.setState({
      queryInput: theTag
    })
  }

  logoutUser = () => {
    socket.emit('end', this.state.currentUser)
    axios.delete(`${process.env.REACT_APP_HEROKU}/auth/logout`, { withCredentials: true })
      .then(theUser => {
        console.log("DISCONNECTED!")
        console.log(theUser)
        this.syncCurrentUser(null)
        this.setState({ currentUser: null }, () => {
          window.location = `${process.env.REACT_APP_HEROKU}`
        })
      })
  }

  render() {
    // console.log("CURRENT USER")
    // console.log(this.state.currentUser)
    // console.log(this.state.appUrl);
    return (
      <div className="App">
      <Header/>
       
        <NavBar currentUser={this.state.currentUser} notifications={this.state.notifications} revealLoginForm={this.showLoginForm} revealSignupForm={this.showSignupForm} logoutUser={this.logoutUser} lastUrl={this.state.lastUrl}   onLogout={this.logoutUser} actualUrl={window.location}/>
        <Switch>
        <Route exact path="/" render={(props) => !this.state.currentUser ? <Home {...props} showSignup={this.state.showSignup} showLogin={this.state.showLogin} exitLogin={this.exitLogin} exitSignup={this.exitSignup} onChangeValue={this.updateForm} changeFile={this.changeFile} handleSubmit={this.loginUser} handleSignUp={this.makeNewUser} onUserChange = { userDoc => this.syncCurrentUser(userDoc)} currentUser = {this.state.currentUser} formValues={this.state}/> : (<Redirect to="/home"/>)}/>
        <Route path="/world" render={(props) =>  <WorldPost {...props} allPosts={this.state.images} renderPosts={this.worldRender} handleLike={this.handleLike} currentUser={this.state.currentUser} query={this.state.queryInput} onChangeValue={this.updateForm} />}/>
        <Route exact path="/home" render={(props) => (<HomeFeed {...props} allPosts={this.state.images} currentUser={this.state.currentUser} handleLike={this.handleLike} />) }/>
        <Route exact path="/newPost" render={(props) => <PostForm {...props} handleSubmit={this.postNewExp} changeFile={this.changeFile} changeUrl={this.changeImgUrl} onChangeValue={this.updateForm} formValues={this.state}/>}/>
        <Route exact path="/post/:id" render={(props) => <SinglePost {...props} postValues={this.state.images} onDelete={this.handleDelete} cancelDelete={this.cancelDelete} confirmDelete={this.confirmDelete} showConfirm={this.state.showConfirm} handleLike={this.handleLike} handleEdit={this.editPost} updatePost={this.updatePost} currentUser={this.state.currentUser} onChangeValue={this.updateForm} comment={this.state.comment} handleComment={this.handleComment} updateQuery={this.updateQueryBar}/>}></Route>
        <Route exact path="/profile/:id" render={(props) => 
          this.state.currentUser ? 
          (<UserProfile {...props} 
            images = {this.state.images} 
            currentUser = {this.state.currentUser} 
            users={this.state.users}
            showEdit={this.state.showEdit} 
            handleFollow={this.handleFollow}
            onChangeValue={this.updateForm}
            handleEditProfile={this.showEditUser}
            changeFile={this.changeFile}
            updateUser={this.updateUser}
            handleShowFollow = {this.showFollow}
            followContainer = {this.state.followContainer}
            showFollowers = {this.showFollowers}
            listFollowing = {this.state.listFollowing}
            listFollowers = {this.state.listFollowers}
            />) : 
          (<Redirect to="/login"/>)}/>
        
        </Switch>
        
        
      </div>
    );
  }
}

// BOTH VERSIONS MERGED!

export default App;


