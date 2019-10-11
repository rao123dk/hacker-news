import React, { Component } from 'react';
import {Switch, Route, Link} from 'react-router-dom';
import {Helmet} from "react-helmet";
import axios from 'axios';

import signup from './signup';
import Login from './login';
import Post from './post';
import Question from './Question';
import util  from '../util/index'


class Main extends Component {
  constructor() {
    super()
    this.state = {
      loggedIn: false,
      username: null,
      name:null
    }
  }

  componentDidMount(){
    this.getUser()
  }


  getUser = () => {
    const {loggedIn, username, name} = util.getUserFromLocal('user') || {};
    if(loggedIn){
      this.setState({
        loggedIn: true,
        username: username ,
        name: name
      })
      return;
    }

    //for handling user session or server
    axios.get('http://localhost:7777/user/').then(response => {
      if (response.data.user ) {
        this.setState({
          loggedIn: true,
          username: response.data.user.username ,
          name: response.data.user.name,
        })
      } else {
        this.setState({
          loggedIn: false,
          username: null,
          name : null
        })
      }
    })
  }

  updateUser = (data) => {
    this.setState(data,()=>{
      util.setUserToLocal('user', this.state);
    })
    // localStorage.setItem('user', JSON.stringify(this.state));

  }


  render() {
    return (
      <div>
        <Helmet>
            <title>Main page</title>
            <meta name="description" content="Welcome to rent site" />
        </Helmet>
          <Link to="/home">Home</Link>
        {!this.state.loggedIn ? (<Link to="/signup">Signup</Link>) : null}
        {!this.state.loggedIn ? (<Link to="/login">login</Link>) : null}
        {this.state.loggedIn ? (<Link to="/post">Post</Link>) : null}
        {this.state.loggedIn ? (<Link to="/posts/ask">I have question?</Link>) : null}
        <Switch>
          <Route path='/signup' component={signup} />
          <Route path='/login' render={()=> <Login updateUser={this.updateUser}/>}  />
          <Route path='/post' render={()=> <Post updateUser={this.updateUser}/>}   />
          <Route path='/posts/ask' render={()=> <Question />}   />
        </Switch>
      </div>
    );
  }
}
export default Main;