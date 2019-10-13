import React, {Component} from 'react';
import { Redirect,Link } from 'react-router-dom'
import util  from '../util/index'
const axios = require('axios');

class PostInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
        PostInfo : "",
        comment : "",
        comments : [
          {
            text : "reactjs is a library.",
            postedBy: "122222",
            name : "dheerajkr",
            comments:[
                {
                  text : "reactjs is a library.",
                  postedBy: "122222",
                  name : "dheerajkr",
                  comments : []
                }
            ]
          },
          {
            text : "reactjs is a library.",
            postedBy: "122222",
            name : "dheerajkr",
            comments:[

            ]
          }
        ]
    }
    this.fetchPostInfo = this.fetchPostInfo.bind(this);
    this.renderPostInfo = this.renderPostInfo.bind(this);
    this.postComment = this.postComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount(){
      this.fetchPostInfo(this.props.location.pathname.split(":")[1]);
      const {username, name} = util.getUserFromLocal('user') || {};
      this.setState({
        username, name
      })
  }

  fetchPostInfo (postId){
        axios.get(`http://localhost:7777/post/${postId}`)
        .then((response) =>{
        console.log('response:-- ', response.data);
        if (response && response.status === 200) {
            this.setState({
              PostInfo : response.data[0]
            })
        }
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  handleChange = (event) => {
    this.setState({
      comment : event.target.value
    })
  }

  postComment(e){
      e.preventDefault()
      axios.post('http://localhost:7777/post/comment', {
        postUserName : this.state.username,
        comment: this.state.comment,
        postId : this.props.location.pathname.split(":")[1],
        name : this.state.name
      })
      .then((response) =>{
        if (response && response.status === 200) {
          console.log('response.status: ', response.status);
          // this.setState({
          //   redirectTo: '/post'
          // })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  renderPostInfo(postInfo){
    return (
        <>
          <div>
              <span><h3>{postInfo.title} by:- <span className="authorName">{postInfo.authorName}</span></h3> </span>
          </div>
          <div className="form-group">
            <label htmlFor="comment">Comment:</label>
            <textarea onChange={(e) =>this.handleChange(e)} className="form-control" rows="5" id="comment"></textarea>
            <button onClick={this.postComment}>{'Post'}</button>
          </div>
        </>
    )
  }

  render(){
      return (
        <div>
            <br/>
            <br/>
            {this.state.PostInfo && this.renderPostInfo(this.state.PostInfo)}
        </div>
      );
  }
}



export default PostInfo;