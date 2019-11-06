import React from 'react';
import {Link} from 'react-router-dom'
import {Navbar, Nav, NavDropdown, Form, FormControl} from 'react-bootstrap'

const NavBar = (props) =>{
  
if(props){
        return(
          <React.Fragment>
          <Navbar bg="dark" variant='dark' expand="lg">
          <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
          {props.currentUser ? <Nav className="mr-auto">
              <Nav.Link href="/world">World</Nav.Link>
              <Nav.Link href="/newPost">New Experience</Nav.Link>
              <NavDropdown title="Notifications" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
              <Form inline>
              <FormControl type="text" placeholder="Search" value={props.queryInput}  onChange={ e => {props.onChangeValue(e)}} name='queryInput' className="mr-sm-2" />
            </Form>
            <Link to={`/profile/${props.currentUser._id}`}>Profile</Link>
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
