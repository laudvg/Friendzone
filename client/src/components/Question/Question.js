import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Question extends Component {

  handleChange=(e)=>{
    this.props.update(e.target.value)
  }

  render() {
    return (
      <div>
        <form className = "I-am">
          <select onChange={(e)=>this.handleChange(e)}>
          <option defaultValue="Non">Non Specified</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
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
