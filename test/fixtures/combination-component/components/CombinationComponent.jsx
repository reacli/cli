// @flow

import React from 'react';

import style from './CombinationComponent.scss';

type Props = {
	value1?: string,
};

const CombinationComponent = (props: Props) => {
  const { value1 } = props;

  return (<div>{value1}</div>)
};

CombinationComponent.defaultProps = {
	value1: '',
};

export default CombinationComponent;