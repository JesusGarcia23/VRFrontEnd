import React from 'react';
import Login from './user-pages/Login'
import Signup from './user-pages/Signup'


const Home = (props) => {

    const {showLogin, showSignup} = props
    const classes = showLogin ? 'LoginFormContainer' : 'LoginFormContainer hide'
    const classesSign = showSignup ? 'SignupFormContainer' : 'SignupFormContainer hide'
        return (
            <div className="HomePage">
            {props.showLogin && 
                <div className='LoginFormContainer'>
                <Login formValues={props.formValues} handleSubmit={props.handleSubmit} onChangeValue={props.onChangeValue} styling={classes} exitLogin={props.exitLogin}></Login></div>}

            {props.showSignup && 
                    <div className='SignupFormContainer'>
                    <Signup formValues={props.formValues} handleSubmit={props.handleSignUp} changeFile={props.changeFile} onChangeValue={props.onChangeValue} styling={classesSign} exitSignup={props.exitSignup}></Signup></div>}


            <div className="HomeItem HomeItem1"><div className='HomeText1'>SHARE</div></div>
            <div className="HomeItem HomeItem2"><div className='HomeText2'>YOUR</div></div>
            <div className="HomeItem HomeItem3"><div className='HomeText3'>WORLD</div></div>
        </div>
        )
  
}

export default Home