
import React, { Component } from "react";

import TestComponent from "./TestComponent";

class TestComponentContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value1: "test",
    };
  }

  render() {
    const { value1 } = this.state;
    return (<TestComponent value1={value1} />)
  }
}

export default TestComponentContainer;