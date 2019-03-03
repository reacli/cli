
import React from 'react';

import style from './TestComponent.css';

const TestComponent = (props) => {
  const { value1 } = props;

  return (<div>{value1}</div>)
};

export default TestComponent;