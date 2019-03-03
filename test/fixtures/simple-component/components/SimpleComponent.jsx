
import React from 'react';

import style from './SimpleComponent.css';

const SimpleComponent = (props) => {
  const { value1 } = props;

  return (<div>{value1}</div>)
};

export default SimpleComponent;