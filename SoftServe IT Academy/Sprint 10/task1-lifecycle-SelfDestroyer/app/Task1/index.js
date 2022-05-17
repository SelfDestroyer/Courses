import React, { Component } from "react";

const style = {
  listStyleType: "none",
  padding: "0px",
};
export default class Task1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      list: null,
      isLoaded: false,
    };
  }

  componentDidMount() {
    fetch("http://localhost:3000/list")
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          isLoaded: true,
          list: result,
        });
      });
    (error) => {
      this.setState({
        isLoaded: true,
        error,
      });
    };
  }

  render() {
    const isLoaded = this.state.isLoaded;
    const data = this.state.list;

    if (isLoaded) {
      return (
        <div className="row">
          {data.map((el) => {
            return (
              <ul className="col border col-3" key={el.id}>
                <li>id - {el.id}</li>
                <li>name - {el.name}</li>
                <li>note - {el.note}</li>
              </ul>
            );
          })}
        </div>
      );
    } else {
      return (
        <div className="row">
          <div className="col border">Loading...</div>
        </div>
      );
    }
  }
}
