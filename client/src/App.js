import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
import AuthService from './services/AuthService';
import Home from './components/Home/Home'
import Quiz from './components/Quiz/Quiz';
import Profile from './components/Profile/Profile';
import ChatComponent from "./components/ChatComponent/ChatComponent"
import MatchProf from "./components/MatchProf/MatchProf"
// import Contacts from './components/Contacts/Contacts';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService();
  }

  state = {
    user: null
  }

  setUser = (user, description) => {
    this.setState({ ...this.state, user, description })
  }

  fetchUser = () => {
    if (this.state.user === null) {
      this.authService.loggedInUser()
        .then(
          (user) => {
            this.setUser(user)
          },
          (error) => {
            this.setUser(false)
          }
        )
        .catch(() => {
          this.setUser(false)
        })
    }
  }

  componentDidMount() {
    this.fetchUser()
  }

  render() {
    const { user,description } = this.state;
    return (
      
      <div className="App">
        <Route exact path="/" render={() =><Home></Home>}></Route>
          <div>
            {user && <Switch>
              <Route exact path="/quiz" render={(match) => <Quiz {...match} user={user} description={description}/> }/>
              <Route exact path="/profile" render={() => <Profile user={user}/> }/>
              <Route exact path="/chat" render={() => <ChatComponent user={user}/> }/>
              <Route exact path="/login" render={(match)=> <Home {...match} user={user}/>} />
              <Route extat path="/:matchName" render={(match)=> <MatchProf {...match} user={user}></MatchProf>} />
            </Switch> }
            {!user && <Switch>
              <Route classname="login" exact path="/login" render={(match) => <Login {...match} setUser={this.setUser} />} />  
              <Route exact path="/signup" render={(match) => <SignUp {...match} setUser={this.setUser} />} />
              <Route exact path="/home" render={(match)=> <Home {...match} setUser={this.setUser}/>} />
            </Switch> }
          </div>
      </div>
    );
  }
}

export default App;
