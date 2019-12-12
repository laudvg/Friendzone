import React, { Component } from "react";

export default class Contacts extends Component {
  render() {
    return (
      <div>
        <table className="user-description">
          <thead></thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td> ana{/* {this.props.user.name} */}</td>
            </tr>
            <tr>
              <td>Age</td>
              <td> 27 {/* {this.props.user.age} */} </td>
            </tr>
            <tr>
              <td>City</td>
              <td>Mad{/* {this.props.user.location} */}</td>
            </tr>
            <tr>
              <td>Leave Your Message</td>
              <td>
                <ul>
                  <li><h4>Message</h4></li>
                </ul>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
