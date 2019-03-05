// @flow

import React from 'react';

import style from './PreConfiguredComponent.scss';

type Props = {
	value1?: string,
};

const PreConfiguredComponent = (props: Props) => {
  const { value1 } = props;

  return (<div>{value1}</div>)
};

PreConfiguredComponent.defaultProps = {
	value1: '',
};

export default PreConfiguredComponent;