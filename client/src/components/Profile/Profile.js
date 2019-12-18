import React from 'react';
import Contacts from "../Contacts/Contacts";
import { Link } from 'react-router-dom'
import AuthService from '../../services/AuthService';
import { withRouter } from "react-router-dom";
import ChatComponent from "../ChatComponent/ChatComponent"

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService()

    this.state = {
      user: this.props.user.username,
    }}

  render() {
    // console.log(this.props.location)
    return (
      <div className="user-profile">
        <div>
          <header className="private-header">
            <h3 className="App-name">Friendzone</h3>

            <div className="buttons-head">
            <button className="bar-button" path="/login"><Link to="/">Home</Link></button>
            <button className="bar-button" path="/quiz"><Link to="/quiz">Quiz</Link></button>
            <button className="bar-button" path="/signup"><Link to="/">Logout</Link></button>
            </div>
          </header>
        </div>

        <div className="current-user">
          <img src="profilepic" alt=" "></img>
          <h2>Hello {this.state.user}</h2>
          {/* <h3>{this.props.location.state.description}</h3> */}
        </div>
        <div>
          <h5>Chat</h5>
          <div className="chat-container"><ChatComponent user={this.state.user}/></div>
        </div>
      </div>
    );
  }
}
 
export default withRouter(Profile);
