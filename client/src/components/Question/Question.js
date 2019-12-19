import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class Question extends Component {

  handleChange=(e)=>{
    this.props.update(e.target.value)
  }

  render() {
    return (
      <div>
        <div className ="dropdown">
        <form className ="dropdown">
          <select onChange={(e)=>this.handleChange(e)}>
          <option defaultValue="Non">Non Specified</option>
          <option value="Female">Female</option>
          <option value="Male">Male</option>
          </select>
        </form>
      </div>
      </div>
 )
}
}


ReactDOM.render(
  <Question />,
  document.getElementById('root')
);
