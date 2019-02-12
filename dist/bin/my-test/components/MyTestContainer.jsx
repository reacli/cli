// @flow

import React, { Component } from "react";

import MyTest from "./MyTest";

type Props = {

};

type State = {
	value1: string,
};

class MyTestContainer extends Component<Props, State> {
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
    return (<MyTest value1={value1} />)
  }
}

export default MyTestContainer;