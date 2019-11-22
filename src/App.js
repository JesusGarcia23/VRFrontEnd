import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom'
import SinglePost from './Components/SinglePost';
import PostForm from './Components/PostForm';
import Signup from './Components/user-pages/Signup'
import Login from './Components/user-pages/Login'
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
import { Header } from "./Components/Header"
import { socket } from "./Components/Header"


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
    appUrl: 'http://localhost:5000',
    herokUrl: 'https://trishare.herokuapp.com',
    lastUrl: '/world',
    images: [],
    profileImgDefault: 'https://res.cloudinary.com/thejacex/image/upload/v1572846104/emptyImage_qqqtqp.png',
    selectedFile: null,
    postMade: false,
    message: "",
    singlePost: null,
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
    // await this.get_data_torender()

    axios.get(`${this.state.appUrl}/auth/loggedin`, { withCredentials: true })
      .then(responseFromBackend => {
        const { userDoc } = responseFromBackend.data
        console.log(userDoc)
        if (userDoc !== undefined) {
          setTimeout(() => { this.get_notifications(userDoc._id) }, 500)
        }
        this.syncCurrentUser(userDoc);
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
            axios.post(`${this.state.appUrl}/createNewPost`, this.state, { withCredentials: true })
              .then(theNewPost => {
                console.log("NEW POST!")
                console.log(theNewPost.data)
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
    console.log('this is users', users)
    this.setState({
      users: users
    })
  }


  get_public_notifications = (notification) => {
    this.setState({
      notifications_collection: notification
    })
  }


  changingData = () => socket.emit('initial_data')


  get_data_torender = (posts) => {
    console.log("this are post", posts)
    this.setState({
      images: posts,
    })
  };


  get_notifications = async (userId) => {
    try {

      await axios.get(`${this.state.appUrl}/getNotifications/${userId}`).then(response => {
        const notificationList = response.data;
        this.setState({
          notifications: notificationList
        })
      }).catch(err => console.log(err))


    } catch (err) {
      console.log(err)
    }
  }

  //END OF GET ALL NOTIFICATIONS FROM DB


  //uPDATE FORMS VALUES
  updateForm = (e) => {
    console.log(e)
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
    console.log(e)
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
          console.log('response is: ', response);
          // after the console.log we can see that response carries 'secure_url' which we can use to update the state 
          this.setState({ imagePost: response.imageUrl }, () => {
            //CALL TO THE SIGNUP ROUTE
            axios.post(`${this.state.appUrl}/auth/signup`, this.state, { withCredentials: true })
              .then(theData => {
                console.log("NEW USER!")
                console.log(theData)
                this.setState({
                  finished: true,
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
    } else {

      //CALL TO THE SIGNUP ROUTE
      axios.post(`${this.state.appUrl}/auth/signup`, this.state, { withCredentials: true })
        .then(theData => {
          console.log("NEW USER!")
          console.log(theData)
          this.setState({
            finished: true,
            username: "",
            email: "",
            password: "",
            imageUrl: "",
            imageFile: [],
          })
        })
        .catch(err => console.log(err));

    }
  }
  // END OF SIGN UP

  //LOGIN USER
  loginUser = (e) => {
    e.preventDefault();
    axios.post(`${this.state.appUrl}/auth/login`, this.state, { withCredentials: true })
      .then(responseFromServer => {
        console.log(responseFromServer.data.userDoc)
        const { userDoc } = responseFromServer.data;
        this.syncCurrentUser(userDoc);
        this.setState({
          username: "",
          password: ""
        })

        alert("You are logged in.")
        if (userDoc !== undefined) {
          setTimeout(() => { this.get_notifications(userDoc._id) }, 500)
        }

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
        axios.put(`${this.state.appUrl}/updatePost/${thePost._id}`, { caption: captionToUse, tags: tagToUse })
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


    //DELETING POSTS
    handleDelete = (thePostId) => {

      const postArray = [...this.state.images]
      const theIndex = postArray.findIndex(postToFind => postToFind._id === thePostId)
      postArray.splice(theIndex, 1)
      this.setState({
        images: postArray,
        showConfirm: false
      })

      axios.post(`${this.state.appUrl}/delete/${thePostId}`)
        .then(responseFromBackend => console.log(responseFromBackend))
        .catch(err => console.log(err))

      window.location = '/home'
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
      console.log(theValue)
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
      console.log(caption)
      const imageList = [...this.state.images];
      const theIndex = imageList.indexOf(thePost)
      let captionToUse = '';
      let tagToUse = []
      let tagsArray = []
      let finalArray = []
      tagToUse = tags
      captionToUse = caption
      console.log(theIndex)
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
      console.log(tagToUse)
      console.log(captionToUse)
      console.log(imageList[theIndex])
      imageList[theIndex].modal = !imageList[theIndex].modal

      this.setState({ images: imageList }, () =>
        axios.put(`${this.state.appUrl}/updatePost/${thePost._id}`, { caption: captionToUse, tags: tagToUse })
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
      }, () => {
        console.log(this.state.showEdit)
      })
    }

    updateUser = (e, theUser) => {
      e.preventDefault();
      const { bio, imageFile, currentUser } = this.state
      console.log(this.state.bio)
      console.log(this.state.imageFile)
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
              axios.put(`${this.state.appUrl}/auth/updateUser/${currentUser._id}`, { bio, imageFile: this.state.imagePost, currentUser }, { withCredentials: true })
                .then(theData => {
                  console.log("PROFILE UPDATED!")
                  console.log(theData.data)
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

                  window.location = `/profile/${currentUser._id}`
                })
                .catch(err => console.log(err));


            })

          }).catch(err => {
            console.log("Error while uploading the file: ", err);
          })
      } else {
        axios.put(`${this.state.appUrl}/auth/updateUser/${currentUser._id}`, { bio, imageFile, currentUser }, { withCredentials: true })
          .then(theData => {
            console.log("PROFILE UPDATED!")
            console.log(theData.data)
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

      axios.post(`${this.state.appUrl}/follow/${userToFollow}`, currentUser)
        .then(responseFromBackend => {
          console.log(responseFromBackend.data)
          console.log(currentUser._id)
          const userList = [...this.state.users]
          const myUser = this.state.currentUser
          const users = responseFromBackend.data
          const user1 = users[users.findIndex(theUser => theUser._id === currentUser._id)]
          const user2 = users[users.findIndex(theUser => theUser._id === userToFollow)]
          console.log(user1)
          console.log(user2)
          const theIndex1 = userList.findIndex(userToFind => userToFind._id === user1._id)
          console.log(theIndex1)
          const theIndex2 = userList.findIndex(userToFind => userToFind._id === user2._id)
          console.log(theIndex2)
          myUser.followers = user1.followers
          myUser.following = user1.following
          userList[theIndex1].followers = user1.followers
          userList[theIndex1].following = user1.following
          userList[theIndex2].followers = user2.followers
          userList[theIndex2].following = user2.following
          console.log("NEW USER LIST")
          console.log(userList)
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

      axios.put(`${this.state.appUrl}/addComment/${postId}`, newComment)
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


    //CHANGE QUERY WITH TAGS
    updateQueryBar = (theTag) => {
      console.log(theTag)
      this.setState({
        queryInput: theTag
      })
    }
  }

  render() {


    return (
      <div className="App">
        <Header />

        <NavBar
          notifications={this.state.notifications_collection}
          currentUser={this.state.currentUser}
          logoutUser={this.logoutUser} lastUrl={this.state.lastUrl}
          onLogout={this.logoutUser} actualUrl={window.location}
        />
        <Switch>
          <Route exact path="/" render={(props) => !this.state.currentUser ? <Home /> : (<Redirect to="/home" />)} />
          <Route path="/world" render={(props) => <WorldPost {...props} allPosts={this.state.images} renderPosts={this.worldRender} handleLike={this.handleLike} currentUser={this.state.currentUser} query={this.state.queryInput} onChangeValue={this.updateForm} />} />
          <Route exact path="/theImg" render={(props) => <SinglePost {...props} myUrl={this.state.images} />} />
          <Route exact path="/home" render={(props) => (<HomeFeed {...props} allPosts={this.state.images} currentUser={this.state.currentUser} handleLike={this.handleLike} />)} />
          <Route exact path="/newPost" render={(props) => <PostForm {...props} handleSubmit={this.postNewExp} changeFile={this.changeFile} changeUrl={this.changeImgUrl} onChangeValue={this.updateForm} formValues={this.state} />} />
          <Route exact path="/signup" render={(props) => <Signup {...props} onChangeValue={this.updateForm} changeFile={this.changeFile} handleSubmit={this.makeNewUser} currentUser={this.state.currentUser} onUserChange={userDoc => this.syncCurrentUser(userDoc)} formValues={this.state} />}></Route>
          <Route exact path="/login" render={(props) => <Login {...props} onChangeValue={this.updateForm} handleSubmit={this.loginUser} currentUser={this.state.currentUser} formValues={this.state} />}></Route>
          <Route exact path="/post/:id" render={(props) => <SinglePost {...props} postValues={this.state.images} onDelete={this.handleDelete} cancelDelete={this.cancelDelete} confirmDelete={this.confirmDelete} showConfirm={this.state.showConfirm} handleLike={this.handleLike} handleEdit={this.editPost} updatePost={this.updatePost} currentUser={this.state.currentUser} onChangeValue={this.updateForm} comment={this.state.comment} handleComment={this.handleComment} updateQuery={this.updateQueryBar} />}></Route>

          <Route exact path="/profile/:id" render={(props) =>
            this.state.currentUser ?
              (<UserProfile {...props}
                images={this.state.images}
                currentUser={this.state.currentUser}
                users={this.state.users}
                showEdit={this.state.showEdit}
                handleFollow={this.handleFollow}
                onChangeValue={this.updateForm}
                handleEditProfile={this.showEditUser}
                changeFile={this.changeFile}
                updateUser={this.updateUser}
                handleShowFollow={this.showFollow}
                followContainer={this.state.followContainer}
                showFollowers={this.showFollowers}
                listFollowing={this.state.listFollowing}
                listFollowers={this.state.listFollowers}
              />) :
              (<Redirect to="/login" />)} />

        </Switch>
      </div>
    );
  }
}


export default App;


