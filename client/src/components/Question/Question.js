import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Question extends Component {
  
  constructor(props){
    super();
    this.state = {value: "Non"}
    
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value}, ()=>{console.log(this.state)})
  }

  render() {
    return (
      <div>
        <form className = "I-am">
          <select value={this.state.value} onChange={this.handleChange}>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          <option selected value="Non">Non Specified</option>
          </select>
        </form>
      </div>
    )
  }
}

ReactDOM.render(
  <Question />,
  document.getElementById('root')
);
