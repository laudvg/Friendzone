import React, { Component } from 'react'
// import "bootstrap/dist/css/bootstrap.min.css";


export default class InputMess extends Component {
    constructor(){
        super()
        this.state={
            text:""
        }
    }

    handlerText=(e)=>{
        this.setState({...this.state, text: e.target.value})
    }

    handlerSubmit=(e)=>{
        e.preventDefault()
        this.props.info(this.state.text)
        this.setState({...this.state, text: ""})
    }

    //renderiza el input para escribir mensajes dentro del chat
    render() {
        return (
            <div>
            <div className="chat-class" >
              <input
                onChange={e => {
                  this.handlerText(e);
                }}
                type="text"
                placeholder="Your message"
                value={this.state.text}
                className = "input-message"
              />
            </div>
    
            <a
            className="button1 chatbtn"
              variant="primary"
              type="submit"
              onClick={(e) => {
                this.handlerSubmit(e);
              }}
            >
              Send
            </a>
          </div>
        )
    }
}
