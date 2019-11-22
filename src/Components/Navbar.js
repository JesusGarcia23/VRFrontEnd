import React from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap'


const NavBar = (props) => {
  const { currentUser } = props
  function displayNotifications(notifications) {

    if (notifications.length) {
      notifications.sort((a, b) => {
        if (a.createdAt < b.createdAt) {
          return 1;
        } else if (a.createdAt > b.createdAt) {
          return -1
        } else {
          return 0
        }
      })

      if (notifications.length) {
        return (
          <NavDropdown title="Notifications" id="dropdown-menu-align-left">
            {notifications && notifications.map(eachNotification => {
              if (eachNotification.type === "Like" || eachNotification.type === "Comment") {
                return (


                  <React.Fragment key={eachNotification._id}>
                    <NavDropdown.Item href={`/post/${eachNotification.imageTo._id}`}>
                      <span className='notification-userImage'><img src={eachNotification.fromWho.imageUrl} alt='notiPicture'></img></span>
                      <span className='notificationText'><span className='notifiUser'>{eachNotification.fromWho.username}</span> <span className='notifiText'> {eachNotification.event}</span></span>
                      <span className='postPictureNoti'><img src={eachNotification.imageTo.image} className='notiPostPicture' alt='notiPostPicture'></img></span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />



                  </React.Fragment>


                )
              } else if (eachNotification.type === "Follow") {
                return (
                  <React.Fragment key={eachNotification._id}>
                  <NavDropdown.Item as='button'  className='notiFollow'>
                    <Link to={`/profile/${eachNotification.fromWho._id}`} style={{ textDecoration: 'none', color: 'black' }}>
                      <span className='notification-userImage'><img src={eachNotification.fromWho.imageUrl} alt='notiPicture'></img></span>
                      <span className='notificationText'><span className='notifiUser'>{eachNotification.fromWho.username}</span><span className='notifiText'> {eachNotification.event}</span></span>
                    </Link>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </React.Fragment>
                )
              } else {
                return;
              }

            })}
          </NavDropdown>
        )
      }

    } else {
      return (<NavDropdown title="Notifications" id="basic-nav-dropdown"></NavDropdown>)
    }
  }

  if (props) {
    return (
      <React.Fragment>
        <Navbar bg="dark" variant='dark' expand="lg">
          <Link to="/home" className='nav-link navBarBrand'><img src='/triShareLogo2.png' className='TriShareLogo' alt='logoApp'></img></Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {props.currentUser ? <Nav className="mr-auto">
              <Link to="/world" className='nav-link'>World</Link>
              <Link to="/newPost" className='nav-link'>New Experience</Link>


              {displayNotifications(props.notifications.filter(notif => notif.toWho._id === currentUser._id))}


              <Link to={`/profile/${props.currentUser._id}`} className='nav-link'><i className="fas fa-user" style={{ marginRight: 3 }}></i>Profile</Link>
              <NavDropdown title={<i class="fas fa-cog"></i>} id="basic-nav-dropdown" className='gearUserNav'>
                <NavDropdown.Item onClick={props.onLogout} style={{ color: 'red' }}>Logout</NavDropdown.Item>
              </NavDropdown>
            </Nav> :
              <Nav className="mr-auto">
                <Link to="/login" className='nav-link'>Login</Link>
                <Link to="/signup" className='nav-link'>Signup</Link>
              </Nav>
            }
          </Navbar.Collapse>
        </Navbar>
      </React.Fragment>
    )
  }
}

export default NavBar;