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
      <div>
      <h1>SignUp</h1>
        <form onSubmit={this.handleSignUp}>
          <label htmlFor="username">Username: </label>
          <input type="text" name="username" value={username} required onChange={this.handleChange}/>
          <label htmlFor="password">Password: </label>
          <input type="password" value={password} name="password" required onChange={this.handleChange}/>
          <input type="submit" value="Create account"/>
        </form>
      </div>
    )
  }
}


export default withRouter(SignUp)