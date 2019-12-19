import React, { Component } from "react";
import Question from "../Question/Question";
import AuthService from "../../services/AuthService.js";
import { withRouter } from "react-router-dom";

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Q1: 3,
      Q2: 3,
      Q3: 3,
      Q4: 3,
      Q5: 3,
      averageQ: 3,
      iam: "",
      lookingFor: "",
      description: "",
      user: props.user
    };
    // console.log(props.user.username)
    this.update = this.update.bind(this);
    this.service = new AuthService();
  }

  state = {
    user: ""
  };

  update = e => {
    const { name, value } = e.target;
    this.setState({
      ...this.state,
      [name]: +value,
      averageQ:
        Object.values(this.state)
          .splice(0, 4)
          .reduce((ac, cu) => ac + cu, 1) / 5
    });
  };

  addValueToDB() {
    const { history } = this.props;
    const toDB = {
      iam: this.state.iam,
      lookingFor: this.state.lookingFor,
      averageQ: this.state.averageQ,
      description: this.state.description
    };

    this.service.submitQuizVal(toDB).then(
      () => {
        history.push("/profile", { ...this.state });
      },
      error => {
        console.error(error);
      }
    );
  }

  updateIam = genre => {
    this.setState({ ...this.state, iam: genre });
  };

  updateLooking = genre => {
    this.setState({ ...this.state, lookingFor: genre });
  };

  updateAbout = e => {
    // console.log(this.state.description)
    this.setState({ ...this.state, description: e.target.value });
  };

  render() {
    return (
      <div>
        <div>
          <nav className="quiz-bar">
            <ul>
              <li>Friendzone</li>
              <li>Go back</li>
            </ul>
          </nav>
        </div>
        <div className="q-father">
          <div className="titles">
              <h2>Quiz</h2>
              <h1>Hello {this.state.user.username}!</h1>
            <div>
              <div className="bars">
                <h3>You are a</h3>
                <Question update={this.updateIam}></Question>
                <h3>looking to find</h3>
                <Question update={this.updateLooking}></Question>
              </div>
            </div>
            <input
              type="text"
              className="description"
              required
              minLength="10"
              maxLength="60"
              size="100"
              placeholder="write one line about yourself"
              value={this.state.description}
              onChange={e => this.updateAbout(e)}
            ></input>
          </div>
          <div className="quiz-ranges">
            <div className="quiz-q">
              <h3>Conventional</h3>
              <input
                name="Q1"
                type="range"
                min="1"
                max="5"
                value={this.rangevalue1}
                className="slider"
                id="myRange"
                onChange={e => this.update(e)}
              ></input>
              <h3>Creative</h3>
            </div>
            <div className="quiz-q">
              <h3>Calm</h3>
              <input
                name="Q2"
                type="range"
                min="1"
                max="5"
                value={this.rangevalue2}
                className="slider"
                id="myRange"
                onChange={e => this.update(e)}
              ></input>
              <h3>Active</h3>
            </div>
            <div className="quiz-q">
              <h3>Organized</h3>
              <input
                name="Q3"
                type="range"
                min="1"
                max="5"
                value={this.rangevalue3}
                className="slider"
                id="myRange"
                onChange={e => this.update(e)}
              ></input>
              <h3>Spontaneous</h3>
            </div>
            <div className="quiz-q">
              <h3>Reserved</h3>
              <input
                name="Q4"
                type="range"
                min="1"
                max="5"
                value={this.rangevalue4}
                className="slider"
                id="myRange"
                onChange={e => this.update(e)}
              ></input>
              <h3>Extroverted</h3>
            </div>
            <div className="quiz-q">
              <h3>Disciplined</h3>
              <input
                name="Q5"
                type="range"
                min="1"
                max="5"
                value={this.rangevalue5}
                className="slider"
                id="myRange"
                onChange={e => this.update(e)}
              ></input>
              <h3>Relaxed</h3>
            </div>
            <a
              className="button1"
              type="button"
              onClick={() => this.addValueToDB()}
            >
              Submit
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Quiz);
