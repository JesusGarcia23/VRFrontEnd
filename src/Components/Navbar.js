import React from 'react';
import {Link, Redirect} from 'react-router-dom'
import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'

const NavBar = (props) =>{

  function displayNotifications(notifications){
    console.log("WORKING")
    console.log(notifications)
    if(notifications.length){
      notifications.sort((a,b) => {
if(a.createdAt < b.createdAt){
  return 1;
}else if(a.createdAt > b.createdAt){
  return -1
}else{
  return 0
}
      })
return(
      <NavDropdown title="Notifications" id="basic-nav-dropdown">
      {notifications && notifications.map(eachNotification => {
        if(eachNotification.type === "Like" || eachNotification.type === "Comment" ){
          return (
            <React.Fragment key={eachNotification._id}>
            <NavDropdown.Item href={`/post/${eachNotification.imageTo._id}`}>
            <span className='notification-userImage'><img src={eachNotification.fromWho.imageUrl} alt='notiPicture'></img></span> {eachNotification.fromWho.username} {eachNotification.event}
           <span><img src={eachNotification.imageTo.image} style={{width:"30px", height:"30px", borderRadius:50}} alt='notiPostPicture'></img></span>
            </NavDropdown.Item>
          <NavDropdown.Divider />
          </React.Fragment>)
        }else if(eachNotification.type === "Follow"){
          return (
            <React.Fragment key={eachNotification._id}>
            
            <Link to={`/profile/${eachNotification.fromWho._id}`} style={{ textDecoration: 'none', color: 'black' }} className='dropdown-item'>
            <span className='notification-userImage'><img src={eachNotification.fromWho.imageUrl} alt='notiPicture'></img></span> {eachNotification.fromWho.username} {eachNotification.event}
            </Link>
        
          <NavDropdown.Divider />
          </React.Fragment>
          )
        }else{
          return '';
        }
    
      })}
    </NavDropdown>
    )

      // notifications.map(eachNotifications => {
      //   return (
      //     <React.Fragment>
      //     <NavDropdown.Item href="#action/3.1">{eachNotifications.event}</NavDropdown.Item>
      //    
      //     </React.Fragment>
      //   )
      // })
    }
  }
  
if(props){
        return(
          <React.Fragment>
          <Navbar bg="dark" variant='dark' expand="lg">
          <Navbar.Brand href="/home">TriShare</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          {props.currentUser ? <Nav className="mr-auto">
              <Nav.Link href="/world">World</Nav.Link>
              <Nav.Link href="/newPost">New Experience</Nav.Link>
              {displayNotifications(props.notifications)}
              <Form inline>
              <FormControl type="text" placeholder="Search" value={props.queryInput}  onChange={ e => {props.onChangeValue(e)}} name='queryInput' className="mr-sm-2" />
            </Form>
            <Link to={`/profile/${props.currentUser._id}`} className='nav-link'>Profile</Link>
              </Nav> : 
              <Nav className="mr-auto">
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
              </Nav>
            }
          </Navbar.Collapse>
        </Navbar>
        </React.Fragment>
        )
          }
        }

export default NavBar;

// <NavDropdown title="Notifications" id="basic-nav-dropdown">
// {displayNotifications(props.notifications)}
// <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
// <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
// <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>

// <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
// </NavDropdown>