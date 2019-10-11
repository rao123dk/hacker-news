import React, {Component} from 'react';
import { Redirect,Link } from 'react-router-dom'
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
    console.log("this.props.history", this.props)
  }


  handleChange = (event, key)=>{
    this.setState({
        [key] : event.target.value
    })
  }

  fetchPost (){
      axios.get('http://localhost:7777/post')
      .then((response) =>{
        if (response && response.status === 200) {
          this.setState({
            post : response.data
          })
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  renderPost(posts){
    return (
      <ul className="list-group">
        {
          posts.map((item)=>{
            return (
                <li onClick={()=>this.props.history.push(`/post/:${item._id}`)} key={item.authorName + item.title} className="list-group-item">
                          {item.title}
                          {/* <Link to="/post:postId">{item.title.toString()}</Link> */}
                          <span className="badge">By:- {item.authorName}</span>
                </li>
            )
          })
        }
      </ul>
    )
  }


  render(){
      return (
        <div>
            <br/>
            <br/>
            {this.renderPost(this.state.post)}
        </div>
      );
  }
}



export default Post;