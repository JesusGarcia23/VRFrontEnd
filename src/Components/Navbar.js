import React from 'react';
import {Link} from 'react-router-dom';

class Navbar extends React.Component{

    render(){
      console.log(this.props)
        return(
            <nav className="navbar navbar-dark bg-dark">
 
</nav>
        )
    }

}
<Link to="/newPost">New Experience</Link>
<Link to="/signup">Signup</Link>
<Link to="/login">Login</Link>
export default Navbar;