import React from 'react';

class Profile extends React.Component{
  

render(){
    const { currentUser } = this.props
    if(currentUser !== null){
        return (
            <div>
            <h1> HELL YEAH! PROFILE PAGE!</h1>
           </div>
        )
    }else{
    return (
        <div>GO TO LOGING PAGE!</div>
    )
}
}
    
}

export default Profile;