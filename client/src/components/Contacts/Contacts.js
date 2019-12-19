import React  from "react";
import AuthService from './../../services/AuthService';

class Contacts extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
    this.state.user = props.user.username;
    this.state.quizValue = props.user.quizValue;
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
          <table className="contacts">
            <thead><tr><th>Matches</th></tr></thead>
            <tbody>
              {this.state.matches.map((match, i) => (<tr key={i} matches={match}>
               <td><a href={`${match.username}/${match.quizValue}`}>{match.username}</a></td>
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
