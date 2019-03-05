
import React, { Component } from "react";

import ScssComponent from "./ScssComponent";

class ScssComponentContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value1: "test",
    };
  }

  render() {
    const { value1 } = this.state;
    return (<ScssComponent value1={value1} />)
  }
}

export default ScssComponentContainer;