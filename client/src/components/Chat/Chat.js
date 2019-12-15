import React, { Component } from "react";
// import io from "socket.io-client"; // check

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state.user = props.user.username;

    this.chatAreaDOMEl = undefined;
    this.state = {
      user:"",
      messagesList: [],
      message: ""
    };

    /** connect to server **/
    this.socket = this.props.socket;

    /** listen to new messages and add them to state **/
    this.socket.on("newMessage", message => {
      const messages = [...this.state.messagesList];
      messages.push(message);
      this.setState({
        ...this.state,
        messagesList: messages
      });
    });
  }

  submitMessage(e) {
    e.preventDefault();
    if (this.state.message.trim() === "") return;

    const messages = [...this.state, messagesList];
    const today = new Date();
    const timeStamp = today.getHours() + ":" + today.getMinutes();

    const message = {
      user: this.props.username, //check for username
      message: this.state.message,
      timeStamp
    };

    this.socket.emit("messageSent", mesage);

    messages.push(message);

    this.setState({
      ...this.state,
      messagesList: messages,
      message: ""
    });
  }

  handleChange(e) {
    this.setState({
      ...this.state,
      message: e.target.value
    });
  }

  //check
  componentDidMount() {
    this.chatAreaDOMEl = document.querySelector(".chat-area");
  }

  //para mantener el scroll abajo
  componentDidUpdate = () => {
    this.chatAreaDOMEl.scrollTop = this.chatAreaDOMEl.scrollHeight;
  };

  render() {
    const { users, username } = this.props;
    return (
      <div className="chat-div is-fluid">
        <div>
              <div className="chat-area">
                <ul>
                  {this.state.messagesList.map((message, idx) => {
                    return message.user === username ? (
                      <li key={idx} className="current-user-message">
                        [{message.timeStamp}] {message.user}: {message.message}{" "}
                      </li>
                    ) : (
                      <li key={idx}>
                        [{message.timeStamp}] {message.user}: {message.message}{" "}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <form className="text-form" onSubmit={e => this.submitMessage(e)}>
                <div isGrouped>
                  <input
                    onChange={e => this.handleChange(e)}
                    type="text"
                    placeholder="write a message..."
                    value={this.state.message}
                  />
                  <div>
                    <button
                      isColor="danger"
                      onClick={e => this.submitMessage(e)}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </form>
        </div>
      </div>
    );
  }
}

export default Chat;
