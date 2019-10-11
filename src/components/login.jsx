import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import { Redirect } from 'react-router-dom'


const axios = require('axios');



class Login extends Component {
  constructor(props){
    super(props);
    this.state = {
      email : "",
      password : "",
      redirectTo: null
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  componentDidMount(){
    console.log("login componentDidMount",this.props)
  }


  handleChange = (event, key)=>{
    this.setState({
        [key]   : event.target.value
    })
  }

  handleLogin (e){
      e.preventDefault()
      axios.post('http://localhost:7777/user/login', {
        username: this.state.email,
        password: this.state.password.trim()
      })
      .then((response) =>{
        if (response && response.status === 200) {
          console.log("loggedin--", this.props)
          this.props.updateUser({
            loggedIn: true,
            username: response.data.username,
            name: response.data.name
          })
          this.setState({
            redirectTo: '/'
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render(){
    if (this.state.redirectTo) {
      return <Redirect to={{ pathname: this.state.redirectTo }} />
    } else {
      return (
        <div>
            <Helmet>
                <title>Login</title>
                <meta name="description" content="This is Login form" />
            </Helmet>
            <br/>
            <form>
              <div className="form-group">
                <label htmlFor="email">User Name:</label>
                <input placeholder={"email is your username"} value={this.state.email} onChange={(e) =>this.handleChange(e,"email")} type="email" className="form-control" id="email"/>
              </div>
              <div className="form-group">
                <label htmlFor="pwd">Password:</label>
                <input placeholder={"********"}  value={this.state.password} onChange={(e) =>this.handleChange(e,"password")} type="password" className="form-control" id="pwd"/>
              </div>
              <button onClick={this.handleLogin}  className="btn btn-default">Login</button>
            </form>
        </div>
      );
    }
  }
}



export default Login;