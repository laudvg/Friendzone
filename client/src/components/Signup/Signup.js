import React, { Component } from 'react'
import AuthService from '../../services/AuthService'
import { withRouter } from 'react-router-dom'

class SignUp extends Component {
  constructor(props) {
    super(props)
    this.authService = new AuthService();
  }

  state = {
    username: '',
    password: '',
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
  }
  handleSignUp = (e) => {
    e.preventDefault()
    const { history } = this.props;
    this.authService.signup(this.state)
    .then(
      () => {
        history.push("/login")
      },
      (error) => {
        console.error(error)
      }
    )
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className= "log-page">
        <div className="sign-log">
          <h1>SignUp</h1>
            <form onSubmit={this.handleSignUp}>
            <div className="tags">
              <label htmlFor="username">Username: </label>
              <input className="input-log" type="text" name="username" value={username} required onChange={this.handleChange}/>
              <label htmlFor="password">Password: </label>
              <input className="input-log" type="password" value={password} name="password" required onChange={this.handleChange}/>
              <input class="log-submit" type="submit" value="Create account"/>
              </div>
          </form>
        </div>
      </div>
    )
  }
}


export default withRouter(SignUp)