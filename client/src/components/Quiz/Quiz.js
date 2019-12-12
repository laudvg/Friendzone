import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Question from '../Question/Question';
import { number, string } from 'prop-types';
import AuthService from "../../services/AuthService.js"

export default class Quiz extends Component {
  constructor(props){
    super();
    this.state = {
        Q1: 3,
        Q2: 3,
        Q3: 3,
        Q4: 3,
        Q5: 3,
    
      averageQ: 3,
    }
  this.update = this.update.bind(this);
  this.service = new AuthService();
  }

  update=(e)=>{
    const{name, value} = e.target;
    this.setState({...this.state, [name]:+value, averageQ:Object.values(this.state).splice(0,4).reduce((ac, cu)=> ac + cu , 0)/5})

  }

  addValueToDB(){
    this.service.submitQuizVal(this.state.averageQ)
  }



  render() {  
    console.log(this.state)
    return (
      <div>
        <h1>Quiz</h1>
        <h2>Hello person</h2>

        <div>
          <h3>You are a</h3> 
            <Question></Question>
            <h3>looking to find</h3> 
            <Question></Question>
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



ReactDOM.render(
  <Quiz />,
  document.getElementById('root')
);
