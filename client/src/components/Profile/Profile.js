import React from "react";
import Contacts from "../Contacts/Contacts";
import Chat from "../Chat/Chat"
import io from "socket.io-client"; // check

// import axios from "axios";
// import AuthService from './services/AuthService';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state.user = props.user.username;

    //check
    this.socket = io("http://localhost:3001/api/auth/user/profile");

    this.socket.on("updatedUserList", updatedUsersList => {
      this.setState({ ...this.state, userlist: updatedUsersList });
    });
  }

  state = {
    user: ""
  };

  render() {
    // console.log(this.state.user.username)
    return (
      <div className="user-profile">
        <div>
          <header className="private-header">
            <h3 className="App-name">Friendzone</h3>

            <div className="buttons-head">
              <button className="groups-button" path="/groups">
                Groups
              </button>
              <button className="groups-button" path="/quiz">
                Quiz
              </button>
              <button className="groups-button" path="/groups">
                Logout
              </button>
            </div>
          </header>
        </div>
        <div className="current-user">
          <img src="profilepic" alt=" "></img>
          <h2>Hello {this.state.user}</h2>
          <div className="age-location"></div>
          <textarea
            className="Description"
            rows="1"
            cols="80"
            placeholder="one line about yourself"
          ></textarea>
        </div>
        <h4>Friends</h4>
        <div className="contacts-container">
          <div className="inner-container">
            <div className="inner-container">
              <Contacts user={this.state.user}></Contacts>
            </div>
            <div className="chat">
              <Chat user={this.state.user}></Chat>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
