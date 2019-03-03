
import React, { Component } from "react";

import ReduxComponent from "./ReduxComponent";

import { connect } from 'react-redux';

class ReduxComponentContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value1: "test",
    };
  }

  render() {
    const { value1 } = this.state;
    return (<ReduxComponent value1={value1} />)
  }
}

const mapStateToProps = () => ({}); // or (state) => ({});

const mapDispatchToProps = dispatch => ({
	// action: (input) => dispatch(action(input)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReduxComponentContainer);