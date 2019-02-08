import React, { Component } from "react";

import MyComponent from "./MyComponent";

class MyComponentContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value1: "test",
    }
  }

  render() {
    const { value1 } = this.state;
    return (<MyComponent value1={value1} />)
  }
}

export default MyComponentContainer;