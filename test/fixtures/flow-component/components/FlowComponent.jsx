// @flow

import React from 'react';

import style from './FlowComponent.css';

type Props = {
	value1?: string,
};

const FlowComponent = (props: Props) => {
  const { value1 } = props;

  return (<div>{value1}</div>)
};

FlowComponent.defaultProps = {
	value1: '',
};

export default FlowComponent;