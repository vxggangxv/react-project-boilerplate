import React from 'react';
import { useSelector } from 'react-redux';
import { useImmer } from 'use-immer';
import { BASE_TEST_SAGAS } from 'store/actions';

const MainHomeContainer = () => {
  const { base } = useSelector(state => state);

  console.log(base, 'base');
  return <div>{base.landing === true ? 'loading...' : <Test />}</div>;
};

const TestState = {
  data: null,
};

function Test() {
  const [values, setValues] = useImmer(TestState);

  const handleClick = config => {
    const { type } = config;
    if (type === 'data') {
      BASE_TEST_SAGAS();
    }
  };

  console.log(values.data, 'state');
  return (
    <>
      <button onClick={() => handleClick({ type: 'data' })}>Click</button>
      <h2>{values.data?.title}</h2>
    </>
  );
}
export default MainHomeContainer;
