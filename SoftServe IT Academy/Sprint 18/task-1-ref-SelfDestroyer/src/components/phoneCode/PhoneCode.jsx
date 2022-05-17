import React, { Component } from "react";

export default class PhoneCode extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <span className="operator-name" data-testid="operator-name">
        {this.props.code}
      </span>
    );
  }
}
