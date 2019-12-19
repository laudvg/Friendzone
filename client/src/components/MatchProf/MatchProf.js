import React, { Component } from 'react'
import AuthService from "../../services/AuthService"

export default class MatchProf extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService()
    this.state = {
      matchName:this.props.match.params.matchName,
      // matchValue:this.props.match.params.matchName
    }
  }

  componentDidMount(){
    this.authService.matchUser(this.props.match.params.matchName)
    .then(userMatched => console.log(userMatched))
    console.log(this.props.match)
  }

  render() {
    console.log(this.props.match.params.matchName) //userMatched.oneUser.username
    return (
      <div>
  <h1>This is {this.state.matchName}</h1>
  <h1>She is a {this.state.matchName}</h1>
  <h6>But don't judge a book by it's cover</h6>

      </div>
    )
  }
}
