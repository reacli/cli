import React from 'react';

import style from './MyComponent.css';

const MyComponent = (props) => {
  const { value1 } = props;
  return (<div>{value1}</div>)
};

export default MyComponent;