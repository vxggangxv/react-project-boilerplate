import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Actions } from 'store/actionCreators';


const Core = () => {
  const base = useSelector(state => state);
  console.log(base, 'base');

  const initialize = async () => {
    Actions.base_exit_landing();

  };

  useEffect(() => {
    initialize();
  }, [])

  return null;
};

export default Core;