import React, { Component } from 'react'
import {BrowserRouter as Router,Link,} from "react-router-dom";

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>Friendzone</h1>
        <button className="login-button" path="/login"><Link to="/login">Login</Link></button>
        <button className="signup-button" path="/signup"><Link to="/signup">Sign Up</Link></button>
      </div>
    )
  }
}
