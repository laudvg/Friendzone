import React, { Component } from 'react'
import AuthService from '../../services/AuthService';
import { withRouter } from 'react-router-dom'

class Login extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = { 
    username: '',
    password: ''
  }
  
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({...this.state, [name]:value})
  }

  handleLogin = (e) => {
    const { setUser, history } = this.props;
    e.preventDefault()
    this.authService.login(this.state)
    .then(
      (user) => {
        setUser(user)
        history.push("/quiz")
      }
    ).catch(error => {
      history.push("/home")
    })
  }

  render() {
    const { username, password } = this.state;
    return (
      <div className= "log-page">
        <div className="sign-log">
          <h1>Login</h1>
          <form onSubmit={this.handleLogin}>
            <div className="tags">
              <label htmlFor="username">Username: </label>
              <input className="input-log" type="text" name="username" value={username} onChange={this.handleChange}/>
              <label htmlFor="password" >Password: </label>
              <input className="input-log" type="password" name="password" value={password} onChange={this.handleChange}/>
              <input class="log-submit" type="submit" value="Login"/>
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(Login)