import React, {Component} from 'react';
import {Helmet} from "react-helmet";
import { Redirect } from 'react-router-dom'
const axios = require('axios');

class Post extends Component {
  constructor(props){
    super(props);
    this.state = {
     post : []
    }
    this.fetchPost = this.fetchPost.bind(this);
  }

  componentDidMount(){
    this.fetchPost();
  }


  handleChange = (event, key)=>{
    this.setState({
        [key] : event.target.value
    })
  }

  fetchPost (){
      axios.get('http://localhost:7777/post')
      .then((response) =>{
        console.log('response:-- ', response.data);
        if (response && response.status === 200) {

        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  renderPost(){

  }


  render(){
      return (
        <div>
            {this.renderPost(this.state.post)}
        </div>
      );
  }
}



export default Post;