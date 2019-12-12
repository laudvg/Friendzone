import React from 'react';
import './App.css';

import { Switch, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import SignUp from './components/Signup/Signup';
import AuthService from './services/AuthService';
import Temporary from './components/Temporary/Temporary';
import PrivateRoute from './guards/PrivateRoutes'
import Home from './components/Home/Home'
import Quiz from './components/Quiz/Quiz';
import Profile from './components/Profile/Profile';
// import Contacts from './components/Contacts/Contacts';



class App extends React.Component {
  constructor(props) {
    super(props);

    this.authService = new AuthService();
  }

  state = {
    user: null
  }

  setUser = (user) => {
    this.setState({ ...this.state, user })
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
    this.fetchUser()
    const { user } = this.state;
    return (
      <div className="App">
        <Route exact path="/" render={() =><Home></Home>}></Route>
        <header className="App-header">
          {user && <Switch>
            <Route exact path="/login" render={(match) => <Login {...match} setUser={this.setUser} />} />  
            <Route exact path="/signup" render={(match) => <SignUp {...match} setUser={this.setUser} />} />
            <PrivateRoute exact path="/temporary" user={user} component={Temporary} />
            <PrivateRoute exact path="/quiz" user={user} component={Quiz}/>
          </Switch> }
          {!user && <Switch>
            <Route exact path="/login" render={(match) => <Login {...match} setUser={this.setUser} />} />  
            <Route exact path="/signup" render={(match) => <SignUp {...match} setUser={this.setUser} />} />
            <PrivateRoute exact path="/temporary" user={user} component={Temporary} />
            <Route exact path="/quiz" render={() => <Quiz></Quiz> }/>
            <Route exact path="/profile" render={() => <Profile></Profile> }/>
            {/* Delete other rutes... */}
          </Switch> }
        </header>
      </div>
    );
  }
}

export default App;
