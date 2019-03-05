// @flow

import React, { Component } from "react";

import PreConfiguredComponent from "./PreConfiguredComponent";

import { connect } from 'react-redux';

type Props = {

};

type State = {
	value1: string,
};

class PreConfiguredComponentContainer extends Component<Props, State> {
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
    return (<PreConfiguredComponent value1={value1} />)
  }
}

const mapStateToProps = () => ({}); // or (state) => ({});

const mapDispatchToProps = dispatch => ({
	// action: (input) => dispatch(action(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PreConfiguredComponentContainer);