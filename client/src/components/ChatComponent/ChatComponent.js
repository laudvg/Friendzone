import React, { Component } from 'react'
import { Switch, Route, withRouter } from "react-router-dom";
// import Intro from './Intro/Intro';
import Chat from './Chat/Chat';

import io from 'socket.io-client'
import List from "../ListComponent/List";


class ChatComponent extends Component {
  constructor(props){
    super(props)
    this.state = {
      userList : [],
      user: null
    }

    // Creamos el socket, y con ello la conexión al server
    this.socket = io('http://localhost:3001')

    // Creamos un ".on", el cual escucha si el server envia una lista de usuarios 
    this.socket.on('list', list => {
      console.log(this.socket)
      this.setState({...this.state, userList: list})
    })
  }


  // Este método recibe un NickName del Input de la portada
  // Realiza un ".emit" al server para que lo añada a la lista de usuarios.
  // Nos redirije a "/chat"
  updateUserList=(name)=>{
    if(name.trim() !== ''){
      this.setState({...this.state, user: name},()=>{
        this.socket.emit('newUser', name)
        this.props.history.push('/chat')
      })
    }
  }

  // Tanto la ruta "/chat" como "/list" reciben "socket" por props, para poder usarlo
  // de esta manera el server podrá identificarnos siempre como el mismo usuario,
  // al no tener que crear una conexión distinta por componente
  render() {
    return (
      <div>
         <Switch>
          {/* <Route exact path="/" render={(props)=>(<Intro info={this.updateUserList} {...props}/>)}></Route> */}
          <Route exact path="/chat" render={()=>(<Chat socket={this.socket} list={this.state.userList} user={this.state.user}/>)}></Route>
          <Route exact path="/list" render={()=>(<List socket={this.socket}/>)}></Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(ChatComponent)
