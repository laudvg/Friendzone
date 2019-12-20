import React, { Component } from "react";
import InputMess from "../InputMess/InputMess";
import { withRouter } from "react-router-dom";
import AuthService from '../../../services/AuthService';
import './Chat.css'
import Contacts from "../../Contacts/Contacts";
// import './bootstrap/dist/css/bootstrap.min.css'



class Chat extends Component {
  constructor(props) {
    super(props);
    this.authService = new AuthService()
    
    this.state = {
      messages: [],
      user: this.props.user,
      averageQ: this.props.averageQ
    };

    // Recibimos el socket por props, se creó en ChatComponent.js
    this.socket = this.props.socket;

    // Creamos un ".on" que escuchará los mensajes nuevos
    this.socket.on("newMessage", message => {
      let mess = this.state.messages;
      let user1 = Math.ceil(message.value);
      let user2 = Math.ceil(this.state.averageQ);
      if(user1 === user2){
      mess.push(message)
      this.setState({ ...this.state, messages: mess })
      }
      // console.log(this.state)
      // console.log(mess)
      // console.log(message)
      console.log(message.value);
      console.log(this.state.averageQ);
    });
  }

  // Este método recibe los textos que vienen del Input de los mensajes en el chat
  sendMessage = text => {
    console.log(text)
    if(text.trim()==="")return
    let mess = {
      text: text,
      user: this.state.user,
      value:this.state.averageQ,
    };
    this.socket.emit("messageSent", mess)
  };

  // Con este método el cuadro de chat tenga siempre el scroll abajo
  componentDidUpdate=()=>{
    document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight;
  }

  // Renderiza la lista de usuarios, el box con el chat y el input para poder escribir mensajes.
  render() {
    console.log(this.props);
    console.log(this.state.user);
    return (
      <div id="cont">
        <div className="chat-container">
         <div className="inner-chat">
        <h3>YourMatches</h3>
        <div className="flow-contacts"><Contacts user={this.state.user}></Contacts></div>
        </div>
          <div>
            <div className="chatBox" id="chatBox">
              {this.state.messages.map((elem, idx) => {
                return (
                  <h6 key={idx}>
                    {elem.user} : {elem.text}
                  </h6>
                );
              })}
            </div>
            {/* Input para nuevos mensajes */}
            <div className="textForm">
              <InputMess info={this.sendMessage}></InputMess>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Chat);
