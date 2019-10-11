import React, {Component} from 'react';
import {Helmet} from "react-helmet";
const axios = require('axios');

class Signup extends Component {
  constructor(props){
    super(props);
    this.state = {
      name : "",
      email : "",
      password : ""
    }
  }


  handleChange = (event, key)=>{
    this.setState({
        [key]   : event.target.value
    },()=>{
      console.log(this.state)
    })
  }

  handleSubmission = (e)=>{
      e.preventDefault()
      axios.post('http://localhost:7777/user', {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }


  render(){
    return (
      <div>
          <Helmet>
              <title>This is Signup</title>
              <meta name="description" content="This is Signup form" />
          </Helmet>
          <br/>
          <form>
          <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input value={this.state.name} onChange={(e) => this.handleChange(e,"name")} type="text" className="form-control" id="name"/>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email address:</label>
              <input value={this.state.email} onChange={(e) =>this.handleChange(e,"email")} type="email" className="form-control" id="email"/>
            </div>
            <div className="form-group">
              <label htmlFor="pwd">Password:</label>
              <input  value={this.state.password} onChange={(e) =>this.handleChange(e,"password")} type="password" className="form-control" id="pwd"/>
            </div>
            <button onClick={this.handleSubmission}  className="btn btn-default">Signup</button>
          </form>
      </div>
    );
  }
}



export default Signup;