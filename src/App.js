import React, { Component } from "react";
import "./App.css";
import Messages from "./Messages";
import Input from "./Input";

function randomName() {
  const adjectives = [
    "Chewbacca",
    "Han Solo",
    "Darth Vader",
    "Princess Leia",
    "Luke Skywalker",
    "Emperor Palpatine",
    "The Mandalorian",
    "Yoda",
    "Kylo Ren",
    "General Grievous",
    "Obi-Wan Kenobi",
    "Darth Maul"
  ];

  const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomName = adjective;
  return randomName;
}

class App extends Component {
  state = {
    messages: [],
    member: {
      username: randomName(),
    },
  };

  constructor() {
    super();
    this.drone = new window.Scaledrone("KcExepgtzUTanyCe", {
      data: this.state.member,
    });
    this.drone.on("open", (error) => {
      if (error) {
        return console.error(error);
      }
      const member = { ...this.state.member };
      member.id = this.drone.clientId;
      this.setState({ member });
    });
    const room = this.drone.subscribe("observable-room");
    room.on("data", (data, member) => {
      const messages = this.state.messages;
      messages.push({ member, text: data });
      this.setState({ messages });
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Star Wars - Chat app</h1>
        </div>
        <Messages
          messages={this.state.messages}
          currentMember={this.state.member}
        />
        <Input onSendMessage={this.onSendMessage} />
      </div>
    );
  }

  onSendMessage = (message) => {
    this.drone.publish({
      room: "observable-room",
      message,
    });
  };
}

export default App;
