// @flow

import React from 'react';

import style from './MyTest.css';

type Props = {
	value1?: string,
};

const MyTest = (props: Props) => {
  const { value1 } = props;
  
  return (<div>{value1}</div>)
};

type State = {
	value1: string,
};

export default MyTest;