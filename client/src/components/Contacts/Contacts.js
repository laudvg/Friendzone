import React, { Component } from "react";
import axios from "axios";
import AuthService from './../../services/AuthService';

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.state.user = props.user.username;
    // console.log(props.user);
  }
  authService = null;

  state = {
    user: "",
    matches: []
  };

  componentDidMount() {
    this.authService.matches(this.state).then(matches => {
      console.log(matches);
    })
    // axios.get("http://localhost:3001/api/auth/user/matches").then(res => {
    //   const matches = res.data;
    //   this.setState({ ...this.state, matches });
    // });
  }

  render() {
    return (
      <div>
        <div>
        <td>
          <ul>
            {this.state.matches.map((match, i) => (
              <li key={i} matches={match}>
                {match}
              </li>
            ))}
          </ul>
        </td>
        </div>
      </div>
    );
  }
}

export default Contacts;
