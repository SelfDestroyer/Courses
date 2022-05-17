import React from "react";
import "./App.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      appData: "React Marathon",
    };

    this.toLower = this.toLower.bind(this);
  }

  toLower() {
    this.setState({
      appData: this.state.appData.toLowerCase(),
    });
  }

  render() {
    return <div onClick={this.toLower}> {this.state.appData} </div>;
  }
}
