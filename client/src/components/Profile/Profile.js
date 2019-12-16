import React from 'react';
import Contacts from "../Contacts/Contacts";
import { Link } from 'react-router-dom'
// import axios from "axios";
// import AuthService from './services/AuthService';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state.user = props.user.username;
    this.state.description = props.user.description;
  }
  
  state ={
    user: "",
    description:""
  }
 
  render() {
    // console.log(this.state)
    return (
      <div className="user-profile">
        <div>
          <header className="private-header">
            <h3 className="App-name">Friendzone</h3>

            <div className="buttons-head">
            <button className="login-button" path="/login"><Link to="/groups">Groups</Link></button>
            <button className="signup-button" path="/quiz"><Link to="/signup">Quiz</Link></button>
            <button className="signup-button" path="/signup"><Link to="/signup">Logout</Link></button>
            </div>
          </header>
        </div>

        <div className="current-user">
          <img src="profilepic" alt=" "></img>
          <h2>Hello {this.state.user}</h2>
          <h3>{this.state.description}</h3>
        </div>

        <div className="contacts-container">
          <div className="inner-container"></div>
          <div className="inner-container"><Contacts user={this.state.user}></Contacts></div>
        </div>

      </div>
    );
  }
}

export default Profile;
