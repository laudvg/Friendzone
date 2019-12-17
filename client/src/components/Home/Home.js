import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div className= "app-all">
        <div className="home">
          <h1 className="home-title">Friendzone</h1>
            <div className= "two-buttons">
              <a  class="button1"><Link to="/login">Login</Link></a>
              <a  class="button1"><Link to="/signup">Sign Up</Link></a>
            </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Home)