
import React, { Component } from "react";

import ExtensionJsComponent from "./ExtensionJsComponent";

class ExtensionJsComponentContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value1: "test",
    };
  }

  render() {
    const { value1 } = this.state;
    return (<ExtensionJsComponent value1={value1} />)
  }
}

export default ExtensionJsComponentContainer;