import React, { Component } from 'react'
import AuthService from "../../services/AuthService"
import { Link } from 'react-router-dom'


export default class MatchProf extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService()
    this.state = {
      matchName:this.props.match.params.matchName,
      quizValue:this.props.match.params.quizValue,
    }
  }

  componentDidMount(){
   this.authService.matchUser(this.props.match.params.matchName)
  .then(userMatched => this.setState({
    ...this.state, quizValue: userMatched.oneUser.quizValue
  }))
  }

  render() {
    return (
      <div className="user-profile final">
      <div className="text-user">
        <h1>This is {this.state.matchName}</h1>
        <h1>He's a {this.state.quizValue}</h1>
        <h6>But don't judge a book by it's cover ;)</h6>
        <div>
        <button className="nav-a" path="/profile"><Link to="/profile">Back</Link></button>   
        </div>
      </div>
      </div>
    )
  
  }
}
