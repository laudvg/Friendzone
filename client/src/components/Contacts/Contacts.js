import React  from "react";
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
      this.setState({matches: matches});
    })
  }

  render() {
    return (

      <div>
        <div>
          <table>
            <thead><tr><th>Matches</th></tr></thead>
            <tbody>
              {this.state.matches.map((match, i) => (<tr key={i} matches={match}>
               <td><a href={match.username}>{match.username}</a></td>
              </tr>
            ))}
            </tbody>
        </table>
        </div>
      </div>
    );
  }
}

export default Contacts;
