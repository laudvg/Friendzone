import React, { Component } from 'react'
import { Switch, Route, withRouter } from "react-router-dom";
// import Intro from './Intro/Intro';
import Chat from './Chat/Chat';
// import Contacts from "../Contacts/Contacts";
import io from 'socket.io-client'


class ChatComponent extends Component {
  constructor(props){
    super(props)
    // this.contacts = new Contacts()

    this.state = {
      userList : [],
      user : props.user,
      averageQ: props.averageQ
    }

    // console.log(this.props.averageQ)
    // Creamos el socket, y con ello la conexión al server
    this.socket = io ("https://hello-friendzone.herokuapp.com/")
    // this.socket = io('http://127.0.0.1:3001')
    //this.socket = io('http://192.168.97.70:3001')

    // Creamos un ".on", el cual escucha si el server envia una lista de usuarios 
    this.socket.on('list', list => {
      // console.log(this.socket)
      this.setState({...this.state, userList: list})
    })
  }


  // Este método recibe un NickName del Input de la portada
  // Realiza un ".emit" al server para que lo añada a la lista de usuarios.
  // Nos redirije a "/chat"
  updateUserList=(name)=>{
    if(name.trim() !== ''){
      this.setState({...this.state, user: name},()=>{
        this.props.history.push('/chat')
      })
    }
  }

  componentDidMount(){
    this.socket.emit('newUser', this.state.user)
  }

  // Tanto la ruta "/chat" como "/list" reciben "socket" por props, para poder usarlo
  // de esta manera el server podrá identificarnos siempre como el mismo usuario,
  // al no tener que crear una conexión distinta por componente
  render() {
    //  console.log(this.state.userList)
    console.log(this.state.user)
    return (
      <div className="chat-contains">
         <Switch>
          <Route exact path="/profile" render={()=>(<Chat socket={this.socket} list={this.state.userList} user={this.state.user} averageQ={this.state.averageQ}/>)}></Route>
        </Switch>
      </div>
    )
  }
}

export default withRouter(ChatComponent)
