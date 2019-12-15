import React, { Component } from 'react'
import Question from '../Question/Question';
import AuthService from "../../services/AuthService.js"
import { withRouter } from 'react-router-dom'

class Quiz extends Component {
  constructor(props){
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
        user: props.user
  }
  // console.log(props.user.username)
  this.update = this.update.bind(this);
  this.service = new AuthService();
  }

  state = {
    user: "",
  };
    
  update=(e)=>{
    const{name, value} = e.target;
    this.setState({...this.state, [name]:+value, averageQ:Object.values(this.state).splice(0,4).reduce((ac, cu)=> ac + cu , 1)/5})
  }

  addValueToDB(){
    const {history} = this.props;
    const toDB ={
      iam:this.state.iam,
      lookingFor:this.state.lookingFor,
      averageQ:this.state.averageQ
    }
    this.service.submitQuizVal(toDB)
    .then(
      () => {
        history.push("/profile")
      },
      (error) => {
        console.error(error)
      }
    )
  }

  updateIam=(genre)=>{
    this.setState({...this.state, iam:genre})
  }

  updateLooking=(genre)=>{
    this.setState({...this.state, lookingFor:genre})
  }


  render() {
    // console.log(this.state)
    return (
      <div>
        <h1>Quiz</h1>
        <h2>Hello {this.state.user.username}</h2>
        <div>
          <h3>You are a</h3> 
            <Question update={this.updateIam}></Question>
            <h3>looking to find</h3> 
            <Question update={this.updateLooking}></Question>
            
        <input type="text" className = "Description" required minLength="10" maxLength="60" size="100" placeholder="write one line about yourself" onChange={(e)=>this.update(e)}></input>
        </div>
        <div className="quiz-father">
        <div> 
        <h3>Conventional</h3><input name="Q1" type="range" min="1" max="5" value={this.rangevalue1} className="slider" id="myRange" onChange={(e)=>this.update(e)}></input><h3>Creative</h3>
        </div>
        <div>
        <h3>Calm</h3><input name="Q2" type="range" min="1" max="5" value={this.rangevalue2} className="slider" id="myRange" onChange={(e)=>this.update(e)}></input><h3>Active</h3>
        </div>
        <div>
        <h3>Organized</h3><input name="Q3" type="range" min="1" max="5" value={this.rangevalue3} className="slider" id="myRange" onChange={(e)=>this.update(e)}></input><h3>Spontaneous</h3>
        </div>
        <div>
        <h3>Reserved</h3><input name="Q4" type="range" min="1" max="5" value={this.rangevalue4} className="slider" id="myRange" onChange={(e)=>this.update(e)}></input><h3>Extroverted</h3>
        </div>
        <div>
        <h3>Disciplined</h3><input name="Q5" type="range" min="1" max="5" value={this.rangevalue5} className="slider" id="myRange" onChange={(e)=>this.update(e)}></input><h3>Relaxed</h3>
        </div>
        <button type="button" onClick={() => this.addValueToDB()}>Submit</button>
        </div>
      </div>
    )}
}



export default withRouter(Quiz)