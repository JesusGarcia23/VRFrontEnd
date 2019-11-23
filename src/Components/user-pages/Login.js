import React from 'react';
import { Redirect } from 'react-router-dom';

const Login = (props) => {

    const { username, password, currentUser } = props.formValues
    if(currentUser){
        return (
            <Redirect to={`/home`}/>
        )
    }else{
    return(
        <div className={props.styling}>
    <div className='loginFormContainer'>
    
        <div className='loginFormHeader'>
        <div className='loginTitleForm'>
        <h1> Login </h1>
        </div>
        <button onClick={e => {props.exitLogin(e)}} className='exitBtnEditUser '><i class="fas fa-times"></i></button>
        </div>
        <form onSubmit ={props.handleSubmit} className='loginFormBody' >

        <div className='loginFormInput'>
        <label> Username: </label>
         <input value={username} onChange={ e => props.onChangeValue(e)} type="text" name="username" placeholder="username" />
         </div>

         <div className='loginFormInput'>
        <label> Password: </label>
        <input value={password} onChange={ e => props.onChangeValue(e)} type="password" name="password" placeholder="***********"/>
        </div>
         <button className='loginFormBtn'> Login </button>

    </form>

    <section>
    {props.message  && <div> { props.message } </div> }
    </section>
    </div>
    </div> 
  
    )
}
}

export default Login;


    // constructor(props){
    //     super(props);
    //     this.state = {
    //         username: "",
    //         password: "",
    //         message: null
    //     }
    // }

    // genericSync(event){
    //     const {name, value} = event.target;
    //     this.setState({[name]: value})
    // }

    // handleSubmit(event){
    //     event.preventDefault();

    //     Axios.post('http://localhost:5000/auth/login', this.state, {withCredentials: true})
    //     .then(responseFromServer => {
    //         console.log(responseFromServer.data.userDoc)
    //         const { userDoc } = responseFromServer.data;
    //         this.props.onUserChange(userDoc);
          
    //         alert("You are logged in.")
    //         // return <Redirect to='/profile'/>
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         // if(err.response.data) return this.setState({message: err.response.data.message})
    //     })
    // }