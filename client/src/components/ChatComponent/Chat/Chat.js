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
      mess.push(message);
      this.setState({ ...this.state, messages: mess });
    });
  }

  // Este método recibe los textos que vienen del Input de los mensajes en el chat
  sendMessage = text => {
    if(text.trim()==="")return
    let mess = {
      text: text,
      user: this.props.user,
      value:this.props.user,
    };
    this.socket.emit("messageSent", mess);
  };

  // Con este método el cuadro de chat tenga siempre el scroll abajo
  componentDidUpdate=()=>{
    document.getElementById('chatBox').scrollTop = document.getElementById('chatBox').scrollHeight
  }

  // Renderiza la lista de usuarios, el box con el chat y el input para poder escribir mensajes.
  render() {
    // console.log(this.state.user);
    // console.log(this.state.user);
    return (
      <div id="cont">
        <div className="chat-container">
        <div><Contacts user={this.state.user}></Contacts></div>
          {/* Box que contiene el chat */}
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
