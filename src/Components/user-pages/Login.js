import React from 'react';
import { Redirect } from 'react-router-dom'
class Login extends React.Component {

    message = null

    render(){
        const { username, password, currentUser } = this.props.formValues
        if(currentUser){
            return (
                <Redirect to={`/home`}/>
            )
        }else{
        return(
            <div>
            <section>

            <h2> Login </h2>

            <form onSubmit ={this.props.handleSubmit} >

                <label> Username: </label>
                 <input value={username} onChange={ e => this.props.onChangeValue(e)} type="text" name="username" placeholder="username" />



                <label> Password</label>
                <input value={password} onChange={ e => this.props.onChangeValue(e)} type="password" name="password" placeholder="***********"/>
                 <button> Login </button>

            </form>

            {/* if the message is not null (basically if there's a message) then show it in this <div> tag */}

            { this.message && <div> { this.message } </div> }

        </section>
            
            </div>
        )
    }
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