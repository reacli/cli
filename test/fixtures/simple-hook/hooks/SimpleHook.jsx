import React, { useState, useEffect } from 'react';

const SimpleHook = props => {
  const { value1 } = props;
  const { state1, setState1 } = useState("42");

  useEffect(() => {
    setState1("Still 42");
  })

  return (
    <div>{value1} : {state1}</div>
  );
}

export default SimpleHook;