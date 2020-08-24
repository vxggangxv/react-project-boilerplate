import React from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useImmer } from 'use-immer';
// import { BASE_LANDING_SAGA } from 'store/actions';

const MainHomeContainer = () => {
  const { base } = useSelector(state => state);

  return (
    <div>
      {base.landing.success === null ? "loading..." : <Test />}
    </div>
  );
};

const TestState = {
  data: null
}

function Test() {
  const [values, setValues] = useImmer(TestState);

  const handleClick = config => {
    const { type } = config;
    if (type === "data") {
      // BASE_LANDING_SAGA({ test: "hello" })
    }
  }

  console.log(values.data, 'state')
  return <>

    <button onClick={() => handleClick({ type: "data" })}>Click</button>
    <h2>{values.data?.title}</h2>
  </>
}
export default MainHomeContainer;