
import React, { Component } from "react";

import SimpleComponent from "./SimpleComponent";

class SimpleComponentContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value1: "test",
    };
  }

  render() {
    const { value1 } = this.state;
    return (<SimpleComponent value1={value1} />)
  }
}

export default SimpleComponentContainer;