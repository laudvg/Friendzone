import React, { Component } from "react";
import Contacts from "../Contacts/Contacts";

export default class Profile extends Component {
  render() {
    return (
      <div className="user-profile">
        <div>
          <header className="private-header">
            <h3 className="App-name">Friendzone</h3>
            <div className="buttons-head">
            <button className="groups-button" path="/groups">Groups</button>
            <button className="groups-button" path="/quiz">Quiz</button>
            <button className="groups-button" path="/groups">Logout</button>
            </div>
          </header>
        </div>
        <div className="current-user">
          <img src="profilepic"></img>
          <h2>Hello</h2>
          <div className ="age-location"></div>
          {/* {this.props.user.name} {this.props.user.age} {this.props.user.location}*/}
          <textarea className = "Description" rows="1" cols="80" placeholder="one line about yourself"></textarea>
        </div>
          <h4>Friends</h4>
        <div className="table-container">
          <div className="inner-container">
            <a>People Names</a>
          </div>
          <div className="inner-container">
            <Contacts></Contacts>
          </div>
        </div>
      </div>
    );
  }
}
