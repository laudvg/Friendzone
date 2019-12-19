import React, { Component } from 'react'
import AuthService from "../../services/AuthService"

export default class MatchProf extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService()
    this.state = {
      matchName:this.props.match.params.matchName,
      matchValue:this.props.match.params.matchName
    }
  }

  componentDidMount(){
    this.authService.matchUser(this.props.match.params.matchName)
    // console.log(this.props.match.params)
    .then(userMatched => console.log(userMatched))
  }

  render() {
    console.log(this.state.matchName) //userMatched.oneUser.username
    return (
      <div>
  <h1>Hola{}</h1>

      </div>
    )
  }
}
