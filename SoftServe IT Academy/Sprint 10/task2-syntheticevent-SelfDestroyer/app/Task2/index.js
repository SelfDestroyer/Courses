import React, { Component } from "react";

export default class Task2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: [
        {
          id: 1,
          text: "hidden text 1",
        },
        {
          id: 2,
          text: "hidden text 2",
        },
        {
          id: 3,
          text: "hidden text 3",
        },
      ],
      text: "",
    };

    this.handleOver = this.handleOver.bind(this);
    this.handleOut = this.handleOut.bind(this);
  }

  handleOver(e) {
    const data = this.state.list.find((el) => el.id == e.target.id);
    this.setState({ text: data.text });
  }

  handleOut(e) {
    this.setState({
      text: "",
    });
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.list.map((el) => (
            <li
              key={el.id}
              id={el.id}
              className="element"
              onMouseOver={this.handleOver}
              onMouseOut={this.handleOut}
            >
              id - {el.id}
            </li>
          ))}
        </ul>
        <p className="text">{this.state.text}</p>
      </div>
    );
  }
}
