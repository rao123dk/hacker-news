import React, {Component} from 'react';
import { Redirect,Link } from 'react-router-dom'
const axios = require('axios');

class PostInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
        PostInfo : ""
    }
    this.fetchPostInfo = this.fetchPostInfo.bind(this);
    this.renderPostInfo = this.renderPostInfo.bind(this);
  }

  componentDidMount(){
      this.fetchPostInfo(this.props.location.pathname.split(":")[1])
  }

  fetchPostInfo (postId){
        axios.get(`http://localhost:7777/post/${postId}`)
        .then((response) =>{
        console.log('response:-- ', response.data);
        if (response && response.status === 200) {
            this.setState({
            post : response.data[0]
            })
        }
        })
        .catch(function (error) {
        console.log(error);
        });
  }

  renderPostInfo(postInfo){
    return (
        <div>
            "Hello post info"
        </div>
    )
  }

  render(){
      return (
        <div>
            <br/>
            <br/>
            {this.renderPostInfo(this.state.PostInfo)}
        </div>
      );
  }
}



export default PostInfo;