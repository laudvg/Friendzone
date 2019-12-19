import React from 'react';
// import Contacts from "../Contacts/Contacts";
import { Link } from 'react-router-dom'
import AuthService from '../../services/AuthService';
import { withRouter } from "react-router-dom";
import ChatComponent from "../ChatComponent/ChatComponent"

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService()
    // this.contacts = new Contacts()

    this.state = {
      // contact: this.contact.username,
      whole: this.props.user,
      user: this.props.user.username,
      averageQ: this.props.user.quizValue
    }}


  logout = () => {
  this.authService.logout(this.state.whole)
  .then(()=> this.props.history.push("/"))
  .catch((err)=> console.log(err))
  }
  
  render() {
    // console.log(this.state.averageQ)
    return (
      <div className="user-profile">
        <div>
          <header className="private-header">
            <h3 className="App-name">Friendzone</h3>
            <div className="buttons-head">
            <button className="bar-button" path="/login"><Link to="/">Home</Link></button>
            <button className="bar-button" path="/quiz"><Link to="/quiz">Quiz</Link></button>
            {/* <button className="bar-button" path="/signup"><Link to="/">Logout</Link></button> */}
            <button className="bar-button" onClick={()=> this.logout()}>Logout</button>
            </div>
          </header>
        </div>

        <div className="current-user">
          {/* <img src="profilepic" alt=" "></img> */}
          <h2 className="hello-user">Hello {this.state.user}!</h2>
          <h3>{this.props.location.description}</h3>
        </div>
        <div>
          <div className="chat-container"><ChatComponent user={this.state.user} averageQ={this.state.averageQ}/></div>
        </div>
      </div>
    );
  }
}
 
export default withRouter(Profile);
