// @flow

import React, { Component } from "react";

import FlowComponent from "./FlowComponent";

type Props = {

};

type State = {
	value1: string,
};

class FlowComponentContainer extends Component<Props, State> {
  static defaultProps = {

	};

  constructor(props) {
    super(props);

    this.state = {
      value1: "test",
    };
  }

  render() {
    const { value1 } = this.state;
    return (<FlowComponent value1={value1} />)
  }
}

export default FlowComponentContainer;