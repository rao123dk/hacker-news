import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import { Redirect } from 'react-router-dom';
import util  from '../util/index'

const axios = require('axios');



class Question extends Component {
  constructor(props){
    super(props);
    this.state = {
      question: "",
      redirectTo: null,
      username: "",
      name : ""
    }
    this.postQuestion = this.postQuestion.bind(this);
  }

  componentDidMount(){
    const {username, name} = util.getUserFromLocal('user') || {};
      this.setState({
        loggedIn: true,
        username: username ,
        name: name
      })

  }

  handleChange = (event, key)=>{
    this.setState({
        [key]   : event.target.value
    })
  }

  postQuestion (e){
      e.preventDefault()
      axios.post('http://localhost:7777/post/ask', {
        question : this.state.question,
        username: this.state.username ,
        name: this.state.name
      })
      .then((response) =>{
        if (response && response.status === 200) {
          this.setState({
            redirectTo: '/post'
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
                <title>ask your question</title>
                <meta name="description" content="ask your question" />
            </Helmet>
            <br/>
            <br/>
            <form>
              <div className="form-group">
                <label htmlFor="email">Question?</label>
                <input placeholder={"ask your question"} value={this.state.question} onChange={(e) =>this.handleChange(e,"question")} type="text" className="form-control" id="question"/>
              </div>
              <button onClick={this.postQuestion}  className="btn btn-default">ask</button>
            </form>
        </div>
      );
    }
  }
}



export default Question;