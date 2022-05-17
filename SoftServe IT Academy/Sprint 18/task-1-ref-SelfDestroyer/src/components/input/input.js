import React, { Component } from "react";
import PhoneCode from "../phoneCode/PhoneCode";

import "./input.css";

export default class Input extends Component {
  constructor(props) {
    super(props);

    this.firstInput = React.createRef("");
    this.secondInput = React.createRef("");

    this.state = {
    operatorСode: "",
      codeName: "",
      numbers: "",
      phoneCodes: {
        39: "Kyivstar",
        50: "Vodafone",
        63: "Lifecell",
        66: "Vodafone",
        67: "Kyivstar",
        68: "Kyivstar",
        73: "Lifecell",
        89: "intertelecom",
        91: "3mob",
        92: "People.net",
        93: "Lifecell",
        94: "intertelecom",
        95: "Vodafone",
        96: "Kyivstar",
        97: "Kyivstar",
        98: "Kyivstar",
        99: "Vodafone",
      },
    };
    this.handleChangeFirstInput = this.handleChangeFirstInput.bind(this);
    this.handleChangeSecondInput = this.handleChangeSecondInput.bind(this);
  }

  componentDidMount() {
    this.firstInput.current.focus();
  }

  handleChangeSecondInput(e) {
    let userNumbers = e.target.value;

    if (userNumbers.match(/[\d]/g) !== null) {
      userNumbers = userNumbers.match(/[\d]/g).join("");
      this.setState({ numbers: userNumbers });
    }
  }

  handleChangeFirstInput(e) {
    let userCode = e.target.value;

    if (userCode.match(/[\d]/g) !== null) {
      userCode = userCode.match(/[\d]/g).join("");

      if (
        userCode.length === 2 &&
        !this.state.phoneCodes.hasOwnProperty(userCode)
      ) {
        this.setState({ codeName: "Unknown" });
      } else if (this.state.phoneCodes.hasOwnProperty(userCode)) {
        this.setState({ operatorСode:  userCode});
        this.setState({ codeName: this.state.phoneCodes[userCode] });
      } else if (userCode.length !== 2) {
        this.setState({ code: "" });
      }
    }
  }

  render() {
    return (
      <div>
        <PhoneCode code={this.state.codeName} />
        <span>+38 0</span>
        <input
          type="text"
          data-testid="operator-input"
          onChange={this.handleChangeFirstInput}
          ref={this.firstInput}
          className="operator-input"
        />
        <span className="check-icon" data-testid="check-icon">
          {(this.state.operatorСode.length === 2 || this.state.codeName === "Unknown") &&
          this.state.numbers.length === 7
            ? "✔️"
            : " - "}
        </span>
        <input
          type="text"
          data-testid="phone-input"
          className="phone-input"
          ref={this.secondInput}
          onChange={this.handleChangeSecondInput}
        />
      </div>
    );
  }
}
