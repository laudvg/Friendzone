import React from 'react';
import Contacts from "../Contacts/Contacts";
// import axios from "axios";
// import AuthService from './services/AuthService';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state.user = props.user.username;
  }
  
  state ={
    user: "",
  }

  // componentDidMount() {
  //   axios.get("http://localhost:3001/api/auth/user/matches")
  //     .then(res => {
  //       const user = res.data
  //       console.log(user)
  //       // this.setState({user:user.username});
  //     });
  // }

  render() {
    // console.log(this.state.user.username)
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
          <img src="profilepic" alt=" "></img>
          <h2>Hello {this.state.user}</h2>
          <div className ="age-location"></div>

          <textarea className = "Description" rows="1" cols="80" placeholder="one line about yourself"></textarea>
        </div>
          <h4>Friends</h4>
        <div className="contacts-container">
          <div className="inner-container">
            <a>Matches</a>
          </div>
          <div className="inner-container">
            <Contacts user={this.state.user}></Contacts>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
