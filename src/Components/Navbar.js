import React from 'react';
import {Link} from 'react-router-dom';

class Navbar extends React.Component{

    render(){
      if(this.props.currentUser){
        return(
          <div>
          <ul>
          <li><button onClick={this.props.logoutUser}>Logout</button></li>
          <li><Link to="/newPost">New Experience</Link></li>
          <li><Link to="/world">World</Link></li>
          </ul>
          </div>
        )
      }else{
        return(
          <div>      
 <ul>
 <li><Link to="/login">Login</Link></li>
 <li><Link to="/signup">Signup</Link></li>

 </ul>
 </div>
        )
}

    }

}


export default Navbar;